import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { checkPermission } from 'utils/permission';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getActiveKey = path => {
  let [, group, item, action] = path.split('/');
  if (group === 'dashboard' && item) {
    group = 'manage';
  }
  return { group, item, action };
};

const renderManageItem = (checker, title, slug) =>
  checker &&
  checker(slug)(
    <Menu.Item key={slug} onClick={() => navigate('/dashboard/' + slug)}>
      {title}
    </Menu.Item>
  );

const SliderMenu = ({ location, permissions, groups }) => {
  const [collapsed, setColapsed] = useState(false);
  const { group, item } = getActiveKey(location.pathname);
  const [checker, setChecker] = useState(null);

  useEffect(() => {
    setChecker(() => checkPermission(permissions, groups));
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setColapsed}
      style={{ height: '100vh', backgroundColor: '#3e8247' }}
      breakpoint="md"
    >
      <div
        className="logo"
        style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={collapsed ? '/images/octagon-icon.png' : '/images/logo.png'}
          alt="Images"
          style={{ height: 40 }}
        />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={[item]}
        defaultOpenKeys={[group]}
        mode="inline"
      >
        <Menu.Item key="dashboard" onClick={() => navigate('/dashboard')}>
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
        >
          <Menu.Item key="class" onClick={() => navigate('/dashboard/bus')}>
            Bus
          </Menu.Item>
          {/* {renderManageItem(checker, 'Course', 'course')}
          {checker &&
            checker('course')(
              <Menu.Item
                key={'major'}
                onClick={() => navigate('/dashboard/major')}
              >
                Major
              </Menu.Item>
            )}
          {renderManageItem(checker, 'Major', 'major')}
          {renderManageItem(checker, 'Faculty', 'faculty')}
          {renderManageItem(checker, 'Batch', 'batch')}
          {renderManageItem(checker, 'Subject', 'subject')}
          {renderManageItem(checker, 'Student', 'student')}
          {renderManageItem(checker, 'Semester', 'semester')}
          {renderManageItem(checker, 'Room', 'room')}
          <Menu.Item key="class" onClick={() => navigate('/dashboard/class')}>
            Class
          </Menu.Item> */}
        </SubMenu>
        <SubMenu
          key="permission"
          title={
            <span>
              <Icon type="team" />
              <span>Permissions</span>
            </span>
          }
        >
          <Menu.Item key="user" onClick={() => navigate('/permission/user')}>
            Users
          </Menu.Item>
          <Menu.Item key="group" onClick={() => navigate('/permission/group')}>
            Groups
          </Menu.Item>
        </SubMenu>
        {groups && groups.indexOf('admin') > -1 && (
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="area-chart" />
                <span>Report</span>
              </span>
            }
          >
            <Menu.Item key="6">Users</Menu.Item>
            <Menu.Item key="8">Groups</Menu.Item>
            <Menu.Item key="8">Permissions</Menu.Item>
          </SubMenu>
        )}
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
