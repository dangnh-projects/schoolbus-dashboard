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
import { API } from 'api/metaData';

const Item = Form.Item;

const BatchForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState();
  const [startDate, setStartDate] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [homeNumber, setHomeNumber] = useState();
  const [homeWard, setHomeWard] = useState();
  const [homeDistrict, setHomeDistrict] = useState();
  const [homeProvince, setHomeProvince] = useState();
  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState();

  const handleSubmit = () => {
    const fields = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      phone_number: phone,
      start_working_date: startDate,
      home_number: homeNumber,
      ward: homeWard,
      district: homeDistrict,
      province: homeProvince,
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
      setPhone(found.phone_number);
      setStartDate(moment(found.start_working_date));
      setHomeNumber(found.home_number);
      setHomeWard(found.ward);
      setHomeDistrict(found.district);
      setHomeProvince(found.province);
      setImgVal(process.env.REACT_APP_BACKEND_URL + found.avatar);
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
              <Col md={12}>
                <Item label="First name" style={{ marginBottom: 12 }}>
                  <Input
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Last name">
                  <Input
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Birthday">
                  <DatePicker
                    value={birthday}
                    onChange={val => setBirthday(val)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="Phone">
                  <Input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="Start working date">
                  <DatePicker
                    value={startDate}
                    onChange={val => setStartDate(val)}
                  />
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
                      <Input onChange={e => setUsername(e.target.value)} />
                    </Item>
                  </Col>
                  <Col md={12}>
                    <Item label="Password">
                      <Input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                      />
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
            onClick={handleSubmit}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchForm);
