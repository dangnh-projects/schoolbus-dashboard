import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Button, Popconfirm, Icon, Row, Table, Col, Input } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { Search } = Input;

export const Bus = props => {
  const { data = [], loading, count, page } = props;
  const [search, setSearch] = useState('');
  const columns = [
    {
      title: 'Route name',
      dataIndex: 'name',
    },
    {
      title: 'Bus number',
      render: (_, i) =>
        // <a href={`/dashboard/bus/${i.bus.id}`}>{i.bus.number}</a>
        i.bus && i.bus.name,
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
      render: (_, i) => (i.route_type === 'P' ? 'Pickup' : 'Drop-off'),
    },

    {
      title: 'Planned start time',
      render: (_, i) =>
        moment(i.estimated_start_time, 'HH:mm:ss').format('HH:mm'),
    },

    {
      title: 'Planned end time',
      render: (_, i) =>
        moment(i.estimated_end_time, 'HH:mm:ss').format('HH:mm'),
    },
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

  const handleOnSearch = term => {
    setSearch(term);
    props.getList({
      url: '/core/api/bus-route',
      search: term,
    });
  };

  return (
    <Card
      title="Manage bus route"
      extra={[
        <Row type="flex" gutter={16}>
          <Col>
            <Search onSearch={handleOnSearch} />
          </Col>
          <Col>
            <Button
              key="add-new"
              onClick={() => navigate('/dashboard/bus-route/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Table
        columns={columns}
        loading={loading}
        bordered
        size="middle"
        dataSource={data}
        pagination={{
          total: count,
          current: page + 1,
        }}
        onChange={pagination => {
          props.setPage(pagination.current - 1);
          props.getList({
            url: '/core/api/bus-route',
            search: search || '',
          });
        }}
      />
    </Card>
  );
};

const mapDispatchToProps = {
  getList: actionCreator.getList,
  deleteItem: actionCreator.deleteItem,
  setPage: actionCreator.setPage,
};

const mapStateToProps = state => state.dataTable;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bus);
