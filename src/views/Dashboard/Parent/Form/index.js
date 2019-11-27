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

const ParentForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idPassport, setIdPassport] = useState('');
  //const [chilren, setChildren] = useState('');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [avatar, setAvatar] = useState();
  const [imgVal, setImgVal] = useState();

  const handleSubmit = () => {
    const fields = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      phone_number: phoneNumber,
      id_number: idPassport,
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
                <Item label="Phone number">
                  <Input
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Item label="ID/Passport number">
                  <Input
                    value={idPassport}
                    onChange={e => setIdPassport(e.target.value)}
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
                { title: 'Name', key: 'name' },
                { title: 'Class', key: 'class' },
                { title: 'Bus registered date', key: 'busregistereddate' },
              ]}
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
)(ParentForm);
