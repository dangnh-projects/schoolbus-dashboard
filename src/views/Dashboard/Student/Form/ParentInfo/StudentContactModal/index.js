import React from 'react';
import { Modal, Row, Col, Select, Form, Input } from 'antd';

const Item = Form.Item;
const Option = Select;

const StudentContact = ({ isVisible, setVisible, value, setValue, form }) => {
  const { getFieldDecorator } = form;

  const handleSubmitCheck = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        //handleSubmit && handleSubmit(fieldsValue);
      }
    });
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onOk={handleSubmitCheck}
    >
      <Row gutter={16}>
        <Col md={12}>
          <Item label="Title">
            {getFieldDecorator('title', {
              initialValue: value.title,
              rules: [
                {
                  required: true,
                  message: 'Title is required',
                },
              ],
            })(
              <Select
                onChange={val => setValue.setTitle(val)}
                style={{ width: '200px' }}
              >
                <Option value="mr">Mr.</Option>
                <Option value="mrs">Mrs.</Option>
                <Option value="ms">Ms.</Option>
                <Option value="miss">Miss.</Option>
              </Select>
            )}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={12}>
          <Item label="First name">
            {getFieldDecorator('firstname', {
              initialValue: value.firstname,
              rules: [
                {
                  required: true,
                  message: 'First name is required',
                },
              ],
            })(
              <Input
                style={{ width: '200px' }}
                onChange={e => setValue.setFirstname(e.target.value)}
              />
            )}
          </Item>
        </Col>
        <Col md={12}>
          <Item label="Last name">
            {getFieldDecorator('lastname', {
              initialValue: value.lastname,
              rules: [
                {
                  required: true,
                  message: 'Last name is required',
                },
              ],
            })(
              <Input
                style={{ width: '200px' }}
                onChange={e => setValue.setLastname(e.target.value)}
              />
            )}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={12}>
          <Item label="Relationship">
            {getFieldDecorator('relationship', {
              initialValue: value.type,
              rules: [
                {
                  required: true,
                  message: 'Relationship is required',
                },
              ],
            })(
              <Select
                onChange={val => setValue.setType(val)}
                style={{ width: '200px' }}
              >
                {/* {familyMember.map(({ value, title }) => (
                    <Option value={value} key={value}>
                      {title}
                    </Option>
                  ))} */}
                <Option value="father">Father</Option>
                <Option value="mother">Mother</Option>
                <Option value="brother">Brother</Option>
                <Option value="sister">Sister</Option>
                <Option value="guardian">Guardian</Option>
                <Option value="grandfather">Grandfather</Option>
                <Option value="grandmother">Grandmother</Option>
                <Option value="uncle">Uncle</Option>
                <Option value="aunt">Aunt</Option>
                <Option value="brother-in-law">Brother in law</Option>
                <Option value="sister-in-law">Sister in law</Option>
                <Option value="cousin">Cousin</Option>
              </Select>
            )}
          </Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={12}>
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
                style={{ width: '200px' }}
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
