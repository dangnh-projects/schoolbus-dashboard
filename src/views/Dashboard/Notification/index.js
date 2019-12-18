import React from 'react';
import { Card, Row, Col, Input, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { TabPane } = Tabs;
const { Search } = Input;

export const Notification = props => {
  const columns = [
    {
      title: 'Route type',
      dataIndex: 'routetype',
    },
    {
      title: 'Route name',
      dataIndex: 'routename',
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
      dataIndex: 'contents',
    },
  ];

  const handleOnSearch = term => {
    props.getList({
      url: '/core/api/notification',
      search: term,
    });
  };

  return (
    <Card title="Activity History">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="notification" />
              Notification content
            </span>
          }
          key="1"
        >
          <Row type="flex" gutter={16}>
            <Col>
              <Search
                style={{ marginBottom: '24px' }}
                onSearch={handleOnSearch}
              />
            </Col>
          </Row>
          <DataTable columns={columns} url="/core/api/notification" />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="setting" />
              Receiver setting
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
)(Notification);
