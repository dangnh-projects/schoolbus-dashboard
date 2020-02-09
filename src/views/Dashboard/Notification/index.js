import React, { useEffect } from 'react';
import { Card, Tabs, Icon } from 'antd';
import { connect, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { actionCreator } from 'store/notification/notification.meta';
import InformationNotification from './InformationNotification';

const { TabPane } = Tabs;

const Notification = ({ getListNotification }) => {
  const { data = [] } = useSelector(store => store.notification);
  const { token } = useSelector(store => store.user);

  if (!token) {
    navigate('/login');
  }

  useEffect(() => {
    getListNotification({
      url: '/core/api/settings/notification-template',
    });
  }, []);

  return (
    <Card title="Notification">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="notification" style={{ color: '#08c' }} />
              Notification content
            </span>
          }
          key="1"
        >
          <InformationNotification data={data} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="setting" style={{ color: '#08c' }} />
              Receiver setting
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
    </Card>
  );
};

const mapStateToProps = state => state.notification;
const mapDispatchToProps = {
  getListNotification: actionCreator.getListNotification,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
