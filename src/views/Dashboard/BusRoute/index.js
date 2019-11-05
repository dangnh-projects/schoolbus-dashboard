import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row, Table } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Bus = props => {
  const columns = [
    {
      title: 'Route name',
      render: (_, i) => <a>{i.name}</a>,
    },
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
      title: 'Pickup',
      children: [
        {
          title: 'Number of stop',
          dataIndex: 'pickup_stop_no',
          align: 'center',
        },
        {
          title: 'Number of student',
          dataIndex: 'pickup_student_no',
          align: 'center',
        },
      ],
    },

    {
      title: 'Drop off',
      children: [
        {
          title: 'Number of stop',
          dataIndex: 'dropoff_stop_no',
          align: 'center',
        },
        {
          title: 'Number of student',
          dataIndex: 'dropoff_student_no',
          align: 'center',
        },
      ],
    },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/batch/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/r/batches/${record.id}/`,
                  afterDelete: () => props.getList({ url: '/r/batches/' }),
                })
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </Row>
        );
      },
    },
  ];

  return (
    <Card
      title="Manage bus route"
      extra={[
        <Button
          key="add-new"
          onClick={() => navigate('/dashboard/bus-route/new')}
        >
          Add
        </Button>,
      ]}
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
            pickup_stop_no: 20,
            pickup_student_no: 22,
            dropoff_stop_no: 20,
            dropoff_student_no: 22,
          },
        ]}
      />
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
