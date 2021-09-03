import React, { useState, useEffect } from 'react';
import { Form, Row, Col, notification, Button } from 'antd';
import { connect } from 'react-redux';
//import { navigate } from '@reach/router';
import { actionCreator } from 'store/dataTable/dataTable.meta';
//import { API } from 'api/metaData';
import StudentRegistration from './Student/student-registration-bus';
import RegistrationByMonth from './Student/student-registration-by-month';
import StudentLateMiss from './Student/student-late-miss';
import SupervisorAge from './Supervisor/supervisor-age';
//import { ok } from 'assert';

const ReportForm = ({ id, form }) => {
  //const [expand, setExpand] = useState(false);

  const handleSearch = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  id = parseInt(id);

  const handleReportOption = value => {
    if (value === 0) {
      {
        switch (id) {
          case 1:
            return <StudentRegistration.GetFields />;
          case 2:
            return <RegistrationByMonth.GetFields />;
          case 3:
            return <StudentLateMiss.GetFields />;
          case 4:
            return <SupervisorAge.GetFields />;
          default:
            notification.error({
              message: 'Report does not exists',
            });
            break;
        }
      }
    } else if (value === 1) {
      switch (id) {
        case 1:
          return <SupervisorAge.TableView />;
        case 2:
          return <RegistrationByMonth.TableView />;
        case 3:
          return <StudentLateMiss.TableView />;
        case 4:
          return <StudentRegistration.TableView />;
        default:
          notification.error({
            message: 'Report does not exists',
          });
          break;
      }
    } else {
      notification.error({
        message: 'Error: Please contact to system admin',
      });
    }
  };

  return (
    <div>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
        <Row gutter={24}>{handleReportOption(0)}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              Clear
            </Button>
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

      <Form className="ant-advanced-search-form">{handleReportOption(1)}</Form>
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
