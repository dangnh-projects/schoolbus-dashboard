import React from 'react';
import { Card, Button, Popconfirm, Icon, Row, Tag } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Parent = props => {
  const columns = [
    {
      title: 'Avatar',
      render: (_, record) =>
        record.avatar ? (
          <img
            alt="avatar"
            style={{ width: '80px', height: '80px', textAlign: 'center' }}
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
      dataIndex: 'username',
    },
    {
      title: 'Children',
      render: (_, record) =>
        record.children &&
        record.children.map(child => <Tag>{child.name}</Tag>),
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
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/parent/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/core/api/parent/${record.id}`,
                  afterDelete: () => props.getList({ url: '/core/api/parent' }),
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
      title="Manage parent"
      style={{ width: '100%', background: 'none' }}
      extra={[
        <Button key="add-new" onClick={() => navigate('/dashboard/parent/new')}>
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/parent" />
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
)(Parent);
