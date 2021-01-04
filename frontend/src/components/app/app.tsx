import React, { ChangeEvent, FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';
import ChatService from '../../services/chat-service';

import LeftBar from '../left-bar';
import Profile from '../profile';
import Divider from '../divider';
import Message from '../message';
import AuthService from '../../router/auth-service';


const WriteArea: FunctionComponent = (): ReactElement => {
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);

  const messageChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    setMessage(value);
  };

  const clickHandler = async (): Promise<void> => {
    try {
      await ChatService.sendMessage(message);
      setMessage('');
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return <div>
    <Divider/>
    <div>
      <textarea
        name='message'
        value={message}
        onChange={messageChangeHandler}
        disabled={sending}
        placeholder='Write a message ...'
        style={{
          width: '100%',
          height: '71.5px',
          border: 'none',
          resize: 'none',
          outline: 'none'
        }}
      />
      <button onClick={clickHandler}>
        Submit
      </button>
    </div>
  </div>;
};

const CenterHeader: FunctionComponent = (): ReactElement => {
  return <div style={{ backgroundColor: 'chocolate', width: '100%', height: '100px' }}/>;
};

const Center: FunctionComponent = (): ReactElement => {
  const [messages, setMessages] = useState<string[]>(['first', 'Working from a van in Australia isn’t feasible if you need internet. It may have improved over the last years but I spent some time in a camper van around Tasmania and internet was a real problem (and Tasmania is tiny compared to the rest of the country).', '@aa_da What\'s the reason for the van? Saving money or just like to get outside? If you\'ve got a stable source of income you could always do some short term Airbnbs + buy a truck/topper, build a platform in the back. That way you can always convert it back to a truck and sleep in an apartment if you want.']);

  const receiveMessageHandler = useCallback((message: string): void => {
    setMessages((messages: string[]) => ([...messages, message]));
  }, [setMessages]);

  useEffect(() => {
    ChatService.subscribe(receiveMessageHandler);
  }, [receiveMessageHandler]);

  return <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <CenterHeader/>
    <div style={{ overflow: 'auto', flexGrow: 1, paddingLeft: '24px', paddingRight: '24px' }}>
      {messages.map(message => (<Message key={message} message={message}/>))}
    </div>
    <WriteArea/>
  </div>;
};

const App: FunctionComponent = (): ReactElement => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    AuthService.getUser().then(x => setUser(x)).catch(err => console.log(err));
  }, [setUser]);

  return <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
    <h1>{user?.name}</h1>
    <LeftBar/>
    <Center/>
    <Profile/>
  </div>;
};

export default App;
