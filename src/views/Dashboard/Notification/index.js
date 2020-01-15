import React, { useState, useEffect } from 'react';
import {
  Card,
  Tabs,
  Icon,
  Divider,
  Input,
  Row,
  Col,
  notification,
  Form,
  Modal,
} from 'antd';
import { connect, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
//import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import axios from 'axios';

const { TabPane } = Tabs;
const { TextArea } = Input;
const Item = Form.Item;

const getMetaData = async (url, token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    notification.error({ message: `Load fail with url: ${url}` });
  }
};

const postMetaData = async (url, token, jsonData) => {
  console.log(jsonData);
  try {
    const response = await axios.post(
      'http://it-staging.nhg.vn/core/api/settings/notification-template',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    notification.error({ message: `Load fail with url: ${url}` });
  }
};

const Notification = () => {
  const [isVisible, setVisible] = useState(false);
  const [noNotifiction, setNoNotification] = useState(0);

  const [missBusEN, setMissBusEN] = useState('');
  const [missBusVN, setMissBusVN] = useState('');
  const [absentEN, setAbsentEN] = useState('');
  const [absentVN, setAbsentVN] = useState('');
  const [onboardedSchoolEN, setOnboardedSchoolEN] = useState('');
  const [onboardedSchoolVN, setOnboardedSchoolVN] = useState('');
  const [onboardedHomeEN, setOnboardedHomeEN] = useState('');
  const [onboardedHomeVN, setOnboardedHomeVN] = useState('');
  const [reachedSchoolEN, setReachedSchoolEN] = useState('');
  const [reachedSchoolVN, setReachedSchoolVN] = useState('');
  const [reachedHomeEN, setReachedHomeEN] = useState('');
  const [reachedHomeVN, setReachedHomeVN] = useState('');

  const { token } = useSelector(store => store.user);

  // const data = useFetch(
  //   'http://it-staging.nhg.vn/core/api/settings/notification'
  // );
  //const dataIndex = () => props.getList({ url: '/core/api/driver' });
  const disabledTextInput = true;
  const { access } = token;

  const handleCancel = () => {
    setVisible(false);
  };

  if (!token) {
    navigate('/login');
  }

  const getMeta = async () => {
    const [notification] = await Promise.all([
      getMetaData('/core/api/settings/notification-template', access),
    ]);

    const {
      1: missBus,
      2: absent,
      3: onboardedSchool,
      4: onboardedHome,
      5: reachedSchool,
      6: reachedHome,
    } = notification.data || {};

    setMissBusEN(missBus.en_text);
    setMissBusVN(missBus.vn_text);
    setAbsentEN(absent.en_text);
    setAbsentVN(absent.vn_text);
    setOnboardedSchoolEN(onboardedSchool.en_text);
    setOnboardedSchoolVN(onboardedSchool.vn_text);
    setOnboardedHomeEN(onboardedHome.en_text);
    setOnboardedHomeVN(onboardedHome.vn_text);
    setReachedSchoolEN(reachedSchool.en_text);
    setReachedSchoolVN(reachedSchool.vn_text);
    setReachedHomeEN(reachedHome.en_text);
    setReachedHomeVN(reachedHome.vn_text);
  };

  useEffect(() => {
    getMeta();
  }, []);

  const changeStateModal = () => {
    setVisible(true);
  };

  const getMetaSubmit = async props => {
    await Promise.all([
      postMetaData('/core/api/settings/notification-template', access, props),
    ]);
  };

  const ModalInf = props => {
    const [newNotificationEN, setNewNotificationEN] = useState('');
    const [newNotificationVN, setNewNotificationVN] = useState('');

    const submitNewNotification = e => {
      //console.log(token);
      e.preventDefault();

      getMetaSubmit(user);

      const user = [
        {
          '1': {
            en_text: '<student-name> has missed the bus',
            vn_text: '<student-name> đã lỡ chuyến xe hôm nay',
          },
          '2': {
            en_text: '<student-name> is absent today',
            vn_text: '<student-name> đã báo vắng mặt hôm nay',
          },
          '3': {
            en_text: '<student-name> onboarded to school',
            vn_text: '<student-name> đã lên xe bus. Khởi hành tới trường',
          },
          '4': {
            en_text: '<student-name> onboarded to home',
            vn_text: '<student-name> đã lên xe. Bắt đầu về nhà',
          },
          '5': {
            en_text: '<student-name> reached school',
            vn_text: '<student-name> đã tới trường',
          },
          '6': {
            en_text: '<student-name> reached home',
            vn_text: '<student-name> đã về tới trạm',
          },
        },
      ];
      // try {
      //   const response = await axios.get(process.env.REACT_APP_BACKEND_URL + url, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   return response.data;
      // } catch (error) {
      //   notification.error({ message: `Load fail with url: ${url}` });
      // }

      // axios
      //   .get('http://it-staging.nhg.vn/core/api/settings/notification', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then(res => {
      //     console.log(res);
      //     console.log(res.data);
      //   });
    };

    const setTextNotification = props => {
      console.log(props);
      //const { getFieldDecorator } = form;
      switch (noNotifiction) {
        case 1:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={missBusEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={missBusVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
        case 2:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={absentEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={absentVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
        case 3:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={onboardedSchoolEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={onboardedSchoolVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
        case 4:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={onboardedHomeEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={onboardedHomeVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
        case 5:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={reachedSchoolEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={reachedSchoolVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
        case 6:
          return (
            <Row gutter={16}>
              <Col md={12}>
                <Item label="EN">
                  <TextArea
                    defaultValue={reachedHomeEN}
                    onChange={e => setNewNotificationEN(e.target.value)}
                  />
                </Item>
              </Col>
              <Col md={12}>
                <Item label="VN">
                  <TextArea
                    defaultValue={reachedHomeVN}
                    onChange={e => setNewNotificationVN(e.target.value)}
                  />
                </Item>
              </Col>
            </Row>
          );
      }
    };
    return (
      <Modal
        title="Update notification"
        visible={isVisible}
        onOk={submitNewNotification}
        //confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {setTextNotification(props)}
      </Modal>
    );
  };

  return (
    <Card title="Notification">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="notification" style={{ color: '#08c' }} />
              Notification content
            </span>
          }
          key="1"
        >
          <Divider orientation="left">
            <Icon type="mail" /> Pick-up messages
          </Divider>
          <h4>
            Student onboard to school{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(3);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={onboardedSchoolEN}
                onChange={e => setOnboardedSchoolEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={onboardedSchoolVN}
                onChange={e => setOnboardedSchoolVN(e.target.value)}
              />
            </Col>
          </Row>
          <h4>
            Student reached school{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(5);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={reachedSchoolEN}
                onChange={e => setReachedSchoolEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={reachedSchoolVN}
                onChange={e => setReachedSchoolVN(e.target.value)}
              />
            </Col>
          </Row>
          <Divider orientation="left">
            <Icon type="mail" /> Drop-off messages
          </Divider>
          <h4>
            Student onboard to home{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(4);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={onboardedHomeEN}
                onChange={e => setOnboardedHomeEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={onboardedHomeVN}
                onChange={e => setOnboardedHomeVN(e.target.value)}
              />
            </Col>
          </Row>
          <h4>
            Student reached home{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(6);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={reachedHomeEN}
                onChange={e => setReachedHomeEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={reachedHomeVN}
                onChange={e => setReachedHomeVN(e.target.value)}
              />
            </Col>
          </Row>
          <Divider orientation="left">
            <Icon type="mail" /> Other messages
          </Divider>
          <h4>
            Student missed the bus{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(1);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={missBusEN}
                onChange={e => setMissBusEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={missBusVN}
                onChange={e => setMissBusVN(e.target.value)}
              />
            </Col>
          </Row>
          <h4>
            Student is reported to absent{' '}
            <Icon
              type="form"
              style={{ color: '#08c' }}
              // onClick={() => {
              //   setNoNotification(2);
              //   changeStateModal();
              // }}
            />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={absentEN}
                onChange={e => setAbsentEN(e.target.value)}
              />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                disabled={disabledTextInput}
                value={absentVN}
                onChange={e => setAbsentVN(e.target.value)}
              />
            </Col>
          </Row>
          <ModalInf
            setVisible={setVisible}
            visible={isVisible}
            fields={{
              missBusEN,
              missBusVN,
              absentEN,
              absentVN,
              onboardedSchoolEN,
              onboardedSchoolVN,
              onboardedHomeEN,
              setOnboardedHomeVN,
              reachedSchoolEN,
              reachedSchoolVN,
              reachedHomeEN,
              reachedHomeVN,
            }}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="setting" style={{ color: '#08c' }} />
              Receiver setting
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
    </Card>
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

const WrappedNotificationForm = Form.create({ name: 'driver' })(Notification);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNotificationForm);
