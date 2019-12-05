import React, { Fragment } from 'react';
import moment from 'moment';
import { Layout, Menu, Avatar, Popover, List, Icon, Badge } from 'antd';
import { useSelector } from 'react-redux';
const { Header } = Layout;
const { SubMenu } = Menu;

const notifications = [
  {
    title: 'Noti 1',
    date: new Date(),
  },
  {
    title: 'Noti 2',
    date: new Date(),
  },
  {
    title: 'Noti 3',
    date: new Date(),
  },
];

const LayoutHeader = props => {
  const user = useSelector(state => state.user && state.user.user);
  return (
    <Header
      style={{
        paddingLeft: 12,
        padding: 0,
        display: 'flex',
        backgroundColor: '#3e8247',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        zIndex: 1,
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* <Bus style={{ fill: 'white', curser: 'pointer' }} /> */}
        <div style={{ fontSize: 24, color: 'white', paddingLeft: 24 }}>
          Bus management system
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            width: 40,
          }}
        >
          <Popover
            placement="bottomRight"
            trigger="click"
            key="notifications"
            style={{ marginRight: -26 }}
            content={
              <div>
                <List
                  itemLayout="horizontal"
                  dataSource={notifications}
                  locale={{
                    emptyText: 'You have viewed all notifications.',
                  }}
                  style={{ width: 200 }}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        description={moment(item.date).fromNow()}
                      />
                    </List.Item>
                  )}
                />
              </div>
            }
          >
            <Badge count={notifications.length}>
              <Icon type="bell" style={{ fontSize: 24, color: 'white' }} />
            </Badge>
          </Popover>
        </div>
        <Menu
          key="user"
          mode="horizontal"
          onClick={() => {}}
          style={{
            borderBottom: 'none',
            backgroundColor: '#07551e',
            color: 'white',
          }}
        >
          <SubMenu
            title={
              <Fragment>
                <span style={{ marginRight: 4 }}>Hi,</span>
                <span>{user && user.username}</span>
                <Avatar
                  style={{ marginLeft: 8 }}
                  src="/images/octagon-icon.png"
                />
              </Fragment>
            }
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              borderBottom: 'none',
            }}
          >
            <Menu.Item key="SignOut">Sign out</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};

export default LayoutHeader;
