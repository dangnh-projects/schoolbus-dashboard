import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Icon, Divider } from 'antd';
import ModalInf from './InformationEditModal';

const { TextArea } = Input;
const Item = Form.Item;

const InformationNotification = props => {
  const [isVisible, setVisible] = useState(false);
  const [numberNotification, setNumberNotification] = useState(0);

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

  const disabledTextInput = true;

  const setDefaultValueModal = value => {
    setNumberNotification(value);
    setVisible(true);
  };

  const getMeta = () => {
    try {
      const {
        1: missBus,
        2: absent,
        3: onboardedSchool,
        4: onboardedHome,
        5: reachedSchool,
        6: reachedHome,
      } = props.data || {};

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
    } catch (e) {}
  };

  useEffect(() => {
    getMeta();
  }, [props.data]);

  return (
    <Item>
      <Divider orientation="left">
        <Icon type="mail" /> Pick-up messages
      </Divider>
      <h4>
        Student onboard to school{' '}
        <Icon
          type="form"
          style={{ color: '#08c' }}
          onClick={() => setDefaultValueModal(3)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '12px' }}>
        <Col md={12}>
          EN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={onboardedSchoolEN}
          />
        </Col>
        <Col md={12}>
          VN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={onboardedSchoolVN}
          />
        </Col>
      </Row>
      <h4>
        Student reached school{' '}
        <Icon
          type="form"
          style={{ color: '#08c' }}
          onClick={() => setDefaultValueModal(5)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col md={12}>
          EN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={reachedSchoolEN}
          />
        </Col>
        <Col md={12}>
          VN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={reachedSchoolVN}
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
          onClick={() => setDefaultValueModal(4)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '12px' }}>
        <Col md={12}>
          EN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={onboardedHomeEN}
          />
        </Col>
        <Col md={12}>
          VN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={onboardedHomeVN}
          />
        </Col>
      </Row>
      <h4>
        Student reached home{' '}
        <Icon
          type="form"
          style={{ color: '#08c' }}
          onClick={() => setDefaultValueModal(6)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col md={12}>
          EN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={reachedHomeEN}
          />
        </Col>
        <Col md={12}>
          VN
          <TextArea
            rows={2}
            disabled={disabledTextInput}
            value={reachedHomeVN}
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
          onClick={() => setDefaultValueModal(1)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '12px' }}>
        <Col md={12}>
          EN
          <TextArea rows={2} disabled={disabledTextInput} value={missBusEN} />
        </Col>
        <Col md={12}>
          VN
          <TextArea rows={2} disabled={disabledTextInput} value={missBusVN} />
        </Col>
      </Row>
      <h4>
        Student is reported to absent{' '}
        <Icon
          type="form"
          style={{ color: '#08c' }}
          onClick={() => setDefaultValueModal(2)}
        />
      </h4>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col md={12}>
          EN
          <TextArea rows={2} disabled={disabledTextInput} value={absentEN} />
        </Col>
        <Col md={12}>
          VN
          <TextArea rows={2} disabled={disabledTextInput} value={absentVN} />
        </Col>
      </Row>
      <ModalInf
        visible={isVisible}
        setVisible={setVisible}
        numberNotification={numberNotification}
        setNumberNotification={setNumberNotification}
        resetData={getMeta}
        dataNotification={{
          missBusEN: missBusEN,
          missBusVN: missBusVN,
          absentEN: absentEN,
          absentVN: absentVN,
          onboardedSchoolEN: onboardedSchoolEN,
          onboardedSchoolVN: onboardedSchoolVN,
          onboardedHomeEN: onboardedHomeEN,
          onboardedHomeVN: onboardedHomeVN,
          reachedSchoolEN: reachedSchoolEN,
          reachedSchoolVN: reachedSchoolVN,
          reachedHomeEN: reachedHomeEN,
          reachedHomeVN: reachedHomeVN,
        }}
        setDataNotification={{
          setMissBusEN: setMissBusEN,
          setMissBusVN: setMissBusVN,
          setAbsentEN: setAbsentEN,
          setAbsentVN: setAbsentVN,
          setOnboardedSchoolEN: setOnboardedSchoolEN,
          setOnboardedSchoolVN: setOnboardedSchoolVN,
          setOnboardedHomeEN: setOnboardedHomeEN,
          setOnboardedHomeVN: setOnboardedHomeVN,
          setReachedSchoolEN: setReachedSchoolEN,
          setReachedSchoolVN: setReachedSchoolVN,
          setReachedHomeEN: setReachedHomeEN,
          setReachedHomeVN: setReachedHomeVN,
        }}
      />
    </Item>
  );
};

export default InformationNotification;
