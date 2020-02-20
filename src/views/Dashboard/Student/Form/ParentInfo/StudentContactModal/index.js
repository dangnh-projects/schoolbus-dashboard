import React from 'react';
import { Modal, Row, Col, Form, Input } from 'antd';
import { actionCreator } from 'store/student/student.meta';
import { useDispatch } from 'react-redux';

const Item = Form.Item;

const StudentContact = ({ isVisible, setVisible, value, setValue, form }) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;

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
      name: value.fullname,
      relationship: value.relationship,
      phone: value.contactNumber,
      parent: 121,
    };

    dispatch(
      actionCreator.postContact({
        data: fields,
      })
    );
    setVisible(false);
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onOk={handleSubmitCheck}
    >
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Full name">
            {getFieldDecorator('fullname', {
              initialValue: value.fullname,
              rules: [
                {
                  required: true,
                  message: 'Full name is required',
                },
              ],
            })(<Input onChange={e => setValue.setFullname(e.target.value)} />)}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Relationship">
            {getFieldDecorator('relationship', {
              initialValue: value.relationship,
              rules: [
                {
                  required: true,
                  message: 'Relationship is required',
                },
              ],
            })(
              <Input onChange={e => setValue.setRelationship(e.target.value)} />
            )}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={24}>
          <Item label="Contact number">
            {getFieldDecorator('contactnumber', {
              initialValue: value.contactNumber,
              rules: [
                {
                  required: true,
                  message: 'Contact number is required',
                },
              ],
            })(
              <Input
                onChange={e => setValue.setContactNumber(e.target.value)}
              />
            )}
          </Item>
        </Col>
      </Row>
    </Modal>
  );
};

const WrappedStudentContact = Form.create({ name: 'student_contact' })(
  StudentContact
);

export default WrappedStudentContact;
