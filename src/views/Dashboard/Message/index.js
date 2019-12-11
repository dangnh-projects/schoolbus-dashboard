import React, { useState, useEffect, useMemo, memo } from 'react';
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

const BodyTable = memo(props => {
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      const { students } = record;
      if (selected) {
        students.forEach(student =>
          props.dispatch(messageActionCreator.addStudent(student))
        );
      } else {
        students.forEach(student =>
          props.dispatch(messageActionCreator.removeStudent(student))
        );
      }
    },

    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        selectedRows.forEach(record => {
          const { students } = record;
          students.forEach(student =>
            props.dispatch(messageActionCreator.addStudent(student))
          );
        });
      } else {
        changeRows.forEach(record => {
          const { students } = record;
          students.forEach(student =>
            props.dispatch(messageActionCreator.removeStudent(student))
          );
        });
      }
    },
  };

  return (
    <Table
      columns={props.columns}
      loading={props.loading}
      rowSelection={rowSelection}
      bordered
      size="middle"
      dataSource={props.rows}
      pagination={{
        total: props.count,
        current: props.page + 1,
      }}
      onChange={pagination => {
        props.dispatch(actionCreator.setPage(pagination.current - 1));
        props.dispatch(
          actionCreator.getList({
            url: '/core/api/bus-route',
            // search: search || '',
          })
        );
      }}
    />
  );
});

const caculateSelected = (routes, selectedStudents) => {
  routes.forEach(route => {
    let count = 0;
    const { students } = route;
    students.forEach(std => {
      if (
        selectedStudents.find(student => student.student.id === std.student.id)
      ) {
        count++;
      }
    });

    route.selected = count;
  });

  return routes;
};

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
    dispatch(messageActionCreator.setStudents([]));
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
          {i.students && i.students.length + ' students'} <br /> {i.selected}{' '}
          selected
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
    if (!title || !body) {
      notification.warn({ message: 'Please fill title and body' });
      return;
    }
    if (selectedStudents.length === 0) {
      notification.warn({
        message: 'Please select at least 1 student to send notification',
      });
      return;
    }
    const parents = selectedStudents.map(student => student.student.parent);
    const dedupParent = Array.from(new Set(parents));
    const data = {
      title,
      body,
      parents: JSON.stringify(dedupParent),
    };
    // console.log(parents);

    confirm({
      title: 'Are you sure to perform this action?',
      content: (
        <Col>
          <Row>
            This message will send notification to {dedupParent.length} parents.{' '}
          </Row>
        </Col>
      ),
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        dispatch(messageActionCreator.sendMessage(data));
        notification.info({ message: 'Processing ... ' });
      },
      onCancel() {},
    });
  };

  const rows = useMemo(() => caculateSelected(data, selectedStudents), [
    data,
    selectedStudents,
  ]);

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
      <BodyTable
        columns={columns}
        loading={loading}
        rows={rows}
        count={count}
        page={page}
        dispatch={dispatch}
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
