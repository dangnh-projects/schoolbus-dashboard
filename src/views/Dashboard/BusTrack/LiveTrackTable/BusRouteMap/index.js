import React, { useState, useEffect } from 'react';
import { Modal, Col, Row } from 'antd';
import GoogleMapReact from 'google-map-react';
import RouteTree from './RouteTree';

import Firebase from 'utils/firebase-service';

const BusRouteMap = props => {
  const { route = {} } = props;

  const { locations = [], currentLoc, nextLoc } = route || {};

  const [loc, setLoc] = useState();
  const [isFollowBus, setIsFollowBus] = useState(true);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [busLocation, setBusLocation] = useState(null);

  useEffect(() => {
    if (route) {
      let ref = Firebase.database().ref(
        'locations/route_' + route.bus_route.id
      );
      ref.on('value', snapshot => {
        const state = snapshot.val();
        if (state) {
          const { lat, lng } = state;
          isFollowBus && setLoc({ lat, lng });
          setBusLocation({ lat, lng });
        } else {
          if (locations.length > 0) {
            const loc = locations[0];
            const { lat, lng } = loc.location;
            isFollowBus && setLoc({ lat, lng });
            setBusLocation({ lat, lng });
          }
        }
      });

      return () => {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const handleSelect = location => {
    setIsFollowBus(false);
    setSelectedLoc(location);
    setLoc({
      lng: location.location.lng,
      lat: location.location.lat,
    });
  };

  return (
    <Modal
      visible={props.visible}
      onOk={() => props.setVisible && props.setVisible(false)}
      onCancel={() => props.setVisible && props.setVisible(false)}
      width={1200}
    >
      <Row type="flex" gutter={16}>
        <Col span={5}>
          <RouteTree
            locations={locations}
            handleSelect={handleSelect}
            selectedLoc={selectedLoc}
            currentLoc={currentLoc}
            nextLoc={nextLoc}
          />
        </Col>
        <Col span={18} style={{ minHeight: 480 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDxn1JyUEjelPN8IoDNWYO-HBTExzyaxE4',
            }}
            defaultCenter={{
              lat: 10.8000835,
              lng: 106.7042577,
            }}
            center={
              isFollowBus
                ? busLocation
                  ? { lat: busLocation.lat, lng: busLocation.lng }
                  : null
                : loc
                ? { lat: loc.lat, lng: loc.lng }
                : null
            }
            defaultZoom={15}
            // layerTypes={['TrafficLayer']}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            {busLocation && busLocation.loc && (
              <div lat={busLocation.lat} lng={busLocation.lng}>
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
