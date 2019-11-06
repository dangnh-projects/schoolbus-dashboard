import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const ButtonGroup = Button.Group;

export const Bus = props => {
  const [viewType, setViewType] = useState('LIST');
  const columns = [
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
      dataIndex: 'phone_nummber',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Children',
      dataIndex: 'start_time',
      align: 'center',
    },
    {
      title: 'Status',
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
      title="Manage parent"
      style={{ width: '100%', background: 'none' }}
      headStyle={{ backgroundColor: 'white' }}
      bodyStyle={{
        padding: viewType === 'CARD' && 0,
        backgroundColor: viewType === 'LIST' && 'white',
      }}
      extra={[
        <Button key="add-new" onClick={() => navigate('/dashboard/parent/new')}>
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} url="/r/batches/" />
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
