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
  Modal,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import AvatarCropperModal from 'components/AvatarDropModal';
import { BASE_URL } from 'api';

import { dataURLtoBlob, InitDefaultFile } from 'utils/file';

const Item = Form.Item;

const ChangePasswordModal = props => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submitNewPassword = e => {
    e.preventDefault && e.preventDefault();
    if (!newPassword || !confirmPassword) {
      notification.error({
        message: 'Please input new password and confirm password',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'New password and confirm password does not match',
      });
      return;
    }

    props.fields.birthday = props.fields.birthday.format('YYYY-MM-DD');
    props.fields.start_working_date = props.fields.start_working_date.format(
      'YYYY-MM-DD'
    );

    const data = { id: props.id, ...props.fields, password: newPassword };

    props.updateItem({
      url: '/core/api/supervisor/',
      data,
      afterSave: () => {
        notification.success({
          message: 'Save new password successful',
        });

        props.setVisible(false);
      },
    });
  };

  return (
    <Modal
      visible={props.visible}
      onOk={submitNewPassword}
      onCancel={() => props.setVisible(false)}
    >
      <Form>
        <Item label="New password">
          <Input
            type="password"
            onChange={e => setNewPassword(e.target.value)}
          />
        </Item>
        <Item label="Confirm new password">
          <Input
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Item>
      </Form>
    </Modal>
  );
};

const BusSupervisorForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [item, setItem] = useState(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [start_working_date, setStartWorkingDate] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const [home_number, setHomeNumber] = useState();
  const [street, setStreet] = useState();
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState('/images/default-user.png');
  const [tempImg, setTempImg] = useState(null);

  const [showCropModal, setShowCropModal] = useState(false);

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
      ward,
      district,
      province,
      username,
      password,
      email,
    };
    if (avatar) {
      fields.avatar = avatar;
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
      setImgVal(BASE_URL + found.avatar);
      setUsername(found.user_name);
      setEmail(found.email);
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
    const reader = new FileReader();
    reader.addEventListener('load', e => {
      if (e && e.target) {
        setTempImg(e.target.result);
        setShowCropModal(true);
      }
    });
    reader.readAsDataURL(info.file);

    setAvatar(info.file);
  };

  const disabledBirthDay = birthday => {
    const minValueDate = moment('1900-01-01', 'YYYY-MM-DD');
    const currentValueDate = moment();

    return (
      birthday.isAfter(currentValueDate) || birthday.isBefore(minValueDate)
    );
  };

  return (
    <Card title={id ? 'Update Bus Supervisor' : 'Create New Bus Supervisor'}>
      {showCropModal && (
        <AvatarCropperModal
          visible={showCropModal}
          imgVal={tempImg}
          setAvatar={setAvatar}
          setImgVal={setImgVal}
          setVisible={setShowCropModal}
        />
      )}
      <ChangePasswordModal
        visible={showChangePassword}
        setVisible={setShowChangePassword}
        id={id}
        updateItem={updateItem}
        const
        fields={{
          first_name,
          last_name,
          birthday,
          phone_number,
          start_working_date,
          home_number,
          ward,
          district,
          province,
          username,
          password,
        }}
      />
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
                  {getFieldDecorator('birthday', {
                    initialValue: birthday,
                    rules: [
                      {
                        required: true,
                        message: 'Birthday is required',
                      },
                    ],
                  })(
                    <DatePicker
                      disabledDate={disabledBirthDay}
                      onChange={val => setBirthday(val)}
                    />
                  )}
                </Item>
              </Col>
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
            <Row gutter={16}>
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
              <Col md={12}>
                <Item label="Email">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    rules: [
                      // {
                      //   required: true,
                      //   message: 'Phone number is required',
                      // },
                    ],
                  })(<Input onChange={e => setEmail(e.target.value)} />)}
                </Item>
              </Col>
            </Row>

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
                    })(
                      <Input
                        onChange={e => setUsername(e.target.value)}
                        readOnly={!!item}
                      />
                    )}
                  </Item>
                </Col>
                {!item && (
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
                )}
                {item && (
                  <Col xs={24}>
                    <Button onClick={() => setShowChangePassword(true)}>
                      Change Password
                    </Button>
                  </Col>
                )}
              </Row>
            </div>

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
              accept="image/*"
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
