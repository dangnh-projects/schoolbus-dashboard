import React from 'react';
import { Card, Icon, Table, Tabs, Tag } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { TabPane } = Tabs;

export const Bus = props => {
  const columns = [
    {
      title: 'Bus number',
      render: (_, i) => i.number,
    },

    {
      title: 'Driver',
      render: (_, i) => i.driver,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) => i.bus_supervisor,
    },
    {
      title: 'Start time',
      key: 'start_time',
    },
    {
      title: 'Next stop',
      render: (_, i) => i.next_stop,
    },
    {
      title: 'No. of onboarding',
      render: (_, i) => i.no_onboarding,
    },
    {
      title: 'No. remaining',
      render: (_, i) => i.no_remaining,
    },
    {
      title: 'End time',
      render: (_, i) => i.end_time,
    },
  ];

  return (
    <Card>
      <Tabs>
        <TabPane
          tab={
            <span>
              Moving Buses
              <Tag color="#87d068" style={{ marginLeft: 12 }}>
                10
              </Tag>
            </span>
          }
          key="on-going"
        >
          <Tabs tabPosition="left">
            <TabPane
              tab={
                <span>
                  <Icon type="arrow-up" />
                  Pickup
                  <Tag color="#87d068" style={{ marginLeft: 12 }}>
                    10
                  </Tag>
                </span>
              }
              key="Pickup"
            >
              <Table
                columns={columns}
                bordered
                size="middle"
                dataSource={[
                  {
                    name: 'District 7 - Hong Bang',
                    number: 'Bus 02',
                    driver: 'Hung Vo',
                    bus_supervisor: 'Thao Hoang',
                    start_time: '08:00',
                    next_stop: 'Điện Biên Phủ',
                    no_onboarding: 20,
                    no_remaining: 22,
                    end_time: '08:30',
                  },
                ]}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="arrow-down" />
                  Drop off
                  <Tag color="#87d068" style={{ marginLeft: 12 }}>
                    3
                  </Tag>
                </span>
              }
              key="drop-off"
            >
              <Table
                columns={columns}
                bordered
                size="middle"
                dataSource={[
                  {
                    name: 'District 7 - Hong Bang',
                    number: 'Bus 02',
                    driver: 'Hung Vo',
                    bus_supervisor: 'Thao Hoang',
                    start_time: '08:00',
                    next_stop: 'Điện Biên Phủ',
                    no_onboarding: 20,
                    no_remaining: 22,
                    end_time: '08:30',
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane
          tab={
            <span>
              All Buses{' '}
              <Tag color="gray" style={{ marginLeft: 12 }}>
                20
              </Tag>
            </span>
          }
          key="all"
        >
          <Table
            columns={columns}
            bordered
            size="middle"
            dataSource={[
              {
                name: 'District 7 - Hong Bang',
                number: 'Bus 02',
                driver: 'Hung Vo',
                bus_supervisor: 'Thao Hoang',
                start_time: '08:00',
                next_stop: 'Điện Biên Phủ',
                no_onboarding: 20,
                no_remaining: 22,
                end_time: '08:30',
              },
            ]}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

const mapDispatchToProps = {
  getList: actionCreator.getList,
  deleteItem: actionCreator.deleteItem,
};

const mapStateToProps = state => state.dataTable;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bus);
