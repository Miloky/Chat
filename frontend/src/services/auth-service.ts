import { User, UserManager, WebStorageStateStore } from 'oidc-client';

const ApplicationName = 'chat_web_client';


const prefix = '/authentication';

export const LoginActions = {
  login: 'login',
  loginCallback: 'login-callback'
};

export const ApplicationPaths = {
  ApiAuthorizationClientConfigurationUrl: `_configuration/${ApplicationName}`,
  Login: `${prefix}/${LoginActions.login}`,
  LoginCallback: `${prefix}/${LoginActions.loginCallback}`,

};


class AuthorizeService {
  // TODO: Types
  private _user?: User;
  private _userManager: UserManager | null = null;
  private _isAuthenticated: boolean = false;

  public async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return !!user;
  }

  private updateState(user?: User): void {
    this._user = user;
    this._isAuthenticated = !!this._user;
    this.notifySubscribers();
  }

  private notifySubscribers(): void {

  }

  public subscribe(): void {

  }

  public unsubscribe(): void {

  }

  public async signIn(args: {returnUrl: string}): Promise<void> {
    await this.ensureUserManagerInitialized();
    await this._userManager?.signinRedirect({ useReplaceToNavigate: true });
  }

  // TODO: Add types
  public async getUser(): Promise<any> {
    if (this._user && this._user.profile) {
      return this._user.profile;
    }

    await this.ensureUserManagerInitialized();
    const user: User | null | undefined = await this._userManager?.getUser();
    return user && user.profile;
  }

  private async ensureUserManagerInitialized(): Promise<void> {
    if (this._userManager) {
      return;
    }

    let response = await fetch(`http://localhost:5000/${ApplicationPaths.ApiAuthorizationClientConfigurationUrl}`);
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

const authService = new AuthorizeService();
export default authService;
