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

// const useFetch = url => {
//   const [data, setData] = useState(null);

//   useEffect(async () => {
//     const response = await fetch(url);
//     const data = await response.json();
//     const [item] = data.result;

//     setData(item);
//   }, []);
//   return data;
// };

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
      getMetaData('/core/api/settings/notification', access),
    ]);

    setMissBusEN(notification.data[1].en);
    setMissBusVN(notification.data[1].vn);
    setAbsentEN(notification.data[2].en);
    setAbsentVN(notification.data[2].vn);
    setOnboardedSchoolEN(notification.data[3].en);
    setOnboardedSchoolVN(notification.data[3].vn);
    setOnboardedHomeEN(notification.data[4].en);
    setOnboardedHomeVN(notification.data[4].vn);
    setReachedSchoolEN(notification.data[5].en);
    setReachedSchoolVN(notification.data[5].vn);
    setReachedHomeEN(notification.data[6].en);
    setReachedHomeVN(notification.data[6].vn);
  };

  useEffect(() => {
    getMeta();
  }, []);

  const changeStateModal = () => {
    setVisible(true);
  };

  const ModalInf = () => {
    const [newNotificationEN, setNewNotificationEN] = useState('');
    const [newNotificationVN, setNewNotificationVN] = useState('');

    const setTextNotification = () => {
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
                    defaultValue={setOnboardedHomeEN}
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
        case 5:
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
        //onOk={this.handleOk}
        //confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {setTextNotification()}
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
              onClick={() => {
                setNoNotification(3);
                changeStateModal();
              }}
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
              onClick={() => {
                setNoNotification(5);
                changeStateModal();
              }}
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
              onClick={() => {
                setNoNotification(4);
                changeStateModal();
              }}
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
              onClick={() => {
                setNoNotification(6);
                changeStateModal();
              }}
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
              onClick={() => {
                setNoNotification(1);
                changeStateModal();
              }}
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
              onClick={() => {
                setNoNotification(2);
                changeStateModal();
              }}
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
          <ModalInf setVisible={setVisible} visible={isVisible} />
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
