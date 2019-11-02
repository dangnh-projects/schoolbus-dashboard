import React, { useState } from 'react'
import { Card, Button, Popconfirm, Icon, Row } from 'antd';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';
import { actionCreator } from 'store/dataTable/dataTable.meta';

export const Student = props =>{
    const [viewType, setViewType] = useState('LIST');
    const columns = [
        {
            title: 'No',
            dataIndex: 'no'
        },
        {
            title: 'Picture',
            dataIndex: 'picture'
        },
        {
            title: 'First Name',
            dataIndex: 'firstname'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber'
        },
        {
            title: 'Start Working Day',
            dataIndex: 'class'
        },
        {
            title: 'Status',
            dataIndex: 'district'
        },
        {
            title: 'Bus No',
            dataIndex: 'ward'
        },
        {
            title: 'Address',
            dataIndex: 'parent'
        },
    ]

    return(
        <Card
            title="Manage Supervisor"
            style={{width: '100%', background: 'none',}}
            headStyle={{backgroundColor: 'white',}}
            bodyStyle={{
                padding: viewType === 'CARD' && 0,
                backgroundColor: viewType === 'LIST' && 'white',
            }}
            extra={[
                <Button key="add-new" onClick={()=>navigate('/dashboard/supervisor/new')}>
                    Add
                </Button>
            ]}
        >
            {viewType === 'LIST' && <DataTable columns={columns} />}
            {viewType === 'CARD' && <GridView />}
        </Card>
    )
}

const mapDispatchToProps = {
    getList: actionCreator.getList,
    deleteItem: actionCreator.deleteItem,
};

const mapStateToProps = state => state.dataTable;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student);