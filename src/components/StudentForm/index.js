import React from 'react'
import { Divider } from 'antd'
import {
  Button,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  TimePicker,
  Checkbox,
  Avatar,
} from 'antd'

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const imgColStyle = {
  textAlign: 'center',
  marginTop: '80px',
}

const imgStyle = {
  height: '200px',
  width: '200px',
}

const btnStyle = {
  width: '100px',
}

const FieldBuilder = ({ type, options }) => {
  switch (type) {
    case 'TEXT':
      return <Input />;

    case 'TEXTAREA':
      return <Input.TextArea />;

    case 'SELECT':
      return (
        <Select>
          {options.map(({ value, title }) => (
            <Option key={value} value={value}>
              {title}
            </Option>
          ))}
        </Select>
      );

    case 'DATE_PICKER':
      return <DatePicker />;

    case 'RANGE_PICKER':
      return <RangePicker />;

    case 'TIME_PICKER':
      return <TimePicker format="h:mm a" minuteStep={15} />;

    case 'INPUT_NUMBER':
      return <InputNumber />;

    case 'CHECKBOX':
      return <Checkbox />;

    default:
      return 'Cannot find this type';
  }
};

const BaseFormStudent = props => {
  const { getFieldDecorator } = props.form;
  const { group_field } = props;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      props.handleSubmit && props.handleSubmit(fieldsValue);
    });
  };
  return (
    <Form
      {...(props.formItemLayout || formItemLayout)}
      onSubmit={handleSubmit}
      style={{ padding: 10, width: '100%'}}
      colon={false}
    >
      <Col span={6} style={imgColStyle}>
        <Avatar shape="square" size={200} src='https://www.biography.com/.image/t_share/MTE5NDg0MDU0OTM2NTg1NzQz/tom-cruise-9262645-1-402.jpg' />
      </Col>
      
      <Col span={18}>
        <Col
          span={24}
          style={{ marginBottom: '40px'}}
        >
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" style={btnStyle}>
              Save
            </Button>
            <Button
              onClick={() =>
                props.onCancel ? props.onCancel() : window.history.back()
              }
              style={btnStyle}
            >
              Cancel
            </Button>
          </div>
        </Col>
        
        {
          group_field.map((group_field, index) => (
            <div key={index}>
              {
                group_field.student_inf.map((field, index) => (
                  <div key={index}>
                    <Col span={12} key={field.name}>
                      <Form.Item label={field.label}>
                        {
                          getFieldDecorator(field.name, {
                            initialValue: field.defaultValue,
                            rules: field.rules || [],
                            valuePropName: field.type === 'CHECKBOX' ? 'checked' : 'value',
                          })(FieldBuilder(field))
                        }
                      </Form.Item>
                    </Col>
                    {console.log(field.name)}
                  </div>
                ))
              }
              <Divider orientation="left">Address</Divider>
              {
                group_field.address_inf.map((field, index) => (
                  <div key={index}>
                    <Col span={12} key={field.name}>
                      <Form.Item label={field.label}>
                        {
                          getFieldDecorator(field.name, {
                            initialValue: field.defaultValue,
                            rules: field.rules || [],
                            valuePropName: field.type === 'CHECKBOX' ? 'checked' : 'value',
                          })(FieldBuilder(field))
                        }
                      </Form.Item>
                    </Col>
                    {console.log(field.name)}
                  </div>
                ))
              }
              <Divider orientation="left">Status: Active</Divider>
              {
                group_field.status_inf.map((field, index) => (
                  <div key={index}>
                    <Col span={12} key={field.name}>
                      <Form.Item label={field.label}>
                        {
                          getFieldDecorator(field.name, {
                            initialValue: field.defaultValue,
                            rules: field.rules || [],
                            valuePropName: field.type === 'CHECKBOX' ? 'checked' : 'value',
                          })(FieldBuilder(field))
                        }
                      </Form.Item>
                    </Col>
                    {console.log(field.name)}
                  </div>
                ))
              }
              <Divider orientation="left">Parent Contact</Divider>
              {
                group_field.parent_inf.map((field, index) => (
                  <div key={index}>
                    <Col span={12} key={field.name}>
                      <Form.Item label={field.label}>
                        {
                          getFieldDecorator(field.name, {
                            initialValue: field.defaultValue,
                            rules: field.rules || [],
                            valuePropName: field.type === 'CHECKBOX' ? 'checked' : 'value',
                          })(FieldBuilder(field))
                        }
                      </Form.Item>
                    </Col>
                    {console.log(field.name)}
                  </div>
                ))
              }
            </div>
          ))
        }
      </Col>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'form' })(BaseFormStudent);

export default WrappedRegistrationForm;
