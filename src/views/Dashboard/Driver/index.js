import React from 'react';
import { Card, Button, Popconfirm, Icon, Row, Col, Input } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { BASE_URL } from 'api';

//const ButtonGroup = Button.Group;

const { Search } = Input;

export const Driver = props => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Avatar',
      render: (_, record) =>
        record.image ? (
          <img
            alt="avatar"
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

  const handleOnSearch = term => {
    props.getList({
      url: '/core/api/driver',
      search: term,
    });
  };

  return (
    <Card
      title="Manage Driver"
      extra={[
        <Row type="flex" gutter={16}>
          <Col>
            <Search onSearch={handleOnSearch} />
          </Col>
          <Col>
            <Button
              key="add-new"
              onClick={() => navigate('/dashboard/driver/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
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
