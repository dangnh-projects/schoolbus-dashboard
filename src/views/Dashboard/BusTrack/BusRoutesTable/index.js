import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

const LiveTable = props => {
  const columns = [
    {
      title: 'Route name',
      dataIndex: 'name',
    },
    {
      title: 'Bus number',
      render: (_, i) => i.bus && i.bus.number,
    },

    {
      title: 'Driver',
      render: (_, i) => i.driver && i.driver.name,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) =>
        i.bus_supervisor &&
        i.bus_supervisor.first_name + ' ' + i.bus_supervisor.last_name,
    },
    {
      title: 'Start time',
      render: (_, i) => moment(i.start_time, 'HH:mm:ss').format('HH:mm'),
    },
    {
      title: 'End time',
      render: (_, i) => moment(i.end_time, 'HH:mm:ss').format('HH:mm'),
    },
  ];

  return (
    <Table
      columns={columns}
      bordered
      size="middle"
      dataSource={props.dataSource || []}
    />
  );
};

export default LiveTable;
