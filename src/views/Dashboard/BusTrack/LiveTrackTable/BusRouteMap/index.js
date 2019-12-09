import React, { useState } from 'react';
import { Modal, Col, Row } from 'antd';
import GoogleMapReact from 'google-map-react';

const BusRouteMap = props => {
  const { route = {} } = props;
  const { locations = [] } = route || {};
  const [loc, setLoc] = useState();
  return (
    <Modal visible={props.visible}>
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
            defaultZoom={16}
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
