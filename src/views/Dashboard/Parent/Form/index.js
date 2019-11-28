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
  message,
  Button,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
//import { API } from 'api/metaData';

const Item = Form.Item;

const ParentForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;
  const [item, setItem] = useState(null);
  const [studentTest, setStudentTest] = useState([]);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone_number, setPhoneNumber] = useState('');
  const [id_number, setIdPassport] = useState('');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState();

  const handleSubmitCheck = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        handleSubmit && handleSubmit(fieldsValue);
      }
    });
  };

  const handleSubmit = () => {
    const fields = {
      first_name,
      last_name,
      birthday,
      phone_number,
      id_number,
      //chilren,
      // homeNumber,
      // homeWard,
      // homeDistrict,
      // homeProvince,
      username,
      password,
    };
    if (avatar) {
      fields.avatar = avatar;
    }
    if (birthday > moment()) {
      notification.error({
        message: 'Birthday must not be after current date',
      });
      return;
    }
    fields.birthday = fields.birthday.format('YYYY-MM-DD');

    if (id) {
      fields.id = id;
      console.log('id: ' + fields.info);
      updateItem({
        url: '/core/api/parent/',
        data: fields,
        afterSave: () => navigate('/dashboard/parent'),
      });
    } else {
      formSave({
        url: '/core/api/parent',
        data: fields,
        afterSave: () => navigate('/dashboard/parent'),
      });
    }
  };
  id = parseInt(id);

  useEffect(() => {
    if (id) {
      const found = data.find(item => item.info === id);
      setItem(found);
      setFirstName(found.first_name);
      setLastName(found.last_name);
      setBirthday(moment(found.birthday));
      setIdPassport(found.id_number);
      setPhoneNumber(found.phone_number);
      setImgVal(process.env.REACT_APP_BACKEND_URL + found.avatar);

      setStudentTest(found.children);
    }
  }, [item, data, id]);

  const beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return false;
  };

  const handleChange = info => {
    // Get this url from response in real world.

    const reader = new FileReader();
    reader.addEventListener('load', e => {
      if (e && e.target) setImgVal(e.target.result);
    });
    reader.readAsDataURL(info.file);

    setAvatar(info.file);
  };

  return (
    <Card title={id ? 'Update parent' : 'Create New Parent'}>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Col offset={3} md={10}>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="First name" style={{ marginBottom: 12 }}>
                  {getFieldDecorator('firstname', {
                    initialValue: first_name,
                    rules: [
                      {
                        required: true,
                        message: 'First name is required',
                      },
                    ],
                  })(<Input onChange={e => setFirstName(e.target.value)} />)}
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Last name">
                  {getFieldDecorator('lastname', {
                    initialValue: last_name,
                    rules: [
                      {
                        required: true,
                        message: 'Last name is required',
                      },
                    ],
                  })(<Input onChange={e => setLastName(e.target.value)} />)}
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Birthday">
                  {getFieldDecorator('birthday', {
                    initialValue: birthday,
                    rules: [
                      {
                        required: true,
                        message: 'Birthday is required',
                      },
                    ],
                  })(<DatePicker onChange={val => setBirthday(val)} />)}
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Phone number">
                  {getFieldDecorator('phone_number', {
                    initialValue: phone_number,
                    rules: [
                      {
                        required: true,
                        message: 'Phone number is required',
                      },
                    ],
                  })(<Input onChange={e => setPhoneNumber(e.target.value)} />)}
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="ID/Passport number">
                  <Input
                    value={id_number}
                    onChange={e => setIdPassport(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            {!item ? (
              <div>
                <Divider orientation="left" style={{ marginBottom: 0 }}>
                  Account information
                </Divider>
                <Row gutter={16}>
                  <Col md={12}>
                    <Item label="Username">
                      {getFieldDecorator('username', {
                        initialValue: username,
                        rules: [
                          {
                            required: true,
                            message: 'Username is required',
                          },
                        ],
                      })(<Input onChange={e => setUsername(e.target.value)} />)}
                    </Item>
                  </Col>
                  <Col md={12}>
                    <Item label="Password">
                      {getFieldDecorator('password', {
                        initialValue: password,
                        rules: [
                          {
                            required: true,
                            message: 'Password is required',
                          },
                        ],
                      })(
                        <Input
                          type="password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      )}
                    </Item>
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Divider orientation="left" style={{ marginBottom: 0 }}>
                  Account information
                </Divider>
                <Row gutter={16} display="flex" justify="center">
                  <Col md={12}>
                    <Item label="Username">
                      {getFieldDecorator('username', {
                        initialValue: item.username,
                        rules: [
                          {
                            required: true,
                            message: 'Username is required',
                          },
                        ],
                      })(<Input readOnly={true} />)}
                    </Item>
                  </Col>
                  <Col md={12}>
                    <Button>Update Password</Button>
                  </Col>
                </Row>
              </div>
            )}
            {/* <Divider orientation="left" style={{ marginBottom: 0 }}>
              Address
            </Divider>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Address">
                  <Input
                    value={homeNumber}
                    onChange={e => setHomeNumber(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Ward">
                  <Input
                    value={homeWard}
                    onChange={e => setHomeWard(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="District">
                  <Input
                    value={homeDistrict}
                    onChange={e => setHomeDistrict(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Province">
                  <Input
                    value={homeProvince}
                    onChange={e => setHomeProvince(e.target.value)}
                  />
                </Item>
              </Col>
            </Row> */}
            <Divider orientation="left">Children</Divider>
            <Table
              columns={[
                { title: 'Name', dataIndex: 'alternative_name' },
                { title: 'Class', dataIndex: 'classroom' },
                { title: 'Street', dataIndex: 'street' },
              ]}
              dataSource={studentTest}
            />
          </Col>
          <Col md={6} style={{ paddingLeft: 24 }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imgVal ? (
                <img src={imgVal} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  <Icon type={'plus'} />
                  <div className="ant-upload-text">Avatar</div>
                </div>
              )}
            </Upload>
          </Col>
        </Row>
        <Col
          span={24}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={handleSubmitCheck}
            style={{ marginRight: 24 }}
          >
            Save
          </Button>
          <Button onClick={() => window.history.back()}>Cancel</Button>
        </Col>
      </Form>
    </Card>
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

const WrappedNormalParentForm = Form.create({ name: 'parent' })(ParentForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalParentForm);
