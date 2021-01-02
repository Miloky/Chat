import { FunctionComponent, ReactElement } from 'react';

import classes from './message.module.scss';

interface MessageProps {
  message: string;
}

const Message: FunctionComponent<MessageProps> = (props): ReactElement => {
  return (
    <div className={classes.container}>
      <img className={classes.avatar} src='images/avatar.png' alt='' />
      <div className={classes.message_container}>
        <div className={classes.metadata_container}>
          <span className={classes.name}>Ramon Bateman</span>
          <span className={classes.time}>11:59 AM</span>
        </div>
        <div className={classes.message}>{props.message}</div>
      </div>
    </div>
  );
};

export default Message;
