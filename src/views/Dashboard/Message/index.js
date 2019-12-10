import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  Modal,
  Table,
  notification,
} from 'antd';
//import { navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { actionCreator as messageActionCreator } from 'store/message/message.meta';
import StudentSelectionModal from './StudentSelectionModal';

const { TextArea } = Input;
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

// const processData = routes => {
//   const output = [];
//   routes.map(route => {
//     const { students } = route;
//   });

//   return output;
// };
export const Message = props => {
  const [state, setState] = useState(false);
  const { data = [], loading, count, page } = useSelector(
    store => store.dataTable
  );
  const { selectedStudents = [] } = useSelector(store => store.message);

  const [students, setStudents] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // get bus route
    dispatch(actionCreator.getList({ url: '/core/api/bus-route' }));
    // dispatch(messageActionCreator.setStudents([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickStudent = students => {
    setState(true);
    setStudents(students);
  };

  const columns = [
    {
      title: 'Route name',
      dataIndex: 'name',
    },
    {
      title: 'Bus number',
      render: (_, i) =>
        // <a href={`/dashboard/bus/${i.bus.id}`}>{i.bus.number}</a>
        i.bus && i.bus.number,
    },

    {
      title: 'Driver',
      render: (_, i) =>
        // <a href={`/dashboard/driver/${i.driver.id}`}>{i.driver.name}</a>
        i.driver && i.driver.name,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) =>
        // <a href={`/dashboard/bus-supervisor/${i.bus_supervisor.id}`}>
        //   {i.bus_supervisor.first_name + ' ' + i.bus_supervisor.last_name}
        // </a>
        i.bus_supervisor &&
        i.bus_supervisor.first_name + ' ' + i.bus_supervisor.last_name,
    },

    {
      title: 'Select',
      render: (_, i) => (
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleClickStudent(i.students)}
        >
          {i.students && i.students.length + ' students'} <br /> 0 selected
        </span>
      ),
    },
    {
      title: 'Route type',
      render: (_, i) => (i.route_type === 'P' ? 'Pickup' : 'Drop-off'),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys);
    console.log(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSubmit = props => {
    if (selectedStudents.length === 0) {
      notification.warn({
        message: 'Please select at least 1 student to send notification',
      });
    }
    const data = {
      title,
      body,
      parents: JSON.stringify(
        selectedStudents.map(student => student.student.parent)
      ),
    };

    dispatch(messageActionCreator.sendMessage(data));
  };

  return (
    <Card title="Manage message">
      <Row type="flex" gutter={[16, 16]} style={{ marginBottom: 12 }}>
        <Col md={2}>Title</Col>
        <Col md={22}>
          <Input onChange={e => setTitle(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col md={2}>Message</Col>
        <Col md={22}>
          <TextArea onChange={e => setBody(e.target.value)} row={6} />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24, marginTop: 24 }}>
        <Col md={12} style={{ textAlign: 'left' }}>
          Bus routes
        </Col>
        {/* <Col md={12} style={{ textAlign: 'right' }}>
          <Button style={{ width: 100 }} onClick={showModal}>
            Add
          </Button>
        </Col> */}
      </Row>
      <Table
        columns={columns}
        loading={loading}
        bordered
        size="middle"
        dataSource={data}
        pagination={{
          total: count,
          current: page + 1,
        }}
        onChange={pagination => {
          dispatch(actionCreator.setPage(pagination.current - 1));
          dispatch(
            actionCreator.getList({
              url: '/core/api/bus-route',
              // search: search || '',
            })
          );
        }}
      />
      <Row gutter={16} style={{ textAlign: 'right' }}>
        <Col md={24}>
          <Button type="primary" style={{ width: 100 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
      <StudentSelectionModal
        visible={state}
        students={students}
        setVisible={setState}
      />
    </Card>
  );
};

export default Message;
