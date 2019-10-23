import React, { useState, Fragment } from 'react';
import { Badge, Card, Col, Row, Icon, Select, List, Calendar } from 'antd';
import { Line } from 'react-chartjs-2';

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
    <Col type="flex" style={{ flex: 1, padding: '0px 24px' }}>
      <Row style={{ marginBottom: 24 }}>
        <Select defaultValue={type} onChange={value => setType(value)}>
          <Select.Option value="STAFF">Staff</Select.Option>
          <Select.Option value="STUDENT">Student</Select.Option>
        </Select>
      </Row>
      {type === 'STAFF' && (
        <Row type="flex" gutter={12} style={{ width: '100%' }}>
          <DataGraph />
          <DataGraph />
          <DataGraph />
          <DataGraph />
        </Row>
      )}
      {type === 'STUDENT' && (
        <Fragment>
          <Row type="flex" gutter={24}>
            <Col style={{ flex: 1 }}>
              <Card title="Thông báo">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Thông báo đóng học phí năm học 2019',
                    },
                    {
                      title: 'Thông báo đăng ký luận văn đợt 1',
                    },
                    {
                      title: 'Thông báo nghỉ học năm nay',
                    },
                    {
                      title: 'Thông báo',
                    },
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="notification" />}
                        title={
                          <a href="https://ant.design">
                            <Icon type="notification" /> {item.title}
                          </a>
                        }
                        description="Thông báo từ BGH"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col style={{ flex: 1 }}>
              <Card title="Bài tập">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Bài tập 1 (Nhập môn)',
                    },
                    {
                      title: 'Bài tập 2 (rẽ nhánh)',
                    },
                    {
                      title: 'Bài tập 3 (vòng lặp)',
                    },
                    {
                      title: 'Bài tập 4 (hàm)',
                    },
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="notification" />}
                        title={
                          <a href="https://ant.design">
                            <Icon type="pushpin" /> {item.title}
                          </a>
                        }
                        description="Nhập môn lập trình"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Card title="Timetable">
              <Calendar
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
              />
            </Card>
          </Row>
        </Fragment>
      )}
    </Col>
  );
};

export default Home;
