import React from 'react';
import { Row } from 'antd';

const NotFound = props => (
  <Row
    style={{
      display: 'flex',
      with: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img src="/images/page-not-found.jpg" alt="Not found" width={550} />
  </Row>
);

export default NotFound;
