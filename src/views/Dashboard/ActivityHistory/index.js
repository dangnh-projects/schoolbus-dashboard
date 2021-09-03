import React from 'react';
import { Card, Row, Col, Input, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { TabPane } = Tabs;
const { Search } = Input;

export const ActivityHistory = props => {
  const columns = [
    {
      title: 'Route type',
      dataIndex: 'route_type',
    },
    {
      title: 'Route name',
      dataIndex: 'route_name',
    },
    {
      title: 'Datetime',
      dataIndex: 'datetime',
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
    },
    {
      title: 'Contents',
      dataIndex: 'content',
    },
  ];

  const handleOnSearch = term => {
    props.getList({
      url: '/core/api/log/messages',
      search: term,
    });
  };

  return (
    <Card title="Activity History">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="message" />
              Message
            </span>
          }
          key="1"
        >
          <Row
            style={{ marginBottom: '12px', float: 'right' }}
            type="flex"
            gutter={16}
          >
            <Col>
              <Search onSearch={handleOnSearch} />
            </Col>
          </Row>
          <DataTable columns={columns} url="/core/api/log/messages" />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="unordered-list" />
              Activity
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
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
)(ActivityHistory);
