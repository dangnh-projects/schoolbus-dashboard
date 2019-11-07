import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import {
    Card,
    notification,
    Form,
    Col,
    Row,
    Input,
    Divider,
    Table,
    DatePicker,
    Upload,
    Icon,
  } from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from 'store/dataTable/dataTable.meta'
import { API } from 'api/metaData'
//import { navigate } from '@reach/router'

const Item = Form.Item;

const StudentForm = ({ formSave, updateItem, id, data }) => {
    const [item, setItem] = useState(null);
    const [courses, setCourses] = useState([]);
    const [showParent, setShowParent] = useState(false);
    const [showBusRoute, setShowBusRoute] = useState(false);

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
    
    const showModalParent = () => {
        setShowParent(!showParent);
    };

    const handleOkParent = () => {
        setShowParent(!showParent);
    };

    const handleCancelParent = () => {
        setShowParent(!showParent);
    };

    const showModalBusRoute = () => {
        setShowBusRoute(!showBusRoute);
    };

    const handleOkBusRoute = () => {
        setShowBusRoute(!showBusRoute);
    };

    const handleCancelBusRoute = () => {
        setShowBusRoute(!showBusRoute);
    };

    return (
        <div>
            <Card title={id ? 'Update Student' : 'Create New Student'}>
            <Form style={{ padding: 16 }} layout="horizontal">
                <Row gutter={16}>
                    <Col offset={3} md={10}>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="First name" style={{ marginBottom: 12 }}>
                            <Input />
                            </Item>
                        </Col>
                        <Col md={12}>
                            <Item label="Last name">
                            <Input />
                            </Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="Birthday">
                            <DatePicker onChange={console.log} />
                            </Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="School">
                            <Input />
                            </Item>
                        </Col>
                        <Col md={12}>
                            <Item label="Class">
                            <Input />
                            </Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="Bus Registered Date">
                            <DatePicker onChange={console.log} />
                            </Item>
                        </Col>
                        </Row>
                        <Divider orientation="left">Address</Divider>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="Home number">
                            <Input />
                            </Item>
                        </Col>
                        <Col md={12}>
                            <Item label="Street">
                            <Input />
                            </Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="Ward">
                            <Input />
                            </Item>
                        </Col>
                        <Col md={12}>
                            <Item label="District">
                            <Input />
                            </Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col md={12}>
                            <Item label="Province">
                            <Input />
                            </Item>
                        </Col>
                        </Row>
                        <div style={{ textAlign: 'right' }}>
                            <Button key="add-new" onClick={showModalBusRoute}>
                                Find Bus Route
                            </Button>
                        </div>
                        <Modal
                            title="Find Bus Route"
                            visible= {showBusRoute}
                            onOk={handleOkBusRoute}
                            onCancel={handleCancelBusRoute}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                        <br />
                        <Row gutter={16}>
                        <Col md={12} style={{ textAlign: 'left' }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100px'}}>
                                Save
                            </Button>
                        </Col>
                        <Col md={12} style={{ textAlign: 'right' }}>
                            <Button key="add-new" onClick={showModalParent}>
                                (+) Add Parent
                            </Button>
                        </Col>
                        </Row>
                        <Modal
                            title="Add Parent"
                            visible= {showParent}
                            onOk={handleOkParent}
                            onCancel={handleCancelParent}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                        <Divider orientation="left">Sibling</Divider>
                        <Table
                        columns={[
                            { title: 'Student', key: 'student' },
                            { title: 'Class', key: 'class' },
                        ]}
                        />
                    </Col>
                    <Col md={6} style={{ paddingLeft: 24 }}>
                        <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        // beforeUpload={beforeUpload}
                        // onChange={this.handleChange}
                        >
                        <div>
                            <Icon type={'plus'} />
                            <div className="ant-upload-text">Avatar</div>
                        </div>
                        </Upload>
                    </Col>
                </Row>
            </Form>
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
)(StudentForm);