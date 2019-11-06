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
            title: 'Birthday',
            dataIndex: 'birthday'
        },
        {
            title: 'Class',
            dataIndex: 'class'
        },
        {
            title: 'District',
            dataIndex: 'district'
        },
        {
            title: 'Ward',
            dataIndex: 'ward'
        },
        {
            title: 'Parent',
            dataIndex: 'parent'
        },
        {
            title: 'Registered Date',
            dataIndex: 'registereddate'
        },
        {
            title: 'Bus No',
            dataIndex: 'busno'
        },
        {
            title: 'To School',
            dataIndex: 'to school'
        },
        {
            title: 'To Home',
            dataIndex: 'tohome'
        },
    ]

    return (
        <Card
            title="Manage Students"
            style={{width: '100%', background: 'none',}}
            headStyle={{backgroundColor: 'white',}}
            bodyStyle={{
                padding: viewType === 'CARD' && 0,
                backgroundColor: viewType === 'LIST' && 'white',
            }}
            extra={[
                <Button key="add-new" onClick={()=>navigate('/dashboard/student/new')}>
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