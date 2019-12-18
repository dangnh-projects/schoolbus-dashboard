import React from 'react';
import { Card, Tabs, Icon, Divider, Input, Row, Col } from 'antd';
import { connect } from 'react-redux';
//import DataTable from 'components/DataTable';
import { actionCreator } from 'store/dataTable/dataTable.meta';

const { TabPane } = Tabs;
const { TextArea } = Input;

export const Notification = () => {
  return (
    <Card title="Notification">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="notification" />
              Notification content
            </span>
          }
          key="1"
        >
          <Divider orientation="left">
            <Icon type="mail" /> Pick-up messages
          </Divider>
          <h4>
            Student onboard to school <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S onboard to school" />
            </Col>
            <Col md={12}>
              VN
              <TextArea
                rows={2}
                value="%S đã lên xe buýt. Khởi hành đến trường."
              />
            </Col>
          </Row>
          <h4>
            Student reached school <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S reached school" />
            </Col>
            <Col md={12}>
              VN
              <TextArea rows={2} value="%S đã đến trường." />
            </Col>
          </Row>
          <Divider orientation="left">
            <Icon type="mail" /> Drop-off messages
          </Divider>
          <h4>
            Student onboard to home <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S onboard to home" />
            </Col>
            <Col md={12}>
              VN
              <TextArea rows={2} value="%S đã lên xe. Bắt đầu về nhà." />
            </Col>
          </Row>
          <h4>
            Student reached home <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S reached home." />
            </Col>
            <Col md={12}>
              VN
              <TextArea rows={2} value="%S đã đến trạm." />
            </Col>
          </Row>
          <Divider orientation="left">
            <Icon type="mail" /> Other messages
          </Divider>
          <h4>
            Student onboard to school <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S has miss the bus." />
            </Col>
            <Col md={12}>
              VN
              <TextArea rows={2} value="%S đã lỡ chuyến hôm nay." />
            </Col>
          </Row>
          <h4>
            Student reached school <Icon type="form" />
          </h4>
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col md={12}>
              EN
              <TextArea rows={2} value="%S absent today." />
            </Col>
            <Col md={12}>
              VN
              <TextArea rows={2} value="%S đã báo vắng mặt hôm nay." />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="setting" />
              Receiver setting
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
    </Card>
  );
};

const mapDispatchToProps = {
  getList: actionCreator.getList,
  deleteItem: actionCreator.deleteItem,
};

const mapStateToProps = state => state.dataTable;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
