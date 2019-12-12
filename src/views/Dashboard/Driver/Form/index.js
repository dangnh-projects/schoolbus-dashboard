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
  InputNumber,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { dataURLtoBlob, InitDefaultFile } from 'utils/file';
import { bool } from 'prop-types';

const Item = Form.Item;

const DriverForm = ({ formSave, updateItem, id, data, form }) => {
  const { getFieldDecorator } = form;

  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState();
  const [id_number, setIdNumber] = useState();
  const [phone, setPhone] = useState();
  const [start_working_date, setStartDate] = useState();
  const [address, setAdress] = useState();
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
      name,
      id_number,
      birthday,
      phone,
      start_working_date,
      address,
    };
    if (avatar) {
      fields.image = avatar;
    }

    fields.birthday = fields.birthday.format('YYYY-MM-DD');
    fields.start_working_date = fields.start_working_date.format('YYYY-MM-DD');
    if (id) {
      fields.id = id;
      updateItem({
        url: '/core/api/driver/',
        data: fields,
        afterSave: () => navigate('/dashboard/driver'),
      });
    } else {
      formSave({
        url: '/core/api/driver',
        data: fields,
        afterSave: () => navigate('/dashboard/driver'),
      });
    }
  };
  id = parseInt(id);

  useEffect(() => {
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
      setName(found.name);
      setIdNumber(found.id_number);
      setBirthday(moment(found.birthday));
      setPhone(found.phone);
      setStartDate(moment(found.start_working_date));
      setAdress(found.address);
      if (found.image) {
        setImgVal(process.env.REACT_APP_BACKEND_URL + found.image);
      }
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
      if (e && e.target) setImgVal(e.target.result);
    });
    reader.readAsDataURL(info.file);

    setAvatar(info.file);
  };

  const disabledBirthDay = birthday => {
    const minValueDate = moment('1900-01-01', 'YYYY-MM-YY');
    const currentValueDate = moment();

    return (
      birthday.isAfter(currentValueDate) || birthday.isBefore(minValueDate)
    );
  };

  return (
    <Card title={id ? 'Update Driver' : 'Create New Driver'}>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Col offset={3} md={10}>
            <Divider
              orientation="left"
              style={{ marginBottom: 0, marginTop: 0 }}
            >
              Basic information
            </Divider>
            <Row gutter={16}>
              <Col md={24}>
                <Item label="Name" style={{ marginBottom: 12 }}>
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [
                      {
                        required: true,
                        message: 'Name is required',
                      },
                    ],
                  })(<Input onChange={e => setName(e.target.value)} />)}
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col md={12}>
                <Item label="ID number">
                  {getFieldDecorator('id_number', {
                    initialValue: id_number,
                    rules: [
                      {
                        required: true,
                        message: 'ID number is required',
                      },
                      {
                        pattern: new RegExp('^(\\d{9}|\\d{12})$'),
                        message: 'ID number is required to 9-digit or 12-digit',
                      },
                    ],
                  })(<Input onChange={e => setIdNumber(e.target.value)} />)}
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Phone">
                  {getFieldDecorator('phone', {
                    initialValue: phone,
                    rules: [
                      {
                        required: true,
                        message: 'Phone is required',
                      },
                    ],
                  })(<Input onChange={e => setPhone(e.target.value)} />)}
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
                  {getFieldDecorator('start_working_date', {
                    initialValue: start_working_date,
                    rules: [
                      {
                        required: true,
                        message: 'Start working date is required',
                      },
                    ],
                  })(<DatePicker onChange={val => setStartDate(val)} />)}
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={24}>
                <Item label="Address">
                  <Input
                    value={address}
                    onChange={e => setAdress(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          </Col>
          <Col md={6} style={{ paddingLeft: 24, marginTop: 24 }}>
            <Upload
              // defaultFileList={[
              //   {
              //     uid: 'uid-' + new Date().getTime(),
              //     originFileObj: new File([''], '/images/default-user.png'),
              //   },
              // ]}
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

const WrappedNormalDriverForm = Form.create({ name: 'driver' })(DriverForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalDriverForm);
