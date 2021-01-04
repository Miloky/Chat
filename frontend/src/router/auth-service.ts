import { Profile, User, UserManager, WebStorageStateStore } from 'oidc-client';
import { ApplicationName, ApplicationRoutes, AuthenticationResultStatus } from './constants';


interface AuthResult {
  status: AuthenticationResultStatus,
  message?: string,
  state?: any
}

type cb = () => void;

type callbacks = { callback: cb, subscription: number }[];

class AuthenticationService {
  private _userManager?: UserManager;
  private _nextSubscriptionId: number = 0;
  private _callbacks: callbacks = [];
  private _user?: User;
  private _isAuthenticated?: boolean;

  async isUserAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return  !!user;
  }

  public async signIn(state: { returnUrl: string }): Promise<AuthResult> {
    try {
      await this.ensureUserManagerInitialized();
      await this._userManager?.signinRedirect({ useReplaceToNavigate: true, data: state });
      return { status: AuthenticationResultStatus.Redirect };
    } catch (redirectError) {
      console.log('Redirect authentication error: ', redirectError);
      return { status: AuthenticationResultStatus.Error, message: redirectError };
    }
  }

  public async completeSingIn(url: string): Promise<AuthResult> {
    try {
      await this.ensureUserManagerInitialized();
      const user = await this._userManager?.signinCallback(url);
      this.updateState(user);
      return { status: AuthenticationResultStatus.Success, state: user && user.state };
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return { status: AuthenticationResultStatus.Error, message: error };
    }
  }

  private notifySubscribers(): void {
    for (let i = 0; i < this._callbacks.length; i++) {
      const callback = this._callbacks[i].callback;
      callback();
    }
  }

  private updateState(user?: User): void {
    this._user = user;
    this._isAuthenticated = !!this._user;
    this.notifySubscribers();
  };

  public subscribe = (callback: cb): number => {
    this._callbacks.push({ callback, subscription: this._nextSubscriptionId });
    return this._nextSubscriptionId++;
  };

  public unsubscribe = (subscriptionId: number): void => {
    const subscriptionIndex = this._callbacks
      .map((element, index) => element.subscription === subscriptionId
        ? { found: true, index } : { found: false })
      .filter(element => element.found);

    if (subscriptionIndex.length !== 1) {
      throw  new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
    }

    this._callbacks.splice(subscriptionIndex[0].index as number, 1);
  };

  public async getUser(): Promise<Profile | null> {
    if(this._user && this._user.profile){
      return this._user.profile;
    }

    await this.ensureUserManagerInitialized();
    const user = await (this._userManager as UserManager).getUser();
    return user && user.profile;
  }

  private async ensureUserManagerInitialized(): Promise<void> {
    if (this._userManager !== undefined) {
      return;
    }

    let response = await fetch(ApplicationRoutes.ApiAuthorizationClientConfigurationUrl);
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}'`);
    }

    let settings = await response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    settings.userStore = new WebStorageStateStore({
      prefix: ApplicationName
    });

    this._userManager = new UserManager(settings);

    this._userManager.events.addUserSignedOut(async () => {
      await this._userManager?.removeUser();
      this.updateState(undefined);
    });

  }

}

const AuthService = new AuthenticationService();

export default AuthService;
