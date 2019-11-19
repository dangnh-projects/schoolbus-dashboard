import React from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

//const ButtonGroup = Button.Group;

export const Driver = props => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Start working date',
      dataIndex: 'start_working_date',
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
              onClick={() => navigate(`/dashboard/driver/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/core/api/driver/${record.id}`,
                  afterDelete: () => props.getList({ url: '/core/api/driver' }),
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
      title="Manage Driver"
      extra={[
        <Button key="add-new" onClick={() => navigate('/dashboard/driver/new')}>
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/driver" />
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
)(Driver);
