import React, { memo } from 'react';
import { Row, Col, Timeline, Icon } from 'antd';

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
    name,
    dotType,
    handleSelect,
    loc,
    selectedLoc,
    currentLoc,
    have_bus,
    id,
  }) => (
    <Timeline.Item dot={buildDot(dotType)}>
      <Row
        type="flex"
        align="top"
        justify="space-between"
        onClick={() => handleSelect(loc)}
        style={{ cursor: 'pointer' }}
      >
        <Col
          style={{
            flex: 1,
            color:
              selectedLoc &&
              selectedLoc.location &&
              selectedLoc.location.id === loc.location.id
                ? '#0d5321'
                : '',
            fontWeight:
              selectedLoc &&
              selectedLoc.location &&
              selectedLoc.location.id === loc.location.id
                ? 'bold'
                : '',
          }}
        >
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
            {have_bus && (
              <img src="/images/yellow-bus-icon.png" alt="pin" width={28} />
            )}
          </Row>
        </Col>
      </Row>
    </Timeline.Item>
  )
);

const RouteTree = props => {
  const {
    locations = [],
    handleSelect,
    selectedLoc,
    currentLoc,
    nextLoc,
  } = props;

  const st = [...locations.sort((a, b) => a.order - b.order)];
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
        <PositionItem
          name="School"
          dotType="start"
          have_bus={!currentLoc && nextLoc}
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
                loc.location &&
                `${loc.location.address} ${loc.location.street} ${loc.location
                  .ward !== '' && 'phường ' + loc.location.ward} ${
                  loc.location.district
                }`
              }
              time_to_next_location={
                idx < st.length - 1
                  ? st[idx + 1].estimated_travelling_time
                  : end.estimated_travelling_time
              }
              id={loc.location && loc.location.id}
              route={loc.bus_route && loc.bus_route.id}
              handleSelect={handleSelect}
              selectedLoc={selectedLoc}
              currentLoc={currentLoc}
              have_bus={
                currentLoc &&
                currentLoc.location &&
                currentLoc.location.id === loc.location.id
              }
            />
          ))}
        {end && (
          <Timeline.Item
            dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
          >
            <Row
              type="flex"
              align="top"
              justify="space-between"
              onClick={() => handleSelect(end)}
              style={{ cursor: 'pointer', flexDirection: 'column' }}
            >
              <Col span={24} style={{ flex: 1 }}>
                {end.location &&
                  `${end.location.address} ${end.location.street} ${end.location
                    .ward !== '' && 'phường ' + end.location.ward} ${
                    end.location.district
                  }`}
              </Col>

              {!nextLoc && (
                <Row
                  span={24}
                  key="time"
                  style={{
                    marginTop: 16,
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: 'rgba(0,0,0,0.45)',
                  }}
                >
                  <img src="/images/yellow-bus-icon.png" alt="pin" width={28} />
                </Row>
              )}
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
    </Col>
  );
};

export default memo(RouteTree);
