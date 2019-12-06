import React, { lazy, Suspense, useEffect } from 'react';
import { Spin, Card, Row, Tabs, Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const BusLocations = lazy(() => import('./BusLocations'));
const RouteForm = lazy(() => import('./RouteForm'));
const RouteStudent = lazy(() => import('./BusStudent'));

const { TabPane } = Tabs;

const BusRoute = props => {
  const dispatch = useDispatch();
  const { data } = useSelector(store => store.dataTable);

  useEffect(() => {
    dispatch(actionCreator.toggleModal({ val: false, force: true }));
    if (!props.id) {
      dispatch(actionCreator.getRouteLocationSuccess([]));
      dispatch(actionCreator.postRouteSuccess(null));
      dispatch(actionCreator.setStudent([]));
      // dispatch(actionCreator.postRouteSuccess())
    } else {
      const found = data.find(item => item.id.toString() === props.id);

      if (found) {
        dispatch(actionCreator.postRouteSuccess(found));
        dispatch(actionCreator.getRouteLocations(found.id));
        dispatch(actionCreator.setStudent(found.students || []));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card title="Bus route">
      <Row>
        <Suspense fallback={<Spin />}>
          <RouteForm />
        </Suspense>
      </Row>
      <Tabs defaultActiveKey="1">
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
          <Suspense fallback={<Spin />}>
            <BusLocations id={props.id} />
          </Suspense>
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
          <Suspense fallback={<Spin />}>
            <RouteStudent />
          </Suspense>
        </TabPane>
      </Tabs>
      {/* <Tabs defaultActiveKey="pickup">
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
      </Tabs> */}
    </Card>
  );
};

export default BusRoute;
