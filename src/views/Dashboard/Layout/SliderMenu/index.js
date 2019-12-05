import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
//import { checkPermission } from 'utils/permission';
import Bus from '../../../../assets/bus';
import './style.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getActiveKey = path => {
  let [, group, item, action] = path.split('/');
  if (group === 'dashboard' && item) {
    group = 'manage';
  }
  return { group, item, action };
};

// const renderManageItem = (checker, title, slug) =>
//   checker &&
//   checker(slug)(
//     <Menu.Item key={slug} onClick={() => navigate('/dashboard/' + slug)}>
//       {title}
//     </Menu.Item>
//   );

const SliderMenu = ({ location }) => {
  const [collapsed, setColapsed] = useState(false);
  const { group, item } = getActiveKey(location.pathname);
  //const [checker, setChecker] = useState(null);

  // useEffect(() => {
  //   setChecker(() => checkPermission(permissions, groups));
  // }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setColapsed}
      style={{ minHeight: '100vh', backgroundColor: '#07551e' }}
      breakpoint="md"
    >
      <div
        className="logo"
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bus style={{ fill: 'white', curser: 'pointer' }} />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={[item]}
        defaultOpenKeys={[group]}
        mode="inline"
        style={{
          // backgroundColor: '#f0f2f5',
          // border: 'none',
          height: '100%',
        }}
      >
        <Menu.Item
          key="dashboard"
          onClick={() => navigate('/dashboard')}
          // style={{ color: 'white' }}
        >
          <Icon type="home" />
          <span>Dashboard</span>
        </Menu.Item>
        <SubMenu
          key="manage"
          title={
            <span>
              <Icon type="appstore" />
              <span>Manage</span>
            </span>
          }
          // style={{ color: 'white' }}
        >
          <Menu.Item
            key="student"
            onClick={() => navigate('/dashboard/student')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Student
          </Menu.Item>
          <Menu.Item
            key="parent"
            onClick={() => navigate('/dashboard/parent')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Parent
          </Menu.Item>
          <Menu.Item
            key="supervisor"
            onClick={() => navigate('/dashboard/bus-supervisor')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Supervisor
          </Menu.Item>
          <Menu.Item
            key="driver"
            onClick={() => navigate('/dashboard/driver')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Driver
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="bus-management"
          title={
            <span>
              <Icon type="branches" />
              <span>Bus Operation</span>
            </span>
          }
          // style={{ color: 'white' }}
        >
          <Menu.Item
            key="bus"
            onClick={() => navigate('/dashboard/bus')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Bus
          </Menu.Item>
          <Menu.Item
            key="bus-route"
            onClick={() => navigate('/dashboard/bus-route')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Routes
          </Menu.Item>

          <Menu.Item
            key="bus-track"
            onClick={() => navigate('/dashboard/bus-track')}
            // style={{ backgroundColor: '#6db273', color: 'white', margin: 0 }}
          >
            Bus track
          </Menu.Item>
        </SubMenu>
        {/* <SubMenu
          key="permission"
          title={
            <span>
              <Icon type="team" />
              <span>Permissions</span>
            </span>
          }
          style={{ color: 'white' }}
        >
          <Menu.Item key="user" onClick={() => navigate('/permission/user')}>
            Users
          </Menu.Item>
          <Menu.Item key="group" onClick={() => navigate('/permission/group')}>
            Groups
          </Menu.Item>
        </SubMenu> */}

        <Menu.Item key="9">
          <Icon type="setting" />
          <span>Settings</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(SliderMenu);
