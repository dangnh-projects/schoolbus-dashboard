import React, { memo } from 'react';
import { Row, Col, Timeline, Icon, Button } from 'antd';
import { useDispatch } from 'react-redux';
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
  ({ name, dotType, handleSelect, loc, selectedLoc, have_bus, clickOnBus }) => (
    <Timeline.Item dot={buildDot(dotType)}>
      <Row
        type="flex"
        align="top"
        justify="space-between"
        style={{ cursor: 'pointer', flexDirection: 'column' }}
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
          onClick={() => loc && handleSelect(loc)}
        >
          {name}
        </Col>
        <Col
          key="time"
          style={{
            marginTop: 16,
            fontSize: 12,
            fontStyle: 'italic',
            color: 'rgba(0,0,0,0.45)',
          }}
          onClick={() => {
            clickOnBus();
          }}
        >
          {have_bus && <img src="/images/ic_bus.png" alt="pin" width={40} />}
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
    clickOnBus,
    offboarded = [],
    remaining = [],
  } = props;

  const dispatch = useDispatch();

  const st = [...locations.sort((a, b) => (a.order > b.order ? 1 : -1))];
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
          have_bus={
            (offboarded.length === 0 && remaining.length === 0) ||
            (!currentLoc && nextLoc)
          }
          time_to_next_location={
            st && st.length > 0 && st[0].estimated_travelling_time
          }
          handleSelect={handleSelect}
          clickOnBus={clickOnBus}
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
              clickOnBus={clickOnBus}
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
              style={{ cursor: 'pointer', flexDirection: 'column' }}
            >
              <Col
                onClick={() => handleSelect(end)}
                span={24}
                style={{
                  flex: 1,
                  color:
                    selectedLoc &&
                    selectedLoc.location &&
                    selectedLoc.location.id === end.location.id
                      ? '#0d5321'
                      : '',
                  fontWeight:
                    selectedLoc &&
                    selectedLoc.location &&
                    selectedLoc.location.id === end.location.id
                      ? 'bold'
                      : '',
                }}
              >
                {end.location &&
                  `${end.location.address} ${end.location.street} ${end.location
                    .ward !== '' && 'phường ' + end.location.ward} ${
                    end.location.district
                  }`}
              </Col>

              {offboarded.length > 0 && !nextLoc && (
                <Row
                  span={24}
                  key="time"
                  style={{
                    marginTop: 16,
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: 'rgba(0,0,0,0.45)',
                  }}
                  onClick={() => {
                    clickOnBus();
                  }}
                >
                  <img src="/images/ic_bus.png" alt="pin" width={40} />
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
      <Row type="flex" justify="center">
        <Button
          style={{ paddingLeft: 40, paddingRight: 40 }}
          onClick={e => {
            dispatch(actionCreator.getRoutes());
          }}
        >
          Refresh
        </Button>
      </Row>
    </Col>
  );
};

export default memo(RouteTree);
