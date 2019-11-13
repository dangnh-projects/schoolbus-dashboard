import React from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect, useDispatch } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Bus = props => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'License Plate',
      dataIndex: 'vehicle_registration_plate',
      align: 'center',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'Route Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Transportation Brand',
      dataIndex: 'brand',
      align: 'center',
    },
    {
      title: 'Start Working Day',
      dataIndex: 'start_working_date',
      align: 'center',
    },
    {
      title: 'No of Seat',
      dataIndex: 'number_of_seat',
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
              onClick={() => navigate(`/dashboard/bus/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                dispatch(
                  actionCreator.deleteItem({
                    url: `/core/api/bus/${record.id}`,
                    afterDelete: () =>
                      dispatch(actionCreator.getList({ url: '/core/api/bus' })),
                  })
                )
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
      headStyle={{ backgroundColor: 'white' }}
      extra={[
        <Button key="add-new" onClick={() => navigate('/dashboard/bus/new')}>
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/bus" />
    </Card>
  );
};

export default Bus;
