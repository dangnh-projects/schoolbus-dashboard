import React, { useEffect, lazy, Suspense } from 'react';
import { Card, Icon, Tabs, Tag, Spin, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const LiveTrackTable = lazy(() => import('./LiveTrackTable'));
const { TabPane } = Tabs;

export const Bus = props => {
  const {
    pickupRunningRoute = [],
    dropoffRunningRoute = [],
    loading,
  } = useSelector(state => state.busRoute);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreator.getRoutes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={loading}>
      <Card
        title={
          <Row type="flex">
            <Col>
              <img
                src="/images/ic_bus.png"
                alt="moving bus"
                style={{ width: 48, marginRight: 12 }}
              />
            </Col>
            <Col>Moving Bus</Col>
          </Row>
        }
        extra={
          <Button onClick={() => dispatch(actionCreator.getRoutes())}>
            Refresh
          </Button>
        }
      >
        <Tabs>
          <TabPane
            tab={
              <span>
                <Icon type="arrow-up" />
                Pickup
                <Tag color="#87d068" style={{ marginLeft: 12 }}>
                  {pickupRunningRoute.length}
                </Tag>
              </span>
            }
            key="Pickup"
          >
            <Suspense fallback={<Spin />}>
              <LiveTrackTable
                setCurrentRoute={item =>
                  dispatch(actionCreator.setCurrentRoute(item))
                }
                dataSource={pickupRunningRoute}
              />
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="arrow-down" />
                Drop off
                <Tag color="#87d068" style={{ marginLeft: 12 }}>
                  {dropoffRunningRoute.length}
                </Tag>
              </span>
            }
            key="drop-off"
          >
            <Suspense fallback={<Spin />}>
              <LiveTrackTable
                setCurrentRoute={item =>
                  dispatch(actionCreator.setCurrentRoute(item))
                }
                dataSource={dropoffRunningRoute}
              />
            </Suspense>
          </TabPane>
        </Tabs>
      </Card>
    </Spin>
  );
};

export default Bus;
