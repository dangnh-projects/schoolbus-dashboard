import React, { useState, useEffect } from 'react'
import { Card, notification, Button, Modal } from 'antd'
import { navigate } from '@reach/router'
import DataTable from 'components/DataTable'
import BaseForm from 'components/StudentForm'
import GridView from 'components/GridView'
import { connect } from 'react-redux'
import { actionCreator } from 'store/dataTable/dataTable.meta'
import { API } from 'api/metaData'



const BatchForm = ({ formSave, updateItem, id, data }) => {
    const [item, setItem] = useState(null);
    const [courses, setCourses] = useState([]);
    const [viewType, setViewType] = useState('LIST');
    const [showParent, setShowParent] = useState(false);

    const getCourses = async () => {
        const { body } = await API.getCourse();
        setCourses(body.results);
    };

    const handleSubmit = fields => {
        if (fields.start_time > fields.end_time) {
          notification.error({
            message: 'End time must not be set before start time',
          });
          return;
        }
    
        fields.start_time = fields.start_time.format('YYYY-MM-DD');
        fields.end_time = fields.end_time.format('YYYY-MM-DD');
    };

    id = parseInt(id);
    useEffect(() => {
        //getCourses();
        if (id) {
            const found = data.find(item => item.id === id);
            setItem(found);
        }
    }, [item, data, id]);
    
    const showModal = () => {
        setShowParent(!showParent);
    };

    const handleOk = () => {
        setShowParent(!showParent);
    };

    const handleCancel = () => {
        setShowParent(!showParent);
    };

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullname'
        },
        {
            title: 'Class',
            dataIndex: 'class'
        },
        {
            title: 'Bus Registered Date',
            dataIndex: 'busregistereddate'
        },
    ]

    return (
        <div>
        
            <Card title={id ? 'Update Student' : 'Create New Student'}>
                <BaseForm
                fields_0={[
                    {
                        type: 'TEXT',
                        label: 'First Name',
                        name: 'firstname',
                        rules: [
                        {
                            required: true,
                            message: 'First name is required',
                        },
                        ],
                    },
                    {
                        type: 'TEXT',
                        label: 'Last Name',
                        name: 'lastname',
                        rules: [
                            {
                                required: true,
                                message: 'Last name is required',
                            },
                        ],
                    },
                    {
                        type: 'DATE_PICKER',
                        label: 'Birthday',
                        name: 'Birthday',
                    },
                    {
                        type: 'TEXT',
                        label: 'School',
                        name: 'School',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'TEXT',
                        label: 'Class',
                        name: 'class',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'DATE_PICKER',
                        label: 'Bus Registered Date',
                        name: 'busregistereddate',
                    },
                ]}
                fields_1={[
                    {
                        type: 'TEXT',
                        label: 'No',
                        name: 'no',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'TEXT',
                        label: 'District',
                        name: 'district',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'TEXT',
                        label: 'Ward',
                        name: 'ward',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'TEXT',
                        label: 'Province',
                        name: 'province',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                ]}
                fields_2={[
                    {
                        type: 'CHECKBOX',
                        label: 'To School',
                        name: 'toschool',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                    {
                        type: 'CHECKBOX',
                        label: 'To Home',
                        name: 'tohome',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                ]}
                fields_3={[
                    {
                        type: 'SELECT',
                        label: 'Parent',
                        name: 'parent',
                        options: courses.map(course => ({
                            value: '',
                            title: course.name,
                        })),
                    },
                    {
                        type: 'TEXT',
                        label: 'Mobile',
                        name: 'mobile',
                        rules: [
                            {
                                required: false,
                            },
                        ],
                    },
                ]}
                handleSubmit= { handleSubmit }
            />
            </Card>
            <Card
                title="Sibling"
                style={{width: '100%', background: 'none',}}
                headStyle={{backgroundColor: 'white',}}
                bodyStyle={{
                    padding: viewType === 'CARD' && 0,
                    backgroundColor: viewType === 'LIST' && 'white',
                }}
                extra={[
                    <Button key="add-new" onClick={showModal}>
                        (+) Add Parent
                    </Button>
                ]}
            >
                <Modal
                    title="Add Parent"
                    visible= {showParent}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                {viewType === 'LIST' && <DataTable columns={columns} />}
                {viewType === 'CARD' && <GridView />}
            </Card>
        </div>
    );
}

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchForm);