import React, { useState } from 'react';
import { Card, List, Avatar } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Report = props => {
  //const [state, setState] = useState(false);

  const data = [
    {
      title: 'Thống kê số lượng học sinh đi trong tháng',
      description: 'Số lượng học sinh đi trong tháng',
      id: 1,
    },
    {
      title: 'Thống kê tháng học sinh đi nhiều nhất',
      description: 'Thống kê tháng học sinh đi nhiều nhất',
      id: 2,
    },
    {
      title: 'Thống kê học sinh trễ, lỡ chuyến',
      description: 'Thống kê học sinh trễ, lỡ chuyến',
      id: 3,
    },
    {
      title: 'Thống kê độ tuổi giám sinh',
      description: 'Thống kê độ tuổi giám sinh',
      id: 4,
    },
    {
      title: 'Thống kê số lượng tin nhắn giám sinh gửi phụ huynh',
      description: 'Thống kê số lượng tin nhắn giám sinh gửi phụ huynh',
      id: 5,
    },
    {
      title: 'Thống kê số lượng tuyến tài xế đi trong tháng',
      description: 'Thống kê số lượng tuyến tài xế đi trong tháng',
      id: 6,
    },
    {
      title: 'Thống kê số lượng tuyến có học sinh bị lỡ',
      description: 'Thống kê số lượng tuyến có học sinh bị lỡ',
      id: 7,
    },
  ];

  return (
    <Card title="Manage report">
      <List
        itemLayout="horizontal"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href={`/dashboard/report/${item.id}`}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
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
)(Report);
