import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Input } from 'antd';
import { actionCreator } from 'store/student/student.meta';
import { connect } from 'react-redux';

const Item = Form.Item;

const StudentContact = ({
  isVisible,
  setVisible,
  studentid,
  parentid,
  contactId,
  setContactId,
  data,
  form,
  putContact,
  postContact,
  getContact,
}) => {
  const { getFieldDecorator } = form;
  const [item, setItem] = useState(null);
  const [relationship, setRelationship] = useState('');
  const [fullname, setFullname] = useState('');
  const [contactNumber, setContactNumber] = useState('');

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
      name: fullname,
      relationship: relationship,
      phone: contactNumber,
      parent: parentid,
    };
    if (contactId) {
      putContact({
        data: fields,
        id: contactId,
        afterUpdate: () =>
          getContact({
            id: studentid,
          }),
      });
    } else {
      postContact({
        data: fields,
        afterSave: () =>
          getContact({
            id: studentid,
          }),
      });
    }
    closedModal();
  };

  const closedModal = () => {
    setVisible(false);
    setContactId(null);
  };

  useEffect(() => {
    if (contactId) {
      console.log(data);
      const found = data.find(item => item.id === contactId);
      setItem(found);
      setFullname(found.name);
      setRelationship(found.relationship);
      setContactNumber(found.phone);
    } else {
      setItem(null);
      setFullname('');
      setRelationship('');
      setContactNumber('');
    }
  }, [item, data, contactId]);

  return (
    <Modal visible={isVisible} onCancel={closedModal} onOk={handleSubmitCheck}>
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Full name">
            {getFieldDecorator('fullname', {
              initialValue: fullname,
              rules: [
                {
                  required: true,
                  message: 'Full name is required',
                },
              ],
            })(<Input onChange={e => setFullname(e.target.value)} />)}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Relationship">
            {getFieldDecorator('relationship', {
              initialValue: relationship,
              rules: [
                {
                  required: true,
                  message: 'Relationship is required',
                },
              ],
            })(<Input onChange={e => setRelationship(e.target.value)} />)}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Contact number">
            {getFieldDecorator('contactnumber', {
              initialValue: contactNumber,
              rules: [
                {
                  required: true,
                  message: 'Contact number is required',
                },
              ],
            })(<Input onChange={e => setContactNumber(e.target.value)} />)}
          </Item>
        </Col>
      </Row>
    </Modal>
  );
};

const WrappedStudentContact = Form.create({ name: 'student_contact' })(
  StudentContact
);

const mapDispatchToProps = {
  putContact: actionCreator.putContact,
  postContact: actionCreator.postContact,
  getContact: actionCreator.getContact,
};

const mapStateToProps = state => state.student;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedStudentContact);
