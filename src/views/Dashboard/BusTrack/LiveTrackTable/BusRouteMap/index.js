import React, { useState } from 'react';
import { Modal, Col } from 'antd';
import GoogleMapReact from 'google-map-react';

const BusRouteMap = props => {
  const [loc, setLoc] = useState();
  return (
    <Modal visible={props.visible}>
      <Col span={16} style={{ minHeight: 480 }}>
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
          {/* {points.map((point, idx) => (
    <AnyReactComponent lat={point.lat} lng={point.lng} key={idx} />
  ))} */}
        </GoogleMapReact>
      </Col>
    </Modal>
  );
};

export default BusRouteMap;
