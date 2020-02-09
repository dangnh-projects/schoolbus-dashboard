import React from 'react';
import { Modal, Row, Col, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from 'store/notification/notification.meta';

const Item = Form.Item;
const { TextArea } = Input;

const ModalInf = props => {
  const dataparams = [
    {
      EN: [
        props.dataNotification.missBusEN,
        props.dataNotification.absentEN,
        props.dataNotification.onboardedSchoolEN,
        props.dataNotification.onboardedHomeEN,
        props.dataNotification.reachedSchoolEN,
        props.dataNotification.reachedHomeEN,
      ],
      VN: [
        props.dataNotification.missBusVN,
        props.dataNotification.absentVN,
        props.dataNotification.onboardedSchoolVN,
        props.dataNotification.onboardedHomeVN,
        props.dataNotification.reachedSchoolVN,
        props.dataNotification.reachedHomeVN,
      ],
      setEN: [
        props.setDataNotification.setMissBusEN,
        props.setDataNotification.setAbsentEN,
        props.setDataNotification.setOnboardedSchoolEN,
        props.setDataNotification.setOnboardedHomeEN,
        props.setDataNotification.setReachedSchoolEN,
        props.setDataNotification.setReachedHomeEN,
      ],
      setVN: [
        props.setDataNotification.setMissBusVN,
        props.setDataNotification.setAbsentVN,
        props.setDataNotification.setOnboardedSchoolVN,
        props.setDataNotification.setOnboardedHomeVN,
        props.setDataNotification.setReachedSchoolVN,
        props.setDataNotification.setReachedHomeVN,
      ],
    },
  ];

  const editTextModalParams = (EN, VN, setEN, setVN) => {
    return (
      <Row gutter={16}>
        <Col md={12}>
          <Item label="EN">
            <TextArea defaultValue={EN} onChange={e => setEN(e.target.value)} />
          </Item>
        </Col>
        <Col md={12}>
          <Item label="VN">
            <TextArea defaultValue={VN} onChange={e => setVN(e.target.value)} />
          </Item>
        </Col>
      </Row>
    );
  };

  const setTextNotification = () => {
    const setNotification = dataparams[0];
    let i = 0;
    for (i = 0; i < setNotification.EN.length; i++) {
      const noModal = i + 1;
      if (props.numberNotification != 0 && props.numberNotification == noModal)
        return editTextModalParams(
          setNotification.EN[i],
          setNotification.VN[i],
          setNotification.setEN[i],
          setNotification.setVN[i]
        );
    }
    return;
  };

  const params = {
    '1': {
      en_text: props.dataNotification.missBusEN,
      vn_text: props.dataNotification.missBusVN,
    },
    '2': {
      en_text: props.dataNotification.absentEN,
      vn_text: props.dataNotification.absentVN,
    },
    '3': {
      en_text: props.dataNotification.onboardedSchoolEN,
      vn_text: props.dataNotification.onboardedSchoolVN,
    },
    '4': {
      en_text: props.dataNotification.onboardedHomeEN,
      vn_text: props.dataNotification.onboardedHomeVN,
    },
    '5': {
      en_text: props.dataNotification.reachedSchoolEN,
      vn_text: props.dataNotification.reachedSchoolVN,
    },
    '6': {
      en_text: props.dataNotification.reachedHomeEN,
      vn_text: props.dataNotification.reachedHomeVN,
    },
  };

  const handleCancel = () => {
    props.setNumberNotification(0);
    props.setVisible(false);
    props.resetData();
  };

  const handleSubmit = () => {
    props.editListNotification({
      url: '/core/api/settings/notification-template',
      params: params,
    });

    props.setNumberNotification(0);
    props.setVisible(false);
  };

  return (
    <Modal visible={props.visible} onOk={handleSubmit} onCancel={handleCancel}>
      {setTextNotification()}
    </Modal>
  );
};

const mapStateToProps = state => state.notification;
const mapDispatchToProps = {
  editListNotification: actionCreator.editListNotification,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalInf);
