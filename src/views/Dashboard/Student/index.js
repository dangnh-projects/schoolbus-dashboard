import React, { useState, useEffect } from 'react';
import { Card, Button, Popconfirm, Icon, Row, Input, Col } from 'antd';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { BASE_URL } from 'api';

const { Search } = Input;

export const Student = props => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Picture',
      render: (_, record) =>
        record.image ? (
          <img
            alt="student"
            style={{ width: '60px', height: 'auto', textAlign: 'center' }}
            src={BASE_URL + record.image}
          />
        ) : (
          ''
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Alternative Name',
      dataIndex: 'alternative_name',
    },
    {
      title: 'Class',
      dataIndex: 'classroom',
    },
    {
      title: 'Address',
      render: (_, record) =>
        `${record.home_number || ''} ${record.street || ''} ${record.ward ||
          ''} ${record.district || ''}`,
    },
    {
      title: 'Parent',
      render: (_, record) =>
        record.parent
          ? `${record.parent.first_name} ${record.parent.last_name}`
          : '',
    },
    // {
    //   title: 'Registered Date',
    //   dataIndex: 'registereddate',
    // },
    // {
    //   title: 'Bus No',
    //   dataIndex: 'busno',
    // },
    {
      title: 'Pick-up Route',
      render: (_, record) => {
        const { bus_routes } = record;
        if (bus_routes && bus_routes.length > 0) {
          const found = bus_routes.find(
            item => item.route && item.route.route_type === 'P'
          );
          if (found) {
            return found.route.name;
          }
        }
        return '';
      },
    },
    {
      title: 'Drop-off Route',
      render: (_, record) => {
        const { bus_routes } = record;
        if (bus_routes && bus_routes.length > 0) {
          const found = bus_routes.find(
            item => item.route && item.route.route_type === 'D'
          );
          if (found) {
            return found.route.name;
          }
        }
        return '';
      },
    },

    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/student/${record.id}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                dispatch(
                  actionCreator.deleteItem({
                    url: `/core/api/student/${record.id}`,
                    afterDelete: () =>
                      dispatch(
                        actionCreator.getList({ url: '/core/api/student' })
                      ),
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
    navigate('/dashboard/student/search/' + term);
  };

  useEffect(() => {
    setSearch(props.term);
  }, [props.term]);

  return (
    <Card
      title="Manage Students"
      extra={[
        <Row type="flex" gutter={16}>
          <Col>
            <Search
              value={search}
              onChange={e => setSearch(e.target.value)}
              onSearch={handleOnSearch}
            />
          </Col>
          <Col>
            <Button
              key="add-new"
              onClick={() => navigate('/dashboard/student/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <DataTable columns={columns} url="/core/api/student" term={props.term} />
    </Card>
  );
};

export default Student;
