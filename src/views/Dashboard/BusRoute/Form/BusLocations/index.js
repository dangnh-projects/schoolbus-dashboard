import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Spin } from 'antd';
import GoogleMapReact from 'google-map-react';
import AddLocationModal from './AddLocationModal';
import { useSelector } from 'react-redux';

const RouteTree = lazy(() => import('./RouteTree'));

// const getRoutes = (map, from, to) => {
//   const directionsService = new map.maps.DirectionsService();
//   var request = {
//     origin: `${from.lat},${from.lng}`,
//     destination: `${to.lat},${to.lng}`,
//     travelMode: 'DRIVING',
//   };

//   return new Promise((res, rej) => {
//     directionsService.route(request, function(response, status) {
//       if (status === 'OK') {
//         res(response);
//         return;
//       }

//       rej(status);
//     });
//   });
// };

const BusRouteSetting = props => {
  const { locations = [], modalVisible } = useSelector(state => state.busRoute);
  const [map, setMap] = useState(null);
  // const [points, setPoints] = useState([]);

  //const [showAddRoutePosition, setShowAddRoutePosition] = useState(false);
  const handleOnClick = async ev => {
    // const { lat, lng } = ev;
    // if (points.length > 0) {
    //   const curPt = { ...points[points.length - 1] };
    //   // const directions = await getDirections(curPt, { lat, lng });
    //   var flightPath = new map.maps.Polyline({
    //     path: [curPt, ...[]],
    //     geodesic: true,
    //     strokeColor: '#88191d',
    //     strokeOpacity: 1,
    //     strokeWeight: 5,
    //   });
    //   flightPath.setMap(map.map);
    // }
    // points.push({ lat, lng });
    // setPoints([...points]);
  };

  //const handleAddPoint = async pt => {
  // const { lat, lng } = pt;
  // if (points.length > 0) {
  //   const curPt = { ...points[points.length - 1] };
  //   const directions = await getRoutes(
  //     map,
  //     { lat: curPt.lat, lng: curPt.lng },
  //     { lat, lng }
  //   );
  //   const { routes } = directions;
  //   if (routes.length > 0) {
  //     const { overview_polyline } = routes[0];
  //     const pts = map.maps.geometry.encoding
  //       .decodePath(overview_polyline)
  //       .map(point => ({ lat: point.lat(), lng: point.lng() }));
  //     console.log(pts);
  //     var flightPath = new map.maps.Polyline({
  //       path: [curPt, ...pts],
  //       geodesic: true,
  //       strokeColor: '#88191d',
  //       strokeOpacity: 1,
  //       strokeWeight: 5,
  //     });
  //     flightPath.setMap(map.map);
  //   }
  // }
  // points.push(pt);
  // setPoints([...points]);
  //};

  const handleGoogleMapApi = map => setMap(map);
  const end =
    locations &&
    locations.length > 0 &&
    locations[locations.length - 1].bus_location;
  return (
    <Row gutter={16} type="flex">
      {modalVisible && <AddLocationModal map={map} />}
      <Col span={8}>
        <Suspense fallback={<Spin />}>
          <RouteTree //setShowAddRoutePosition={setShowAddRoutePosition}
          />
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
          defaultZoom={16}
          layerTypes={['TrafficLayer']}
          onClick={handleOnClick}
          onGoogleApiLoaded={handleGoogleMapApi}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {locations.map(loc => {
            if (loc && loc.bus_location) {
              return (
                <div
                  lat={loc.bus_location.lat}
                  lng={loc.bus_location.lng}
                  key={loc.id}
                >
                  <img
                    src="/images/map-pin.png"
                    alt="pin"
                    width={32}
                    style={{ transform: 'translate(-50%, -100%)' }}
                  />
                </div>
              );
            }
            return null;
          })}
          {/* {points.map((point, idx) => (
    <AnyReactComponent lat={point.lat} lng={point.lng} key={idx} />
  ))} */}
        </GoogleMapReact>
      </Col>
    </Row>
  );
};

export default BusRouteSetting;
