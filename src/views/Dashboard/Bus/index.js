import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const ButtonGroup = Button.Group;

export const Bus = props => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      align: 'center',
    },
    {
      title: 'License Plate',
      dataIndex: 'licenseplate',
      align: 'center',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'Route Name',
      dataIndex: 'routename',
      align: 'center',
    },
    {
      title: 'Transportation Brand',
      dataIndex: 'transportationbrand',
      align: 'center',
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      align: 'center',
    },
    {
      title: 'Bus Supervisor',
      dataIndex: 'bussupervisor',
      align: 'center',
    },
    {
      title: 'Start Working Day',
      dataIndex: 'startworkingday',
      align: 'center',
    },
    {
      title: 'No of Seat',
      dataIndex: 'No of Seat',
      align: 'center',
    },
  ];

  return (
    <Card
      title="Manage bus"
      headStyle={{ backgroundColor: 'white' }}
      extra={[
        <Button key="add-new" onClick={() => navigate('/dashboard/bus/new')}>
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} url="/r/batches/" />
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
)(Bus);
