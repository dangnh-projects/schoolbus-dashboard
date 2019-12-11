import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'store/message/message.meta';

const StudentSelectionModal = props => {
  const { students = [] } = props;
  const dispatch = useDispatch();
  const { selectedStudents = [] } = useSelector(store => store.message);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        dispatch(actionCreator.addStudent(record));
      } else {
        dispatch(actionCreator.removeStudent(record));
      }
    },
  };

  useEffect(() => {
    // process selected
    const selected = [];
    for (let i = 0; i < students.length; i++) {
      const fnd = selectedStudents.find(
        student => student.student.id === students[i].student.id
      );
      if (fnd) {
        selected.push(i);
      }
    }
    setSelectedRowKeys(selected);
  }, [students]);

  const handleOK = () => {};

  return (
    <Modal
      visible={props.visible}
      onOk={() => handleOK}
      onCancel={() => props.setVisible && props.setVisible(false)}
      okText="Submit"
    >
      <Table
        rowSelection={rowSelection}
        columns={[
          {
            title: 'Name',
            render: (_, i) => i.student.name,
          },
          {
            title: 'Class',
            render: (_, i) => i.student.classroom,
          },
        ]}
        dataSource={students}
      />
    </Modal>
  );
};

export default StudentSelectionModal;
