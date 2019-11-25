import React, { useEffect } from 'react';
import { Card, Button, Popconfirm, Icon, Row, Table } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Bus = props => {
  const { data = [] } = props;
  const columns = [
    {
      title: 'Route name',
      dataIndex: 'name',
    },
    {
      title: 'Bus number',
      render: (_, i) =>
        // <a href={`/dashboard/bus/${i.bus.id}`}>{i.bus.number}</a>
        i.bus && i.bus.number,
    },

    {
      title: 'Driver',
      render: (_, i) =>
        // <a href={`/dashboard/driver/${i.driver.id}`}>{i.driver.name}</a>
        i.driver && i.driver.name,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) =>
        // <a href={`/dashboard/bus-supervisor/${i.bus_supervisor.id}`}>
        //   {i.bus_supervisor.first_name + ' ' + i.bus_supervisor.last_name}
        // </a>
        i.bus_supervisor &&
        i.bus_supervisor.first_name + ' ' + i.bus_supervisor.last_name,
    },
    {
      title: 'Route type',
      render: (_, i) => (i.type === 'P' ? 'Pickup' : 'Drop-off'),
    },
    // {
    //   title: 'Pickup',
    //   children: [
    //     {
    //       title: 'Number of stop',
    //       dataIndex: 'pickup_stop_no',
    //       align: 'center',
    //     },
    //     {
    //       title: 'Number of student',
    //       dataIndex: 'pickup_student_no',
    //       align: 'center',
    //     },
    //   ],
    // },

    // {
    //   title: 'Drop off',
    //   children: [
    //     {
    //       title: 'Number of stop',
    //       dataIndex: 'dropoff_stop_no',
    //       align: 'center',
    //     },
    //     {
    //       title: 'Number of student',
    //       dataIndex: 'dropoff_student_no',
    //       align: 'center',
    //     },
    //   ],
    // },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/bus-route/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/core/api/bus-route/${record.id}`,
                  afterDelete: () =>
                    props.getList({ url: '/core/api/bus-route' }),
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

  useEffect(() => {
    // get bus route
    props.getList({ url: '/core/api/bus-route' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Table columns={columns} bordered size="middle" dataSource={data} />
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
