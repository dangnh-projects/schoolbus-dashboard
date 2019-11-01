import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Badge, Card, Col, Row, Icon } from 'antd';
import { Line } from 'react-chartjs-2';
import Family from 'assets/family';
import './style.scss';

const DashboardItem = ({ i, theme = '', Component }) => {
  return (
    <Col
      xs={12}
      sm={8}
      md={6}
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

const DataGraph = props => (
  <Col xs={12} md={6}>
    <Card>
      <Row>
        <span>Total students</span>
      </Row>
      <Row>
        <h2 style={{ margin: 0 }}>12,562</h2>
      </Row>
      <Row style={{ maxWidth: '100%' }}>
        <Line
          width={120}
          height={60}
          legend={{ display: false }}
          data={data}
          options={{
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  display: false,
                },
              ],
            },
          }}
        />
      </Row>
      <Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Col>Change</Col>
          <Col style={{ display: 'flex', alignItems: 'flex-end' }}>
            12% <Icon type="caret-up" style={{ color: '#57c22d' }} />
          </Col>
        </div>
      </Row>
    </Card>
  </Col>
);

const data = {
  labels: ['2016', '2017', '2018', '2019'],
  legend: {
    display: false,
  },
  datasets: [
    {
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 74, 76, 89],
    },
  ],
};

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const Home = () => {
  const [type, setType] = useState('STAFF');
  return (
    <Col type="flex" style={{ flex: 1, padding: 24, backgroundColor: 'white' }}>
      {/* {type === 'STAFF' && (
        <Row type="flex" gutter={12} style={{ width: '100%' }}>
          <DataGraph />
          <DataGraph />
          <DataGraph />
          <DataGraph />
        </Row>
      )} */}
      <Row>
        <DashboardItem
          i={{
            type: 'idcard',
            boderColor: 'black',
            content: 'Student',
            link: '/dashboard/student',
          }}
        />
        <DashboardItem
          i={{
            type: 'team',
            boderColor: 'black',
            content: 'Parent',
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
            type: 'branches',
            boderColor: 'black',
            content: 'Bus route',
            link: '/dashboard/bus-route',
          }}
        />

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
            content: 'Other settings',
            link: '/dashboard/settings',
          }}
        />

        {/* <DashboardItem
          i={{
            type: 'apartment',
            boderColor: 'black',
            content: 'Quản lý trường học',
            link: '/bus',
          }}
        />
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
