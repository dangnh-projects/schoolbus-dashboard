import React, { useState } from 'react';
import { Row, Col, Timeline, Icon, Button, Modal, Input, Form } from 'antd';
import GoogleMapReact from 'google-map-react';

const Item = Form.Item;

const ADDRESS_TYPES = {
  STREET_NUMBER: 'street_number',
  ROUTE: 'route',
  WARD: 'sublocality_level_1',
  DISTRICT: 'administrative_area_level_2',
};

const getRoutes = (map, from, to) => {
  const directionsService = new map.maps.DirectionsService();
  var request = {
    origin: `${from.lat},${from.lng}`,
    destination: `${to.lat},${to.lng}`,
    travelMode: 'DRIVING',
  };

  return new Promise((res, rej) => {
    directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        res(response);
        return;
      }

      rej(status);
    });
  });
};

const MapRouteModal = ({
  visible = false,
  setShowAddRoutePosition,
  map,
  handleAddPoint,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressObj, setAddressObj] = useState(null);
  const [point, setPoint] = useState(null);

  const getSearchPlace = async () => {
    const geocoder = new map.maps.Geocoder();
    const places = await new Promise((res, rej) => {
      geocoder.geocode({ address }, function(results, status) {
        if (status === 'OK') {
          res(results);
        } else {
          // alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    });

    if (places && places.length > 0) {
      const [place] = places;
      const { address_components, geometry, formatted_address } = place;
      const addObj = {};

      address_components.forEach(component => {
        if (component && component.types && component.types.length > 0) {
          if (component.types.indexOf(ADDRESS_TYPES.STREET_NUMBER) > -1) {
            addObj['number'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.ROUTE) > -1) {
            addObj['street'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.WARD) > -1) {
            addObj['ward'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.DISTRICT) > -1) {
            addObj['district'] = component.long_name;
            return;
          }
        }
      });
      setAddress(formatted_address);
      setAddressObj(addObj);
      setPoint({
        lng: geometry.location.lng(),
        lat: geometry.location.lat(),
      });
    }
  };

  const handleOnSubmit = async () => {
    await handleAddPoint(
      Object.assign({}, point, addressObj, { address, name })
    );
    setShowAddRoutePosition(false);
  };
  return (
    <Modal
      visible={visible}
      onCancel={() => setShowAddRoutePosition(false)}
      onOk={handleOnSubmit}
    >
      <Form>
        <Item label="Name">
          <Input onChange={e => setName(e.target.value)} />
        </Item>
        <Item label="Address">
          <Input
            value={address}
            onChange={e => setAddress(e.target.value)}
            suffix={<Icon type="search" onClick={getSearchPlace} />}
          />
        </Item>
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

  const handleAddPoint = async pt => {
    const { lat, lng } = pt;

    if (points.length > 0) {
      const curPt = { ...points[points.length - 1] };
      const directions = await getRoutes(
        map,
        { lat: curPt.lat, lng: curPt.lng },
        { lat, lng }
      );
      const { routes } = directions;
      if (routes.length > 0) {
        const { overview_polyline } = routes[0];
        const pts = map.maps.geometry.encoding
          .decodePath(overview_polyline)
          .map(point => ({ lat: point.lat(), lng: point.lng() }));
        console.log(pts);
        var flightPath = new map.maps.Polyline({
          path: [curPt, ...pts],
          geodesic: true,
          strokeColor: '#88191d',
          strokeOpacity: 1,
          strokeWeight: 5,
        });

        flightPath.setMap(map.map);
      }
    }
    points.push(pt);

    setPoints([...points]);
  };

  const handleGoogleMapApi = map => setMap(map);
  const st = [...points];
  const end = st.pop();
  return (
    <Row gutter={16} type="flex">
      {showAddRoutePosition && (
        <MapRouteModal
          visible={showAddRoutePosition}
          setShowAddRoutePosition={setShowAddRoutePosition}
          map={map}
          handleAddPoint={handleAddPoint}
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
          {st &&
            st.length > 0 &&
            st.map((pt, idx) => (
              <PositionItem
                name="Đại học Quốc tế Hồng Bàng cơ sở Điện Biên Phủ"
                dotType={idx === 0 && 'start'}
              />
            ))}
          {/* <PositionItem
            name="Đại học Quốc tế Hồng Bàng cơ sở Điện Biên Phủ"
            dotType="start"
          />
          <PositionItem name="Vòng xoay Điện Biên Phủ" />
          <PositionItem name="Võ Thị Sáu" />
          <PositionItem name="Phạm Ngọc Thạch" /> */}
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
                <Col style={{ flex: 1 }}>{end.name}</Col>
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
          center={end ? { lat: end.lat, lng: end.lng } : null}
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
