import { FunctionComponent, ReactElement } from 'react';

const LeftBar: FunctionComponent = (): ReactElement => {
  return <div style={{ display: 'flex', flexDirection:'row' }}>
    <div style={{ backgroundColor: 'black', width: '72px' }}/>
    <div style={{ width: '260px', backgroundColor: 'gray' }} />

  </div>;
};


export default LeftBar;
