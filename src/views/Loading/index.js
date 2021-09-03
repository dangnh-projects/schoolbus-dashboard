import React from 'react';
import { Spin } from 'antd';

const Loading = props => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin />
  </div>
);

export default Loading;
