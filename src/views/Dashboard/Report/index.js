import React, { useState } from 'react';
import { Card, List, Avatar } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Report = props => {
  //const [state, setState] = useState(false);

  const data = [
    {
      title: 'Ant Design Title 1',
      description:
        'Ant Design, a design language for background applications 1',
      id: 1,
    },
    {
      title: 'Ant Design Title 2',
      description:
        'Ant Design, a design language for background applications 2',
      id: 2,
    },
    {
      title: 'Ant Design Title 3',
      description:
        'Ant Design, a design language for background applications 3',
      id: 3,
    },
    {
      title: 'Ant Design Title 4',
      description:
        'Ant Design, a design language for background applications 4',
      id: 4,
    },
    {
      title: 'Ant Design Title 5',
      description:
        'Ant Design, a design language for background applications 5',
      id: 5,
    },
    {
      title: 'Ant Design Title 6',
      description:
        'Ant Design, a design language for background applications 6',
      id: 6,
    },
    {
      title: 'Ant Design Title 7',
      description:
        'Ant Design, a design language for background applications 7',
      id: 7,
    },
    {
      title: 'Ant Design Title 8',
      description:
        'Ant Design, a design language for background applications 8',
      id: 8,
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
