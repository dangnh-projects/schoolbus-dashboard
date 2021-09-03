import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
//import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
//import { API } from 'api/metaData';

const { Option } = Select;

const GetFields = ({ form }) => {
  const handleChange = value => {
    //console.log(`selected ${value}`);
  };
  const { getFieldDecorator } = form;
  return (
    <div>
      <Col span={8}>
        <Form.Item label="School">
          {getFieldDecorator('school', {
            initialValue: 'UKA',
            rules: [
              {
                required: true,
                message: 'Select school is required!',
              },
            ],
          })(
            <Select style={{ width: 120 }} onChange={handleChange}>
              <Option value="uka">UKA</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
    </div>
  );
};

const TableView = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
    },
    {
      title: 'School Name',
      dataIndex: 'schoolname',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
    },
    {
      title: 'Age',
      dataIndex: 'age',
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
  TableView: connect(
    mapStateToProps,
    mapDispatchToProps
  )(TableView),
  GetFields: connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedReportForm),
};
