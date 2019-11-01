import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const ButtonGroup = Button.Group;

export const Bus = props => {
  console.log('Bus view');
  const [viewType, setViewType] = useState('LIST');
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'BKS',
      dataIndex: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Driver',
      dataIndex: 'course_name',
    },
    {
      title: 'Giám sinh',
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
      title="Manage bus"
      style={{ width: '100%', background: 'none' }}
      headStyle={{ backgroundColor: 'white' }}
      bodyStyle={{
        padding: viewType === 'CARD' && 0,
        backgroundColor: viewType === 'LIST' && 'white',
      }}
      extra={[
        <ButtonGroup style={{ marginRight: 12 }} key="action-list">
          <Button
            type={viewType === 'LIST' ? 'primary' : 'default'}
            onClick={() => setViewType('LIST')}
          >
            <Icon type="unordered-list" />
          </Button>
          <Button
            type={viewType === 'CARD' ? 'primary' : 'default'}
            onClick={() => setViewType('CARD')}
          >
            <Icon type="appstore" />
          </Button>
        </ButtonGroup>,
        <Button key="add-new" onClick={() => navigate('/dashboard/bus/new')}>
          Add
        </Button>,
      ]}
    >
      {viewType === 'LIST' && <DataTable columns={columns} url="/r/batches/" />}
      {viewType === 'CARD' && <GridView url="/r/batches/" />}
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
