import React from 'react';
import { Card, Button, Popconfirm, Icon, Row, Tag, Input, Col } from 'antd';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { Search } = Input;

export const Bus = props => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'License Plate',
      // dataIndex: 'vehicle_registration_plate',
      render: (_, item) => <Tag>{item.vehicle_registration_plate}</Tag>,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Transportation Brand',
      dataIndex: 'brand',
      align: 'center',
    },
    {
      title: 'Used from',
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

  const handleOnSearch = term => {
    dispatch(
      actionCreator.getList({
        url: '/core/api/bus',
        search: term,
      })
    );
  };

  return (
    <Card
      title="Manage bus"
      headStyle={{ backgroundColor: 'white' }}
      extra={[
        <Row type="flex" gutter={16}>
          <Col>
            <Search onSearch={handleOnSearch} />
          </Col>
          <Col>
            <Button
              key="add-new"
              onClick={() => navigate('/dashboard/bus/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/bus" />
    </Card>
  );
};

export default Bus;
