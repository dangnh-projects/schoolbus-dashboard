import React from 'react';
import { Link } from '@reach/router';
import { Card, Col, Row, Icon } from 'antd';
import './style.scss';

const DashboardItem = ({ i, theme = '', Component }) => {
  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={6}
      className="dashboard__col"
      style={{ borderRadius: 2 }}
    >
      <Link
        to={i.link}
        className="dashboard__link"
        style={{ borderBottom: `3px solid ${i.boderColor}`, padding: 8 }}
      >
        {Component ? (
          <Col style={{ marginBottom: 24 }}>
            <Component />
          </Col>
        ) : (
          <Icon
            theme={theme}
            type={i.type}
            style={{
              fontSize: 42,
              color: 'rgba(0,0,0,0.65)',
              marginBottom: 24,
            }}
          />
        )}
        <span className="dashboard__content">{i.content}</span>
      </Link>
    </Col>
  );
};

const Home = () => {
  return (
    <Col type="flex" style={{ flex: 1, padding: 24 }}>
      {/* {type === 'STAFF' && (
        <Row type="flex" gutter={12} style={{ width: '100%' }}>
          <DataGraph />
          <DataGraph />
          <DataGraph />
          <DataGraph />
        </Row>
      )} */}
      <Card title="Management">
        <DashboardItem
          i={{
            type: 'idcard',
            boderColor: 'black',
            content: 'Students',
            link: '/dashboard/student',
          }}
        />
        <DashboardItem
          i={{
            type: 'team',
            boderColor: 'black',
            content: 'Parents',
            link: '/dashboard/parent',
          }}
        />
        <DashboardItem
          i={{
            type: 'user',
            boderColor: 'black',
            content: 'Bus supervisor',
            link: '/dashboard/bus-supervisor',
          }}
        />

        <DashboardItem
          i={{
            type: 'user',
            boderColor: 'black',
            content: 'Drivers',
            link: '/dashboard/driver',
          }}
        />
      </Card>
      <Card title="Bus information and operation" style={{ marginTop: 12 }}>
        <DashboardItem
          i={{
            type: 'car',
            boderColor: 'black',
            content: 'Bus',
            link: '/dashboard/bus',
          }}
        />
        <DashboardItem
          i={{
            type: 'branches',
            boderColor: 'black',
            content: 'Bus route',
            link: '/dashboard/bus-route',
          }}
        />
      </Card>
      <Card title="Others" style={{ marginTop: 12 }}>
        <DashboardItem
          i={{
            type: 'user-delete',
            boderColor: 'black',
            content: 'Student Absence',
            link: '/dashboard/absense',
          }}
        />

        <DashboardItem
          i={{
            type: 'message',
            boderColor: 'black',
            content: 'Notification messages',
            link: '/dashboard/notification',
          }}
        />

        <DashboardItem
          i={{
            type: 'setting',
            boderColor: 'black',
            content: 'Settings',
            link: '/dashboard/settings',
          }}
        />
        <DashboardItem
          i={{
            type: 'apartment',
            boderColor: 'black',
            content: 'Schools',
            link: '/dashboard/bus',
          }}
        />
      </Card>
      <Row>
        {/* 
        <DashboardItem
          i={{
            type: 'car',
            boderColor: 'black',
            content: 'Quản lý xe bus',
            link: '/bus',
          }}
        />
        <DashboardItem
          i={{
            type: 'user',
            boderColor: 'black',
            content: 'Quản lý tài xế',
            link: '/bus',
          }}
        />
        <DashboardItem
          i={{
            type: 'bar-chart',
            boderColor: 'black',
            content: 'Thống kê / báo cáo',
            link: '/bus',
          }}
        /> */}
      </Row>
    </Col>
  );
};

export default Home;
