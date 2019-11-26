import React, { useState, useEffect } from 'react';
import { Icon, Modal, Input, Form, Spin, Button, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const Item = Form.Item;

const ADDRESS_TYPES = {
  STREET_NUMBER: 'street_number',
  ROUTE: 'route',
  WARD: 'sublocality_level_1',
  DISTRICT: 'administrative_area_level_2',
  PROVINCE: 'administrative_area_level_1',
};

const MapRouteModal = ({ setShowAddRoutePosition, map }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const busRoute = useSelector(state => state.busRoute);
  const { route, locations = [], currentLocation, modalVisible } = busRoute;
  // if (!route) {
  //   setShowAddRoutePosition(false);
  //   hand
  // }
  const [address, setAddress] = useState('');
  const [addressObj, setAddressObj] = useState(null);
  const [timeNextLoc, setTimeNextLoc] = useState(0);
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [point, setPoint] = useState(null);

  const getSearchPlace = async () => {
    setLoading(true);
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
      console.log(place);

      address_components.forEach(component => {
        if (component && component.types && component.types.length > 0) {
          if (component.types.indexOf(ADDRESS_TYPES.STREET_NUMBER) > -1) {
            addObj['number'] = component.long_name;
            setNumber(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.ROUTE) > -1) {
            addObj['street'] = component.long_name;
            setStreet(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.WARD) > -1) {
            addObj['ward'] = component.long_name;
            setWard(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.DISTRICT) > -1) {
            addObj['district'] = component.long_name;
            setDistrict(component.long_name);
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

    setLoading(false);
  };

  useEffect(() => {
    if (currentLocation && currentLocation.bus_location) {
      const { bus_location } = currentLocation;
      setAddress(bus_location.address);
      setNumber(bus_location.number);
      setStreet(bus_location.street);
      setWard(bus_location.ward);
      setDistrict(bus_location.district);
      setTimeNextLoc(bus_location.time_to_next_location);
      setPoint({
        lng: bus_location.lng,
        lat: bus_location.lat,
      });
    }
  }, [currentLocation]);

  const handleOnSubmit = async () => {
    const data = {
      address,
      street,
      number,
      ward,
      district,
      lng: point.lng,
      lat: point.lat,
      time_to_next_location: parseInt(timeNextLoc) || 0,
    };

    if (currentLocation) {
      data.id = currentLocation.bus_location.id;
      dispatch(actionCreator.updateLocation(data));
    } else {
      data.route = route.id;
      if (locations.length > 0) {
        data.previous_location = locations[locations.length - 1].id;
        data.order = locations[locations.length - 1].order + 1;
      }
      dispatch(actionCreator.postRouteLocation(data));
    }

    // await handleAddPoint(
    //   Object.assign({}, point, addressObj, { address, name })
    // );
    // setShowAddRoutePosition(false);
  };
  return (
    <Modal
      visible={modalVisible}
      onCancel={() => dispatch(actionCreator.toggleModal(false))}
      onOk={handleOnSubmit}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form>
          <Item label="Address">
            <Input
              value={address}
              onChange={e => setAddress(e.target.value)}
              suffix={<Icon type="search" onClick={getSearchPlace} />}
            />
            <sub>Please click search button to get address information</sub>
          </Item>
          <Row gutter={16}>
            <Col span={12}>
              <Item label="Number">
                <Input
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Street">
                <Input
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item label="Ward">
                <Input value={ward} onChange={e => setWard(e.target.value)} />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="District">
                <Input
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                />
              </Item>
            </Col>
          </Row>

          <Item label="Time to next destination (0 if this is final position)">
            <Input
              value={timeNextLoc}
              onChange={e => setTimeNextLoc(e.target.value)}
            />
          </Item>
          <Row type="flex" justify="center">
            <Button
              onClick={handleOnSubmit}
              htmlType="button"
              disabled={!currentLocation && !addressObj}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default MapRouteModal;
