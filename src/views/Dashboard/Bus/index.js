import React, { useState } from 'react';
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const ButtonGroup = Button.Group;

export const Bus = props => {
  console.log('Bus view');
  const [viewType, setViewType] = useState('LIST');
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
      style={{ width: '100%', background: 'none' }}
      headStyle={{ backgroundColor: 'white' }}
      bodyStyle={{
        padding: viewType === 'CARD' && 0,
        backgroundColor: viewType === 'LIST' && 'white',
      }}
      extra={[
        <ButtonGroup style={{ marginRight: 12 }} key="action-list">
          <Button
            type={viewType === 'LIST' ? 'primary' : 'default'}
            onClick={() => setViewType('LIST')}
          >
            <Icon type="unordered-list" />
          </Button>
          <Button
            type={viewType === 'CARD' ? 'primary' : 'default'}
            onClick={() => setViewType('CARD')}
          >
            <Icon type="appstore" />
          </Button>
        </ButtonGroup>,
        <Button key="add-new" onClick={() => navigate('/dashboard/bus/new')}>
          Add
        </Button>,
      ]}
    >
      {viewType === 'LIST' && <DataTable columns={columns} url="/r/batches/" />}
      {viewType === 'CARD' && <GridView url="/r/batches/" />}
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
