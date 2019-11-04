import React, { useState } from 'react';
import { Row, Col, Timeline, Icon, Button, Modal, Input, Form } from 'antd';
import GoogleMapReact from 'google-map-react';
import { DebounceInput } from 'react-debounce-input';

const Item = Form.Item;

const getPaces = async (map, searchStr) => {
  console.log(map);
  console.log('go on search');
  var request = {
    query: searchStr,
    fields: ['name', 'geometry'],
  };

  var service = new map.maps.places.PlacesService(map.map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === map.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
    }
  });
};

const MapRouteModal = ({ visible = false, setShowAddRoutePosition, map }) => {
  return (
    <Modal visible={visible} onCancel={() => setShowAddRoutePosition(false)}>
      <Form>
        <Item label="Name">
          {/* <DebounceInput
            minLength={2}
            debounceTimeout={300}
            element={Input}
            onChange={e => getPaces(map, e.target.value)}
          /> */}
          <Input />
        </Item>
        <Item label="Address">
          <Input />
        </Item>
        <Row type="flex" justify="space-between">
          <Col>
            <Item label="Latitude">
              <Input />
            </Item>
          </Col>
          <Col>
            <Item label="Longitude">
              <Input />
            </Item>
          </Col>
        </Row>
        <Item label="Time to next destination (0 if this is final position)">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

const buildDot = type => {
  if (type === 'start') {
    return (
      <Icon type="play-circle" style={{ fontSize: '16px', color: '#52c41a' }} />
    );
  }

  if (type === 'end') {
    return (
      <Icon type="close-circle" style={{ fontSize: '16px', color: 'red' }} />
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
        <Icon type="cross" style={{ color: 'red', marginLeft: 4 }} />
        <Icon type="arrow-up" style={{ marginLeft: 12 }} />
        <Icon type="arrow-down" style={{ marginLeft: 8 }} />
      </Col>
    </Row>
  </Timeline.Item>
);

const BusRouteSetting = props => {
  const [points, setPoints] = useState([]);
  const [map, setMap] = useState(null);

  const [showAddRoutePosition, setShowAddRoutePosition] = useState(false);
  const handleOnClick = async ev => {
    const { lat, lng } = ev;
    if (points.length > 0) {
      const curPt = { ...points[points.length - 1] };
      // const directions = await getDirections(curPt, { lat, lng });
      var flightPath = new map.maps.Polyline({
        path: [curPt, ...[]],
        geodesic: true,
        strokeColor: '#88191d',
        strokeOpacity: 1,
        strokeWeight: 5,
      });

      flightPath.setMap(map.map);
    }
    points.push({ lat, lng });

    setPoints([...points]);
  };

  const handleGoogleMapApi = map => setMap(map);
  return (
    <Row gutter={16} type="flex">
      {showAddRoutePosition && (
        <MapRouteModal
          visible={showAddRoutePosition}
          setShowAddRoutePosition={setShowAddRoutePosition}
          map={map}
        />
      )}
      <Col span={8}>
        <Row
          type="flex"
          justify="center"
          style={{ marginBottom: 16, fontSize: 20 }}
        >
          Positions
        </Row>
        <Timeline>
          <PositionItem
            name="Đại học Quốc tế Hồng Bàng cơ sở Điện Biên Phủ"
            dotType="start"
          />
          <PositionItem name="Vòng xoay Điện Biên Phủ" />
          <PositionItem name="Võ Thị Sáu" />
          <PositionItem name="Phạm Ngọc Thạch" />
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
                49 Phạm Ngọc Thạch Quận 3 TP Hồ Chí Minh Việt Nam
              </Col>
              <Col>
                <Icon type="edit" style={{ marginLeft: 12 }} />{' '}
                <Icon type="cross" style={{ color: 'red', marginLeft: 4 }} />
                <Icon type="arrow-up" style={{ marginLeft: 12 }} />
                <Icon type="arrow-down" style={{ marginLeft: 8 }} />
              </Col>
            </Row>
          </Timeline.Item>
        </Timeline>
        <Row type="flex" justify="center">
          <Button
            style={{ paddingLeft: 40, paddingRight: 40 }}
            onClick={e => setShowAddRoutePosition(true)}
          >
            Add new position
          </Button>
        </Row>
      </Col>
      <Col span={16} style={{ minHeight: 480 }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDxn1JyUEjelPN8IoDNWYO-HBTExzyaxE4',
          }}
          defaultCenter={{
            lat: 10.8000835,
            lng: 106.7042577,
          }}
          defaultZoom={17}
          layerTypes={['TrafficLayer']}
          onClick={handleOnClick}
          onGoogleApiLoaded={handleGoogleMapApi}
        >
          {/* {points.map((point, idx) => (
    <AnyReactComponent lat={point.lat} lng={point.lng} key={idx} />
  ))} */}
        </GoogleMapReact>
      </Col>
    </Row>
  );
};

export default BusRouteSetting;
