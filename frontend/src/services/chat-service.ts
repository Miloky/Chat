import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

export enum ChatMethodName {
  ReceiveMessage = 'ReceiveMessage',
  SendMessage = 'SendMessage'
}

class ChatService {
  private _connection: HubConnection | null = null;

  public async connect(): Promise<HubConnection> {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .withAutomaticReconnect()
      .build();

    try {
      // TODO: Error handling
      await connection.start();
      console.log('Connected');
    } catch (err){
      console.log(err);
    }


    this._connection = connection;
    return this._connection;
  }

  public async getConnection(): Promise<HubConnection> {
    if (this._connection?.state !== HubConnectionState.Connected) {
      await this.connect();
    }
    return this._connection as HubConnection;
  }

  public async subscribe(callback: (message: string)=>void): Promise<void> {
    const connection = await this.getConnection();
    connection.on(ChatMethodName.ReceiveMessage, callback);
  }

  public unsubscribe(callback: (args: unknown[])=> void): void {
    throw new Error('Not implemented');
  }

  public async sendMessage(message: string): Promise<void> {
    const connection = await this.getConnection();
    await connection.send(ChatMethodName.SendMessage, { message });
  }
}

export default new ChatService();
