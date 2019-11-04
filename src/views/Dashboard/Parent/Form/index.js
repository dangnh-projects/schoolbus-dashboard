import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import BaseForm from 'components/Form';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { API } from 'api/metaData';

const Item = Form.Item;

const BatchForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);
  const [courses, setCourses] = useState([]);

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
    if (id) {
      fields.id = id;
      updateItem({
        url: '/r/batches/',
        data: fields,
        afterSave: () => navigate('/dashboard/batch'),
      });
    } else {
      formSave({
        url: '/r/batches/',
        data: fields,
        afterSave: () => navigate('/dashboard/batch'),
      });
    }
  };
  id = parseInt(id);
  useEffect(() => {
    getCourses();
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
    }
  }, [item, data, id]);

  return (
    <Card title={id ? 'Update parent' : 'Create New Parent'}>
      {/* <BaseForm
        fields={[
          {
            type: 'TEXT',
            label: 'License plate',
            name: 'name',
            rules: [
              {
                required: true,
                message: 'Name is required',
              },
            ],
            defaultValue: item ? item.name : '',
          },
          {
            type: 'TEXT',
            label: 'Code',
            name: 'code',
            rules: [
              {
                required: true,
                message: 'Code is required',
              },
            ],
            defaultValue: item ? item.code : '',
          },
          {
            type: 'SELECT',
            label: 'Driver',
            name: 'course_id',
            options: courses.map(course => ({
              value: course.id,
              title: course.name,
            })),
            defaultValue: item
              ? item.course_id
              : courses.length > 0 && courses[0].id,
          },

          {
            type: 'SELECT',
            label: 'Quản sinh',
            name: 'course_id',
            options: courses.map(course => ({
              value: course.id,
              title: course.name,
            })),
            defaultValue: item
              ? item.course_id
              : courses.length > 0 && courses[0].id,
          },
        ]}
        handleSubmit={handleSubmit}
      /> */}
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
              <Col md={12}>
                <Item label="Phone">
                  <Input />
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
                <Item label="Ward">
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="District">
                  <Input />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Province">
                  <Input />
                </Item>
              </Col>
            </Row>
            <Divider orientation="left">Children</Divider>
            <Table
              columns={[
                { title: 'Name', key: 'name' },
                { title: 'Class', key: 'name' },
                { title: 'Bus registered date', key: 'name' },
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
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchForm);
