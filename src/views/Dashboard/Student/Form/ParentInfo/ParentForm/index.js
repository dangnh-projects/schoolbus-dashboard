import React, { useState, useEffect } from 'react';
import {
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
import { connect, useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { actionCreator as studentActionCreator } from 'store/student/student.meta';
import { dataURLtoBlob, InitDefaultFile } from 'utils/file';
//import { API } from 'api/metaData';
import AvatarCropperModal from 'components/AvatarDropModal';

const Item = Form.Item;

const ParentForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  const { student } = useSelector(store => store.student);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idPassport, setIdPassport] = useState('');
  //const [chilren, setChildren] = useState('');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState('/images/default-user.png');
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
      first_name: firstName,
      last_name: lastName,
      birthday,
      phone_number: phoneNumber,
      id_number: idPassport,
      username,
      password,
    };
    if (avatar) {
      fields.avatar = avatar;
    }

    fields.birthday = fields.birthday.format('YYYY-MM-DD');

    dispatch(
      studentActionCreator.postParent({
        student,
        data: fields,
      })
    );

    // formSave({
    //   url: '/core/api/parent',
    //   data: fields,
    //   afterSave: () => {
    //     dispatch(studentActionCreator.changeStage(2));

    //     const data = { id: student.id, parent_id: parent.info };
    //     dispatch(actionCreator.updateStudent({ data }));
    //   },
    // });
  };
  id = parseInt(id);

  useEffect(() => {
    InitDefaultFile(e => {
      setAvatar(dataURLtoBlob(e.target.result));
    });
  }, []);

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
        setImgVal(e.target.result);
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
    <Form style={{ padding: 16 }} layout="horizontal">
      {showCropModal && (
        <AvatarCropperModal
          visible={showCropModal}
          imgVal={imgVal}
          setAvatar={setAvatar}
          setImgVal={setImgVal}
          setVisible={setShowCropModal}
        />
      )}
      <Row gutter={16}>
        <Col>
          <Row gutter={16}>
            <Col md={12}>
              <Item label="First name" style={{ marginBottom: 12 }}>
                {getFieldDecorator('firstname', {
                  initialValue: firstName,
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
                  initialValue: lastName,
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
                  initialValue: phoneNumber,
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
                {getFieldDecorator('idPassport', {
                  initialValue: idPassport,
                  rules: [
                    {
                      required: true,
                      message: 'ID/Passport number is required',
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
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

const WrappedNormalParentForm = Form.create({ name: 'parent_form' })(
  ParentForm
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalParentForm);
