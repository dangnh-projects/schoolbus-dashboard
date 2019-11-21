import React, { memo } from 'react';
import { Row, Col, Timeline, Icon, Button } from 'antd';
import { useSelector } from 'react-redux';

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

const PositionItem = ({ name, dotType }) => (
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
            20 min
          </Row>,
        ]}
      </Col>
      <Col>
        <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
        <Icon type="close" style={{ color: 'red', marginLeft: 4 }} />
        <Icon type="arrow-up" style={{ marginLeft: 12 }} />
        <Icon type="arrow-down" style={{ marginLeft: 8 }} />
      </Col>
    </Row>
  </Timeline.Item>
);

const RouteTree = props => {
  console.log('Route tree render');
  const { locations = [] } = useSelector(store => store.busRoute);

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
            <PositionItem name={loc.address} dotType={idx === 0 && 'start'} />
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
              <Col style={{ flex: 1 }}>{end.address}</Col>
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
          onClick={e =>
            props.setShowAddRoutePosition && props.setShowAddRoutePosition(true)
          }
        >
          Add new position
        </Button>
      </Row>
    </Col>
  );
};

export default memo(RouteTree);
