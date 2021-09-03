import React from 'react';
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
} from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

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

const BaseForm = props => {
  const { getFieldDecorator } = props.form;
  const { fields } = props;
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
      style={{ padding: 12, width: '100%' }}
      colon={false}
    >
      {fields.map(field => (
        <Form.Item key={field.name} label={field.label}>
          {getFieldDecorator(field.name, {
            initialValue: field.defaultValue,
            rules: field.rules || [],
            valuePropName: field.type === 'CHECKBOX' ? 'checked' : 'value',
          })(FieldBuilder(field))}
        </Form.Item>
      ))}

      <Col
        span={24}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}
      >
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          Save
        </Button>
        <Button
          onClick={() =>
            props.onCancel ? props.onCancel() : window.history.back()
          }
        >
          Cancel
        </Button>
      </Col>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'form' })(BaseForm);

export default WrappedRegistrationForm;
