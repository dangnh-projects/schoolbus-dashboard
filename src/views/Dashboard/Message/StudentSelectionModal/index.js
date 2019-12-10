import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const StudentSelectionModal = props => {
  const dispatch = useDispatch();
  const { selectedStudents } = useSelector(store => store.message);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys);
    console.log(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
  };

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
        dataSource={props.students}
      />
    </Modal>
  );
};

export default StudentSelectionModal;
