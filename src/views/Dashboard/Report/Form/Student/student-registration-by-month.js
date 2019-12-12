import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
//import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
//import { API } from 'api/metaData';

const { Option } = Select;

const GetFields = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <div>
      <Col span={6}>
        <Form.Item label="Area">
          {getFieldDecorator('area', {
            initialValue: 'south',
            rules: [
              {
                required: true,
                message: 'Select area is required!',
              },
            ],
          })(
            <Select style={{ width: 120 }}>
              <Option value="north">North</Option>
              <Option value="central">Central</Option>
              <Option value="south">South</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="School">
          <Select style={{ width: 120 }}>
            <Option value="uka-bt">UKA - Bình Thạnh</Option>
            <Option value="uka-hl">UKA - Him Lam</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Year">
          {getFieldDecorator('year', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Year is required!',
              },
            ],
          })(<Input style={{ width: 120 }} />)}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Month">
          <Input style={{ width: 120 }} />
        </Form.Item>
      </Col>
    </div>
  );
};

const TableView = () => {
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Area',
      dataIndex: 'area',
    },
    {
      title: 'School name',
      dataIndex: 'schoolname',
    },
    {
      title: 'Class',
      dataIndex: 'class',
    },
    {
      title: 'Number of Student',
      dataIndex: 'numberofstudent',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  return <Table columns={columns} />;
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

const WrappedReportForm = Form.create({ name: 'report_form' })(GetFields);

export default {
  GetFields: connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedReportForm),
  TableView: connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableView),
};
