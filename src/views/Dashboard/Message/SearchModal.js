import React, { useState } from 'react';
import {
  Button,
  Popconfirm,
  Icon,
  Row,
  Tag,
  Col,
  Input,
  Modal,
  Table,
  Select,
} from 'antd';
//import { navigate } from '@reach/router';
import DataTable from 'components/DataTable';

const { TextArea, Search } = Input;
const { Option } = Select;
const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Are you sure?',
    content: 'This action cannot be rollback',
    okText: 'Yes',
    cancelText: 'No',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

export const SearchModal = props => {
  const [state, setState] = useState(false);

  // const dataTranform = records => {
  //   return records.map(record => {
  //     const new_record = { ...record };
  //     if (new_record.children) {
  //       const new_children = [...new_record.children];
  //       delete new_record.children;
  //       new_record.new_children = new_children;
  //     }
  //     return new_record;
  //   });
  // };

  const columns = [
    {
      title: 'Parent',
      dataIndex: 'parent',
    },
    {
      title: 'Student',
      render: (_, record) => (
        <Col>
          {record.new_children &&
            record.new_children.map(child => <Tag>{child.name}</Tag>)}
        </Col>
      ),
    },
    {
      title: 'Bus',
      dataIndex: 'bus',
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisor',
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
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
              //onClick={() => navigate(`/dashboard/parent/${record.info}`)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() =>
                props.deleteItem({
                  //url: `/core/api/parent/${record.info}`,
                  //afterDelete: () => props.getList({ url: '/core/api/parent' }),
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
    <Modal
      title="Add Parent"
      visible={state}
      onOk={() => props.handleOk && props.handleOk()}
      onCancel={() => props.handleCancel && props.handleCancel()}
      okText="Submit"
    >
      <Row gutter={16}>
        <Col md={11}>
          <Search
            placeholder="Parent name"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col md={2} style={{ textAlign: 'center' }}>
          by
        </Col>
        <Col md={11} style={{ textAlign: 'right' }}>
          <Select
            showSearch
            style={{ width: 200, marginBottom: 24 }}
            placeholder="Select"
            optionFilterProp="children"
            //onChange={onChange}
            //onFocus={onFocus}
            //onBlur={onBlur}
            //onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Parent name</Option>
            {/* <Option value="lucy">Bus route name</Option>
              <Option value="tom">Supervisor name</Option> */}
          </Select>
        </Col>
      </Row>

      <Table
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Student', dataIndex: 'student' },
          { title: 'Bus', dataIndex: 'bus' },
          { title: 'Supervisor', dataIndex: 'supervisor' },
        ]}
      />
    </Modal>
  );
};

export default SearchModal;
