import React, { memo } from 'react';
import {
  Row,
  Col,
  Timeline,
  Icon,
  Button,
  notification,
  Popconfirm,
  Spin,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const buildDot = type => {
  if (type === 'start') {
    return <Icon type="bank" style={{ fontSize: '16px', color: '#52c41a' }} />;
  }

  if (type === 'end') {
    return (
      <Icon
        type="stop"
        theme="filled"
        style={{ fontSize: '16px', color: 'red' }}
      />
    );
  }

  return <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />;
};

const PositionItem = memo(
  ({
    id,
    route,
    name,
    dotType,
    time_to_next_location,
    dispatch,
    setCurrentLocation,
    loc,
    idx,
    count,
    handleGoUp,
    handleGoDown,
  }) => (
    <Timeline.Item dot={buildDot(dotType)}>
      <Row type="flex" align="top" justify="space-between">
        <Col style={{ flex: 1 }}>
          {name}
          <br key="break" />
          <Row
            key="time"
            style={{
              marginTop: 16,
              fontSize: 12,
              fontStyle: 'italic',
              color: 'rgba(0,0,0,0.45)',
            }}
          >
            {time_to_next_location} min
          </Row>
        </Col>
        {dotType === 'start' ? null : (
          <Col>
            <Icon
              type="edit"
              style={{ marginLeft: 12 }}
              onClick={() => setCurrentLocation(loc)}
            />
            <Popconfirm
              title="Delete this location?"
              onConfirm={() => {
                if (route) {
                  dispatch(
                    actionCreator.removeRouteLocation({
                      location: id,
                      route,
                    })
                  );
                }
              }}
            >
              <Icon type="close" style={{ color: 'red', marginLeft: 4 }} />
            </Popconfirm>
          </Col>
        )}
        {dotType !== 'start' && (
          <Col>
            {idx !== 0 && (
              <Icon
                onClick={() => handleGoUp(idx)}
                type="arrow-up"
                style={{ marginLeft: 12 }}
              />
            )}
            <Icon
              onClick={() => handleGoDown(idx)}
              type="arrow-down"
              style={{ marginLeft: 8 }}
            />
          </Col>
        )}
      </Row>
    </Timeline.Item>
  )
);

const RouteTree = props => {
  const dispatch = useDispatch();
  const setCurrentLocation = loc =>
    dispatch(actionCreator.setCurrentLocation(loc));

  const { locations = [], route, loading = false } = useSelector(
    store => store.busRoute
  );

  // useEffect(() => {
  //   if (route) {
  //     dispatch(actionCreator.getRouteLocations(route.id));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleGoUp = idx => {
    if (idx === 0) return;
    let currentOrder = locations[idx].order;
    let previousOrder = locations[idx - 1].order;

    dispatch(actionCreator.setLoading(true));

    dispatch(
      actionCreator.updateRouteWithLocation({
        id: locations[idx].id,
        order: -1,
        afterSuccess: () =>
          dispatch(
            actionCreator.updateRouteWithLocation({
              id: locations[idx - 1].id,
              order: currentOrder,
              afterSuccess: () =>
                dispatch(
                  actionCreator.updateRouteWithLocation({
                    id: locations[idx].id,
                    order: previousOrder,
                    afterSuccess: () => {
                      dispatch(actionCreator.getRouteLocations(route.id));
                      notification.success({ message: 'Update successfully' });
                      dispatch(actionCreator.setLoading(false));
                    },
                  })
                ),
            })
          ),
      })
    );
  };

  const handleGoDown = idx => {
    if (idx === locations.length - 1) return;
    let currentOrder = locations[idx].order;
    let nextOrder = locations[idx + 1].order;
    dispatch(actionCreator.setLoading(true));

    dispatch(
      actionCreator.updateRouteWithLocation({
        id: locations[idx].id,
        order: -1,
        afterSuccess: () =>
          dispatch(
            actionCreator.updateRouteWithLocation({
              id: locations[idx + 1].id,
              order: currentOrder,
              afterSuccess: () =>
                dispatch(
                  actionCreator.updateRouteWithLocation({
                    id: locations[idx].id,
                    order: nextOrder,
                    afterSuccess: () => {
                      dispatch(actionCreator.getRouteLocations(route.id));
                      notification.success({ message: 'Update successfully' });
                      dispatch(actionCreator.setLoading(false));
                    },
                  })
                ),
            })
          ),
      })
    );
  };

  const st = [...locations.sort((a, b) => a.order - b.order)];
  const end = st.pop();
  return (
    <Spin spinning={loading}>
      <Col span={24}>
        <Row
          type="flex"
          justify="center"
          style={{ marginBottom: 16, fontSize: 20 }}
        >
          Positions
        </Row>
        <Timeline>
          <PositionItem
            name="School"
            dotType="start"
            time_to_next_location={
              st && st.length > 0 && st[0].estimated_travelling_time
            }
          />
          {st &&
            st.length > 0 &&
            st.map((loc, idx) => (
              <PositionItem
                loc={loc}
                key={idx}
                idx={idx}
                count={st.length}
                name={
                  loc.bus_location &&
                  `${loc.bus_location.address} ${loc.bus_location.street} ${loc
                    .bus_location.ward !== '' &&
                    'phường ' + loc.bus_location.ward} ${
                    loc.bus_location.district
                  }`
                }
                time_to_next_location={
                  idx < st.length - 1
                    ? st[idx + 1].estimated_travelling_time
                    : end.estimated_travelling_time
                }
                dispatch={dispatch}
                id={loc.bus_location && loc.bus_location.id}
                route={loc.bus_route && loc.bus_route.id}
                setCurrentLocation={setCurrentLocation}
                handleGoUp={handleGoUp}
                handleGoDown={handleGoDown}
              />
            ))}
          {end && (
            <Timeline.Item
              dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
            >
              <Row type="flex" align="top" justify="space-between">
                <Col style={{ flex: 1 }}>
                  {end.bus_location &&
                    `${end.bus_location.address} ${
                      end.bus_location.street
                    } ${end.bus_location.ward !== '' &&
                      'phường ' + end.bus_location.ward} ${
                      end.bus_location.district
                    }`}
                </Col>
                <Col>
                  <Icon
                    type="edit"
                    style={{ marginLeft: 12 }}
                    onClick={() => setCurrentLocation(end)}
                  />
                  <Popconfirm
                    title="Delete this location?"
                    onConfirm={() => {
                      if (end.bus_route) {
                        dispatch(
                          actionCreator.removeRouteLocation({
                            location: end.id,
                            route: end.bus_route.id,
                          })
                        );
                      }
                    }}
                  >
                    <Icon
                      type="close"
                      style={{ color: 'red', marginLeft: 4 }}
                    />
                  </Popconfirm>
                  <Icon
                    type="arrow-up"
                    onClick={() => handleGoUp(locations.length - 1)}
                    style={{ marginLeft: 12 }}
                  />
                </Col>
              </Row>
            </Timeline.Item>
          )}
          <Timeline.Item
            dot={
              <Icon
                type="close-circle"
                style={{ fontSize: '16px', color: 'red' }}
              />
            }
          >
            School
          </Timeline.Item>
        </Timeline>
        <Row type="flex" justify="center">
          <Button
            style={{ paddingLeft: 40, paddingRight: 40 }}
            onClick={e => {
              if (!route) {
                notification.warning({
                  message: 'Please create bus route first',
                });
                return;
              }
              // props.setShowAddRoutePosition &&
              //   props.setShowAddRoutePosition(true);

              dispatch(actionCreator.setCurrentLocation(null));
            }}
          >
            Add new position
          </Button>
        </Row>
      </Col>
    </Spin>
  );
};

export default memo(RouteTree);
