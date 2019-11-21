import React from 'react';
import { Form, Row, Col, Button, Divider, Table } from 'antd';

const ParentInfo = props => {
  return (
    <div>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Col>
            <Row gutter={16}>
              <Col md={12} style={{ textAlign: 'left' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100px' }}
                >
                  Save
                </Button>
              </Col>
            </Row>

            <Divider orientation="left">Sibling</Divider>
            <Table
              columns={[
                { title: 'Student', key: 'student' },
                { title: 'Class', key: 'class' },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ParentInfo;
