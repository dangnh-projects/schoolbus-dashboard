import React from 'react';
import { Card, Button, Popconfirm, Icon, Row, Tag, Col, Input } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { Search } = Input;

export const Bus = props => {
  const columns = [
    {
      title: 'Avatar',
      render: (_, record) =>
        record.avatar ? (
          <img
            alt="avatar"
            style={{ width: '60px', height: 'auto', textAlign: 'center' }}
            src={process.env.REACT_APP_BACKEND_URL + record.avatar}
          />
        ) : (
          ''
        ),
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
    },
    {
      title: 'Start working date',
      dataIndex: 'start_working_date',
      align: 'center',
    },
    {
      title: 'Status',
      render: (_, record) =>
        record.status === 'A' ? (
          <Tag color="#3e8247">Active</Tag>
        ) : (
          <Tag>Inactive</Tag>
        ),
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'end_time',
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/bus-supervisor/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/core/api/supervisor/${record.id}`,
                  afterDelete: () =>
                    props.getList({ url: '/core/api/supervisor' }),
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

  const handleOnSearch = term => {
    props.getList({
      url: '/core/api/supervisor',
      search: term,
    });
  };

  return (
    <Card
      title="Manage bus supervisor"
      extra={[
        <Row type="flex" gutter={16}>
          <Col>
            <Search onSearch={handleOnSearch} />
          </Col>
          <Col>
            <Button
              key="add-new"
              onClick={() => navigate('/dashboard/bus-supervisor/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/supervisor" />
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
