import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row, Table, Tabs, Tag } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { TabPane } = Tabs;

export const Bus = props => {
  const columns = [
    {
      title: 'Bus number',
      render: (_, i) => <a>{i.number}</a>,
    },

    {
      title: 'Driver',
      render: (_, i) => <a>{i.driver}</a>,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) => <a>{i.bus_supervisor}</a>,
    },
    {
      title: 'Start time',
      key: 'start_time',
    },
    {
      title: 'Next stop',
      render: (_, i) => <a>{i.next_stop}</a>,
    },
    {
      title: 'No. of onboarding',
      render: (_, i) => <a>{i.no_onboarding}</a>,
    },
    {
      title: 'No. remaining',
      render: (_, i) => <a>{i.no_remaining}</a>,
    },
    {
      title: 'End time',
      render: (_, i) => <a>{i.end_time}</a>,
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
