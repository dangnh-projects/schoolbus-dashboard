import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

const BusStudent = props => {
  const { students = [] } = useSelector(store => store.busRoute);
  return (
    <Table
      columns={[
        {
          title: 'ID',
          render: (_, record) => record.student && record.student.id,
        },
        {
          title: 'Name',
          render: (_, record) => record.student && record.student.name,
        },
        {
          title: 'Class',
          render: (_, record) => record.student && record.student.classroom,
        },

        {
          title: 'Bus Location',
          render: (_, record) =>
            record.location &&
            `${record.location.address} ${record.location.street} ${record
              .location.ward !== '' && 'phường ' + record.location.ward} ${
              record.location.district
            }`,
        },
        // {
        //   title: 'Status',
        //   dataIndex: 'end_time',
        //   align: 'center',
        // },
      ]}
      dataSource={students}
    />
  );
};

export default BusStudent;
