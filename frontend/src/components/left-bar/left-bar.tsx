import { FunctionComponent, ReactElement, useState } from 'react';
import classes from './contact.module.scss';
import classnames from 'classnames';


const Contact: FunctionComponent = (): ReactElement => {
  return  <div className={classes.container}>
    <div className={classnames(classes.indicator, classes.active)} />
    <div className={classes.avatar}>
      <img src='images/avatar.png' alt='avatar' />
    </div>
    <span className={classes.name}>Orlando Diggs</span>
  </div>
}

const LeftBar: FunctionComponent = (): ReactElement => {
  const [visible, setVisible] = useState<boolean>(true);

  const toggle = (): void => {
    setVisible(visible => !visible);
  };

  return <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ backgroundColor: 'black', width: '72px' }}>
      <button onClick={toggle}>Test</button>
    </div>
    <div style={{ width: '260px', backgroundColor: 'gray' }}>
      <Contact />
      <Contact />
    </div>

  </div>;
};


export default LeftBar;
