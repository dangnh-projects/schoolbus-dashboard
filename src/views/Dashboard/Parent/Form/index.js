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
  Modal,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { dataURLtoBlob, InitDefaultFile } from 'utils/file';
import AvatarCropperModal from 'components/AvatarDropModal';
import { BASE_URL } from 'api';

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

    const data = { id: props.id, ...props.fields, password: newPassword };

    props.updateItem({
      url: '/core/api/parent/',
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

const ParentForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;
  const [item, setItem] = useState(null);
  const [student, setStudent] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone_number, setPhoneNumber] = useState('');
  const [id_number, setIdPassport] = useState('');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState('/images/default-user.png');
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImg, setTempImg] = useState(null);

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
      username,
      password,
      email,
    };
    if (avatar) {
      fields.avatar = avatar;
    }

    fields.birthday = fields.birthday.format('YYYY-MM-DD');

    if (id) {
      fields.id = id;
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
      setImgVal(BASE_URL + found.avatar);
      setEmail(found.email);

      setStudent(found.children);
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
    <Card title={id ? 'Update parent' : 'Create New Parent'}>
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
          id_number,
          username,
          email,
        }}
      />
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
                  })(
                    <DatePicker
                      disabledDate={disabledBirthDay}
                      onChange={val => setBirthday(val)}
                    />
                  )}
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
                  {getFieldDecorator('id_number', {
                    initialValue: id_number,
                    rules: [
                      {
                        required: true,
                        message: 'ID number is required',
                      },
                      {
                        pattern: new RegExp('^(\\d{9}|\\d{12})$'),
                        message:
                          'ID/Passport number is required to 9-digit or 12-digit',
                      },
                    ],
                  })(<Input onChange={e => setIdPassport(e.target.value)} />)}
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Email">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    rules: [
                      // {
                      //   required: true,
                      //   message: 'ID number is required',
                      // },
                    ],
                  })(<Input onChange={e => setEmail(e.target.value)} />)}
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
                  <Col md={24}>
                    <Button onClick={() => setShowChangePassword(true)}>
                      Change Password
                    </Button>
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
                {
                  title: 'Name',
                  render: (_, record) =>
                    `${record.name} ${
                      record.alternative_name
                        ? '(' + record.alternative_name + ')'
                        : ''
                    }`,
                },
                { title: 'Class', dataIndex: 'classroom' },
                { title: 'Street', dataIndex: 'street' },
              ]}
              dataSource={student}
            />
          </Col>
          <Col md={6} style={{ paddingLeft: 24 }}>
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

const WrappedNormalParentForm = Form.create({ name: 'parent' })(ParentForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalParentForm);
