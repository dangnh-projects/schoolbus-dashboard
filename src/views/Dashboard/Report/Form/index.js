import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { API } from 'api/metaData';

const ReportForm = ({ id, form }) => {
  const { getFieldDecorator } = form;
  const [expand, setExpand] = useState(false);

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const handleSearch = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const toggle = () => {
    setExpand(!expand);
  };

  id = parseInt(id);

  return (
    <div>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
              Collapse <Icon type={expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          textAlign: 'right',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Button type="dashed">Download</Button>
      </div>

      <Form className="ant-advanced-search-form">
        <div>Show Report</div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

const WrappedReportForm = Form.create({ name: 'report_form' })(ReportForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedReportForm);
