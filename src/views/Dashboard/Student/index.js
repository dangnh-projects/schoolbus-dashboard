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
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Student Code',
            dataIndex: 'studentcode'
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday'
        },
        {
            title: 'Sex',
            dataIndex: 'sex'
        },
        {
            title: 'Class',
            dataIndex: 'class'
        },
    ]

    return(
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