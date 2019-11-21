import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Student = props => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
    },
    {
      title: 'Picture',
      dataIndex: 'picture',
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Class',
      dataIndex: 'class',
    },
    {
      title: 'District',
      dataIndex: 'district',
    },
    {
      title: 'Ward',
      dataIndex: 'ward',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
    },
    {
      title: 'Registered Date',
      dataIndex: 'registereddate',
    },
    {
      title: 'Bus No',
      dataIndex: 'busno',
    },
    {
      title: 'To School',
      dataIndex: 'to school',
    },
    {
      title: 'To Home',
      dataIndex: 'tohome',
    },
  ];

  return (
    <Card
      title="Manage Students"
      extra={[
        <Button
          key="add-new"
          onClick={() => navigate('/dashboard/student/new')}
        >
          Add
        </Button>,
      ]}
    >
      <DataTable columns={columns} />
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
)(Student);
