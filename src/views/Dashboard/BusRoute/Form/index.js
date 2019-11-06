import React from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Tabs,
  Table,
  Icon,
  Tag,
} from 'antd';
import MapRoutes from './MapRoutes';

const { TabPane } = Tabs;

const FormItem = Form.Item;
const Option = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const BusRoute = props => {
  return (
    <Card title="Bus route">
      <Row>
        <Col>
          <Form {...formItemLayout}>
            <FormItem label="Name">
              <Input />
            </FormItem>
            <FormItem label="Bus">
              <Select style={{ minWidth: 200 }}>
                <Option value="1">Quận 7 - Bình Chánh</Option>
                <Option value="2">Quận 2 - Quận 8</Option>
                <Option value="3">Sân Bay - Gò Vấp</Option>
              </Select>
            </FormItem>
            <FormItem label="Supervisor">
              <Select style={{ minWidth: 200 }}>
                <Option value="1">Thảo Hoàng</Option>
                <Option value="2">Đăng Nguyễn</Option>
                <Option value="3">Hùng Võ</Option>
              </Select>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Tabs defaultActiveKey="pickup">
        <TabPane tab="Pick-up" key="pickup">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane
              tab={
                <span>
                  <Icon type="branches" />
                  Bus stop
                </span>
              }
              key="1"
              style={{ padding: 18 }}
            >
              <MapRoutes />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />
                  Students
                </span>
              }
              key="2"
              style={{ padding: 18 }}
            >
              <Table
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                  },
                  {
                    title: 'Class',
                    dataIndex: 'class',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'end_time',
                    align: 'center',
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Drop off" key="dropoff">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane
              tab={
                <span>
                  <Icon type="branches" />
                  Bus stop
                </span>
              }
              key="1"
              style={{ padding: 18 }}
            >
              <MapRoutes />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />
                  Students
                </span>
              }
              key="2"
              style={{ padding: 18 }}
            >
              <Table
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                  },
                  {
                    title: 'Class',
                    dataIndex: 'class',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'end_time',
                    align: 'center',
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default BusRoute;
