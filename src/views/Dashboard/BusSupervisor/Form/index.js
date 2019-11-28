import React, { useState, useEffect } from 'react';
import {
  Card,
  notification,
  Form,
  Col,
  Row,
  Input,
  Divider,
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

import { dataURLtoBlob, InitDefaultFile } from 'utils/file';

const Item = Form.Item;

const BusSupervisorForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;

  const [item, setItem] = useState(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [start_working_date, setStartWorkingDate] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [home_number, setHomeNumber] = useState();
  const [street, setStreet] = useState();
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState('/images/default-user.png');

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
      start_working_date,
      home_number,
      //street: homeStreet,
      ward,
      district,
      province,
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
    fields.start_working_date = fields.start_working_date.format('YYYY-MM-DD');
    if (id) {
      fields.id = id;
      updateItem({
        url: '/core/api/supervisor/',
        data: fields,
        afterSave: () => navigate('/dashboard/bus-supervisor'),
      });
    } else {
      formSave({
        url: '/core/api/supervisor',
        data: fields,
        afterSave: () => navigate('/dashboard/bus-supervisor'),
      });
    }
  };

  id = parseInt(id);

  useEffect(() => {
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
      setFirstName(found.first_name);
      setLastName(found.last_name);
      setBirthday(moment(found.birthday));
      setFirstName(found.first_name);
      setPhoneNumber(found.phone_number);
      setStartWorkingDate(moment(found.start_working_date));
      setHomeNumber(found.home_number);
      //setHomeNumber(found.home_street);
      setWard(found.ward);
      setDistrict(found.district);
      setProvince(found.province);
      setImgVal(process.env.REACT_APP_BACKEND_URL + found.avatar);
    } else {
      InitDefaultFile(e => {
        setAvatar(dataURLtoBlob(e.target.result));
      });
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
    <Card title={id ? 'Update Bus Supervisor' : 'Create New Bus Supervisor'}>
      <Form
        onSubmit={handleSubmitCheck}
        style={{ padding: 16 }}
        layout="horizontal"
      >
        <Row gutter={16}>
          <Col offset={3} md={10}>
            <Divider
              orientation="left"
              style={{ marginBottom: 0, marginTop: 0 }}
            >
              Basic information
            </Divider>
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
                  {getFieldDecorator('email', {
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
                <Item label="Start working date">
                  {getFieldDecorator('startworkingdate', {
                    initialValue: start_working_date,
                    rules: [
                      {
                        required: true,
                        message: 'Start working date is required',
                      },
                    ],
                  })(<DatePicker onChange={val => setStartWorkingDate(val)} />)}
                </Item>
              </Col>
            </Row>
            {!item && (
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
            )}

            <Divider orientation="left" style={{ marginBottom: 0 }}>
              Address
            </Divider>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Home number">
                  <Input
                    value={home_number}
                    onChange={e => setHomeNumber(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Street">
                  <Input
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Ward">
                  <Input value={ward} onChange={e => setWard(e.target.value)} />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="District">
                  <Input
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Province">
                  <Input
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          </Col>
          <Col md={6} style={{ paddingLeft: 24, marginTop: 24 }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
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

const WrappedNormalLoginForm = Form.create({ name: 'bus_supervisor' })(
  BusSupervisorForm
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
