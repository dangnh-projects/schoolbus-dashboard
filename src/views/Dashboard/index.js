import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { navigate } from '@reach/router';
import SliderMenu from './Layout/SliderMenu';
import Header from './Layout/Header';
const { Content, Footer } = Layout;

const Dashboard = ({ children, location }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SliderMenu location={location} />
      <Layout>
        <Header />
        <Content
          style={{
            margin: '0px 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              // overflowY: 'scroll',
              flexDirection: 'column',
              padding: 12,
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/dashboard">Dashboard</a>
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item> */}
            </Breadcrumb>
            {/* content here */}
            {children}
          </div>
        </Content>
        <Footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            padding: 8,
          }}
        >
          ©2019 Powered by Nguyen Hoang Group
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
