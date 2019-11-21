import React, { lazy, Suspense } from 'react';
import { Spin, Card, Row, Tabs, Table, Icon } from 'antd';
import { connect } from 'react-redux';

const BusLocations = lazy(() => import('./BusLocations'));
const RouteForm = lazy(() => import('./RouteForm'));

const { TabPane } = Tabs;

const BusRoute = props => {
  return (
    <Card title="Bus route">
      <Row>
        <Suspense fallback={<Spin />}>
          <RouteForm />
        </Suspense>
      </Row>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="branches" />
              Bus stop
            </span>
          }
          key="1"
          style={{ padding: 18 }}
        >
          <Suspense fallback={<Spin />}>
            <BusLocations />
          </Suspense>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="user" />
              Students
            </span>
          }
          key="2"
          style={{ padding: 18 }}
        >
          <Table
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
              },
              {
                title: 'Class',
                dataIndex: 'class',
              },
              {
                title: 'Status',
                dataIndex: 'end_time',
                align: 'center',
              },
            ]}
          />
        </TabPane>
      </Tabs>
      {/* <Tabs defaultActiveKey="pickup">
        <TabPane tab="Pick-up" key="pickup">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane
              tab={
                <span>
                  <Icon type="branches" />
                  Bus stop
                </span>
              }
              key="1"
              style={{ padding: 18 }}
            >
              <MapRoutes />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />
                  Students
                </span>
              }
              key="2"
              style={{ padding: 18 }}
            >
              <Table
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                  },
                  {
                    title: 'Class',
                    dataIndex: 'class',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'end_time',
                    align: 'center',
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Drop off" key="dropoff">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane
              tab={
                <span>
                  <Icon type="branches" />
                  Bus stop
                </span>
              }
              key="1"
              style={{ padding: 18 }}
            >
              <MapRoutes />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />
                  Students
                </span>
              }
              key="2"
              style={{ padding: 18 }}
            >
              <Table
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                  },
                  {
                    title: 'Class',
                    dataIndex: 'class',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'end_time',
                    align: 'center',
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs> */}
    </Card>
  );
};

export default connect()(BusRoute);
