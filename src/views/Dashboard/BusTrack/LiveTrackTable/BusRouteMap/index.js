import React, { useState, useEffect } from 'react';
import { Modal, Col, Row } from 'antd';
import GoogleMapReact from 'google-map-react';

import Firebase from 'utils/firebase-service';

const BusRouteMap = props => {
  const { route = {} } = props;
  const { locations = [] } = route || {};
  const [loc, setLoc] = useState();
  useEffect(() => {
    if (route) {
      let ref = Firebase.database().ref('locations');
      ref.on('value', snapshot => {
        const state = snapshot.val();
        console.log(state);
        // this.setState(state);
      });
      // console.log('DATA RETRIEVED');
      // const app = Firebase.app();
      // console.log(app);
      const database = Firebase.database();
      database
        // .ref(`/topics/route_${route.bus_route.id}`)
        .ref()
        .once('value')
        .then(console.log);
      // // console.log(ref, '==================');
      // // ref.on('value', params => {
      // //   console.log(params);
      // // });
    }
  }, [route]);
  return (
    <Modal
      visible={props.visible}
      onOk={() => props.setVisible && props.setVisible(false)}
      onCancel={() => props.setVisible && props.setVisible(false)}
      width={800}
    >
      <Row type="flex">
        <Col span={24} style={{ minHeight: 480 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDxn1JyUEjelPN8IoDNWYO-HBTExzyaxE4',
            }}
            defaultCenter={{
              lat: 10.8000835,
              lng: 106.7042577,
            }}
            center={loc ? { lat: loc.lat, lng: loc.lng } : null}
            defaultZoom={14}
            layerTypes={['TrafficLayer']}
            // onGoogleApiLoaded={handleGoogleMapApi}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            {loc && loc.bus_location && (
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
            )}
            {locations &&
              locations.map(loc => {
                return (
                  <div
                    lat={loc.location.lat}
                    lng={loc.location.lng}
                    key={loc.location.id}
                  >
                    <img
                      src="/images/map-pin.png"
                      alt="pin"
                      width={32}
                      style={{ transform: 'translate(-50%, -100%)' }}
                    />
                  </div>
                );
              })}
          </GoogleMapReact>
        </Col>
      </Row>
    </Modal>
  );
};

export default BusRouteMap;
