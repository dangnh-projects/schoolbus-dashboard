import React, { memo } from 'react';
import {
  Row,
  Col,
  Timeline,
  Icon,
  Button,
  notification,
  Popconfirm,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const buildDot = type => {
  if (type === 'start') {
    return (
      <Icon type="play-circle" style={{ fontSize: '16px', color: '#52c41a' }} />
    );
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
  ({ id, route, name, dotType, time_to_next_location, dispatch }) => (
    <Timeline.Item dot={buildDot(dotType)}>
      <Row type="flex" align="top" justify="space-between">
        <Col style={{ flex: 1 }}>
          {name}
          {dotType !== 'end' && [
            <br key="break" />,
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
            </Row>,
          ]}
        </Col>
        <Col>
          <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
          <Popconfirm
            title="Delete this location?"
            onConfirm={() => {
              console.log(route);
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
          <Icon type="arrow-up" style={{ marginLeft: 12 }} />
          <Icon type="arrow-down" style={{ marginLeft: 8 }} />
        </Col>
      </Row>
    </Timeline.Item>
  )
);

const RouteTree = props => {
  console.log('Route tree render');
  const dispatch = useDispatch();

  const { locations = [], route } = useSelector(store => store.busRoute);

  // useEffect(() => {
  //   if (route) {
  //     dispatch(actionCreator.getRouteLocations(route.id));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const st = [...locations];
  const end = st.pop();
  return (
    <Col span={24}>
      <Row
        type="flex"
        justify="center"
        style={{ marginBottom: 16, fontSize: 20 }}
      >
        Positions
      </Row>
      <Timeline>
        {st &&
          st.length > 0 &&
          st.map((loc, idx) => (
            <PositionItem
              key={idx}
              name={loc.bus_location && loc.bus_location.address}
              time_to_next_location={
                loc.bus_location && loc.bus_location.time_to_next_location
              }
              dotType={idx === 0 && 'start'}
              dispatch={dispatch}
              id={loc.bus_location && loc.bus_location.id}
              route={loc.bus_route && loc.bus_route.id}
            />
          ))}
        {end && (
          <Timeline.Item
            dot={
              <Icon
                type="close-circle"
                style={{ fontSize: '16px', color: 'red' }}
              />
            }
          >
            <Row type="flex" align="top" justify="space-between">
              <Col style={{ flex: 1 }}>
                {end.bus_location && end.bus_location.address}
              </Col>
              <Col>
                <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                <Icon type="close" style={{ color: 'red', marginLeft: 4 }} />
                <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                <Icon type="arrow-down" style={{ marginLeft: 8 }} />
              </Col>
            </Row>
          </Timeline.Item>
        )}
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
            props.setShowAddRoutePosition &&
              props.setShowAddRoutePosition(true);
          }}
        >
          Add new position
        </Button>
      </Row>
    </Col>
  );
};

export default memo(RouteTree);
