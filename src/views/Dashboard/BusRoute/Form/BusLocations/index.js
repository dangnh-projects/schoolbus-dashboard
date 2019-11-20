import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Timeline, Icon, Button, Spin } from 'antd';
import GoogleMapReact from 'google-map-react';
import AddLocationModal from './AddLocationModal';

const RouteTree = lazy(() => import('./RouteTree'));

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
        <AddLocationModal
          visible={showAddRoutePosition}
          setShowAddRoutePosition={setShowAddRoutePosition}
          map={map}
          handleAddPoint={handleAddPoint}
        />
      )}
      <Col span={8}>
        <Suspense fallback={<Spin />}>
          <RouteTree setShowAddRoutePosition={setShowAddRoutePosition} />
        </Suspense>
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
