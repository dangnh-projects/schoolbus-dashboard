import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Button, Spin } from 'antd';
import GoogleMapReact from 'google-map-react';
import RouteTree from './RouteTree';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

import Firebase from 'utils/firebase-service';

const BusRouteMap = props => {
  const dispatch = useDispatch();
  const { currentRoute, loading } = useSelector(store => store.busRoute);

  const { locations = [], currentLoc, nextLoc } = currentRoute || {};

  const [loc, setLoc] = useState();
  const [isFollowBus, setIsFollowBus] = useState(true);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [busLocation, setBusLocation] = useState(null);

  useEffect(() => {
    if (currentRoute) {
      let ref = Firebase.database().ref(
        'locations/route_' + currentRoute.bus_route.id
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
  }, [currentRoute]);

  const handleSelect = location => {
    setIsFollowBus(false);
    setSelectedLoc(location);
    setLoc({
      lng: location.location.lng,
      lat: location.location.lat,
    });
  };

  const clickOnBus = () => {
    setIsFollowBus(true);
    setSelectedLoc(null);
    if (busLocation && busLocation.lng) {
      setLoc({
        lng: busLocation.lng,
        lat: busLocation.lat,
      });
    }
  };

  if (locations.length === 0) {
    return (
      <Modal
        visible={props.visible}
        onOk={() => {
          props.setVisible && props.setVisible(false);
          dispatch(actionCreator.setCurrentRoute(null));
        }}
        onCancel={() => {
          props.setVisible && props.setVisible(false);
          dispatch(actionCreator.setCurrentRoute(null));
        }}
        footer={false}
        // width={1200}
      >
        <Row
          type="flex"
          align="middle"
          justify="center"
          style={{ fontSize: 14 }}
        >
          This bus route currently has not started yet or already ended. <br />
          Please refresh this page to get latest data.
          <Button
            onClick={() => window.location.reload()}
            style={{ marginTop: 24 }}
          >
            Refresh page
          </Button>
        </Row>
      </Modal>
    );
  }

  return (
    <Modal
      visible={props.visible}
      onOk={() => {
        props.setVisible && props.setVisible(false);
        dispatch(actionCreator.setCurrentRoute(null));
      }}
      onCancel={() => {
        props.setVisible && props.setVisible(false);
        dispatch(actionCreator.setCurrentRoute(null));
      }}
      width={1200}
      loading={loading}
    >
      <Spin spinning={loading}>
        <Row type="flex" gutter={16}>
          <Col span={5}>
            <RouteTree
              locations={locations}
              handleSelect={handleSelect}
              selectedLoc={selectedLoc}
              currentLoc={currentLoc}
              nextLoc={nextLoc}
              clickOnBus={clickOnBus}
            />
          </Col>
          <Col span={18} style={{ minHeight: 480 }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAP_KEY,
              }}
              defaultCenter={{
                lat: 10.8000835,
                lng: 106.7042577,
              }}
              center={isFollowBus ? busLocation : loc}
              defaultZoom={15}
              // layerTypes={['TrafficLayer']}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              {busLocation && busLocation.lat && (
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
      </Spin>
    </Modal>
  );
};

export default BusRouteMap;
