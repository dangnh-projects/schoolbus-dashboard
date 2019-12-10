import React, { useState, useEffect } from 'react';
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
import { connect, useDispatch, useSelector } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import StudentSelectionModal from './StudentSelectionModal';

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

const processData = routes => {
  const output = [];
  routes.map(route => {
    const { students } = route;
  });

  return output;
};
export const Message = props => {
  const [state, setState] = useState(false);
  const { data = [] } = useSelector(store => store.dataTable);

  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // get bus route
    dispatch(actionCreator.getList({ url: '/core/api/bus-route' }));
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
          Bus routes
        </Col>
        {/* <Col md={12} style={{ textAlign: 'right' }}>
          <Button style={{ width: 100 }} onClick={showModal}>
            Add
          </Button>
        </Col> */}
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
      <StudentSelectionModal visible={state} students={students} />
    </Card>
  );
};

export default Message;
