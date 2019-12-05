import React, { useState } from 'react';
import {
  Card,
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
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

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

export const Message = props => {
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

  const showModal = () => {
    setState(!state);
  };
  const handleOk = e => {
    setState(!state);
  };

  const handleCancel = e => {
    setState(!state);
  };

  return (
    <Card title="Manage message">
      <Row gutter={16}>
        <Col md={2}>Message</Col>
        <Col md={22}>
          <TextArea row={6} />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24, marginTop: 24 }}>
        <Col md={12} style={{ textAlign: 'left' }}>
          Parent
        </Col>
        <Col md={12} style={{ textAlign: 'right' }}>
          <Button style={{ width: 100 }} onClick={showModal}>
            Add
          </Button>
        </Col>
      </Row>
      <DataTable
        columns={columns}
        //url="/core/api/message"
        //dataTranform={dataTranform}
      />
      <Row gutter={16} style={{ textAlign: 'right' }}>
        <Col md={24}>
          <Button type="primary" style={{ width: 100 }} onClick={showConfirm}>
            Submit
          </Button>
        </Col>
      </Row>
      <Modal
        title="Add Parent"
        visible={state}
        onOk={handleOk}
        onCancel={handleCancel}
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
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
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
)(Message);
