import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Form, Input, Icon, Button } from 'antd';
import { actionCreator } from 'store/user/user.meta';

const Login = ({ login }) => {
  const [username, setUsername] = useState('vophihung');
  const [password, setPassword] = useState('Hungtncntt123');

  const handleSubmit = e => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Row
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(248, 248, 248)',
      }}
    >
      <Card style={{ width: 350 }}>
        <Form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            style={{ marginTop: 24 }}
            onChange={e => setPassword(e.target.value)}
          />
          <Row type="flex">
            <Button
              htmlType="submit"
              type="primary"
              style={{ margin: '12px auto' }}
            >
              Login
            </Button>
          </Row>
        </Form>
      </Card>
    </Row>
  );
};

const mapDispatchToProps = {
  login: actionCreator.login,
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
