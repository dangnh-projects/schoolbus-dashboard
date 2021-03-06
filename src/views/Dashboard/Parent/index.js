import React, { useState, useEffect } from 'react';
import { Card, Button, Popconfirm, Icon, Row, Tag, Col, Input } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { BASE_URL } from 'api';

const { Search } = Input;

export const Parent = props => {
  const [search, setSearch] = useState();
  const dataTranform = records => {
    return records.map(record => {
      const new_record = { ...record };
      if (new_record.children) {
        const new_children = [...new_record.children];
        delete new_record.children;
        new_record.new_children = new_children;
      }
      return new_record;
    });
  };
  const columns = [
    {
      title: 'Avatar',
      render: (_, record) =>
        record.avatar ? (
          <img
            alt="avatar"
            style={{ width: '80px', height: 'auto', textAlign: 'center' }}
            src={BASE_URL + record.avatar}
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
      render: (_, record) => (
        <Col>
          {record.new_children &&
            record.new_children.map(child => <Tag>{child.name}</Tag>)}
        </Col>
      ),
    },
    // {
    //   title: 'Status',
    //   render: (_, record) =>
    //     record.status === 'A' ? (
    //       <Tag color="#3e8247">Active</Tag>
    //     ) : (
    //       <Tag>Inactive</Tag>
    //     ),
    //   align: 'center',
    // },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => navigate(`/dashboard/parent/${record.info}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  url: `/core/api/parent/${record.info}`,
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

  const handleOnSearch = term => {
    navigate('/dashboard/parent/search/' + term);
  };

  useEffect(() => {
    setSearch(props.term);
  }, [props.term]);

  return (
    <Card
      title="Manage parent"
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
              onClick={() => navigate('/dashboard/parent/new')}
            >
              Add
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <DataTable
        columns={columns}
        url="/core/api/parent"
        dataTranform={dataTranform}
        term={props.term}
      />
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
