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
      let ref = Firebase.database().ref(
        'locations/route_' + route.bus_route.id
      );
      ref.on('value', snapshot => {
        const state = snapshot.val();
        if (state) {
          const { lat, lng } = state;
          setLoc({ lat, lng });
        } else {
          if (locations.length > 0) {
            const loc = locations[0];
            const { lat, lng } = loc.location;
            setLoc({ lat, lng });
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {loc && (
              <div lat={loc.lat} lng={loc.lng}>
                <img
                  src="/images/yellow-bus-icon.png"
                  alt="pin"
                  width={48}
                  style={{ transform: 'translate(-50%, -50%)' }}
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
