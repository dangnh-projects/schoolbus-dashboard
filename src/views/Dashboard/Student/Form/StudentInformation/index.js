import React, { useState, memo, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'store/student/student.meta';

import moment from 'moment';
//import { navigate } from '@reach/router'

const Item = Form.Item;

const Information = props => {
  const dispatch = useDispatch();
  const { student } = useSelector(store => store.student);

  const [name, setName] = useState('');
  const [altName, setAltName] = useState('');
  const [dob, setDob] = useState(moment());
  const [school] = useState('');
  const [classroom, setClassRoom] = useState('');
  const [imgVal, setImgVal] = useState('');
  const [avatar, setAvatar] = useState('');
  const [homeNumber, setHomeNumber] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  // const [busRegistratedDate, setBusRegistratedDAta] = useState('moment');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      // first_name: firstName,
      // last_name: lastName,
      name,
      alternative_name: altName,
      dob: dob.format('YYYY-MM-DD'),
      school,
      classroom,
      image: avatar,
      home_number: homeNumber,
      street,
      district,
      ward,
      province,
    };

    if (student) {
      data.id = student.id;
      dispatch(
        actionCreator.updateStudent({
          data,
          afterSuccess: () => dispatch(actionCreator.changeStage(1)),
        })
      );
    } else {
      dispatch(actionCreator.postStudent(data));
    }
  };

  useEffect(() => {
    if (student) {
      setName(student.name);
      setAltName(student.alternative_name);
      setDob(moment(student.dob, 'YYYY-MM-DD'));
      setClassRoom(student.classroom);
      setHomeNumber(student.home_number);
      setStreet(student.street);
      setDistrict(student.district);
      setWard(student.ward);
      setProvince(student.province);
    } else {
      setName('');
      setAltName('');
      setDob(moment());
      setClassRoom('');
      setHomeNumber('');
      setStreet('');
      setDistrict('');
      setWard('');
      setProvince('');
    }
  }, [student]);

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
    <Row>
      <Col md={18}>
        <Row gutter={16}>
          <Col md={12}>
            <Item
              required={true}
              label="Full name"
              style={{ marginBottom: 12 }}
            >
              <Input value={name} onChange={e => setName(e.target.value)} />
            </Item>
          </Col>
          <Col md={12}>
            <Item label="Alternative name">
              <Input
                value={altName}
                onChange={e => setAltName(e.target.value)}
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={8}>
            <Item label="Birthday">
              <DatePicker value={dob} onChange={val => setDob(val)} />
            </Item>
          </Col>
          {/* <Col md={8}>
            <Item label="School">
              <Input />
            </Item>
          </Col> */}
          <Col md={8}>
            <Item label="Class">
              <Input
                value={classroom}
                onChange={e => setClassRoom(e.target.value)}
              />
            </Item>
          </Col>
        </Row>
        <Divider orientation="left">Address</Divider>
        <Row gutter={16}>
          <Col md={8}>
            <Item label="Home number">
              <Input
                value={homeNumber}
                onChange={e => setHomeNumber(e.target.value)}
              />
            </Item>
          </Col>
          <Col md={16}>
            <Item label="Street">
              <Input value={street} onChange={e => setStreet(e.target.value)} />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={8}>
            <Item label="Ward">
              <Input value={ward} onChange={e => setWard(e.target.value)} />
            </Item>
          </Col>
          <Col md={8}>
            <Item label="District">
              <Input
                value={district}
                onChange={e => setDistrict(e.target.value)}
              />
            </Item>
          </Col>
          <Col md={8}>
            <Item label="Province">
              <Input
                value={province}
                onChange={e => setProvince(e.target.value)}
              />
            </Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
          {student && (
            <Button
              onClick={() => dispatch(actionCreator.changeStage(1))}
              style={{ marginLeft: 12 }}
            >
              Next
            </Button>
          )}
        </Row>
      </Col>
      <Col md={6}>
        <Row type="flex" justify="center">
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
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Information);
