import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Spin, Button, Row, Col, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const Item = Form.Item;

const { Search } = Input;

const ADDRESS_TYPES = {
  STREET_NUMBER: 'street_number',
  ROUTE: 'route',
  WARD: 'locality',
  WARD2: 'sublocality',
  DISTRICT: 'administrative_area_level_2',
  PROVINCE: 'administrative_area_level_1',
};

const MapRouteModal = ({ setShowAddRoutePosition, map }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const busRoute = useSelector(state => state.busRoute);
  const { route, locations = [], currentLocation, modalVisible } = busRoute;
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('');
  const [addressObj, setAddressObj] = useState(null);
  const [estimatedTravelTime, setEstimatedTravelTime] = useState(0);
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [point, setPoint] = useState(null);

  const getSearchPlace = async searchTerm => {
    setLoading(true);
    const geocoder = new map.maps.Geocoder();
    const places = await new Promise((res, rej) => {
      geocoder.geocode({ address: searchTerm }, function(results, status) {
        if (status === 'OK') {
          res(results);
        } else {
          // alert('Geocode was not successful for the following reason: ' + status);
          notification.warning({
            message: 'Location not found!',
          });

          setLoading(false);
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
            setAddress(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.ROUTE) > -1) {
            addObj['street'] = component.long_name;
            setStreet(component.long_name);
            return;
          }

          if (
            component.types.indexOf(ADDRESS_TYPES.WARD) > -1 ||
            component.types.indexOf(ADDRESS_TYPES.WARD2) > -1
          ) {
            addObj['ward'] = component.long_name;
            setWard(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.DISTRICT) > -1) {
            addObj['district'] = component.long_name;
            setDistrict(component.long_name);
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.PROVINCE) > -1) {
            addObj['province'] = component.long_name;
            setProvince(component.long_name);
            return;
          }
        }
      });

      setSearch(formatted_address);
      setAddressObj(addObj);
      setPoint({
        lng: geometry.location.lng(),
        lat: geometry.location.lat(),
      });
    } else {
      notification.warning({ message: 'Location not found' });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentLocation && currentLocation.bus_location) {
      const { bus_location } = currentLocation;
      setAddress(bus_location.address);
      // setNumber(bus_location.number);
      setStreet(bus_location.street);
      setWard(bus_location.ward);
      setDistrict(bus_location.district);
      setProvince(bus_location.province);
      setEstimatedTravelTime(currentLocation.estimated_travelling_time);
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
      // number,
      ward,
      district,
      province,
      lng: point.lng,
      lat: point.lat,
      estimated_travelling_time: parseInt(estimatedTravelTime) || 0,
    };

    if (currentLocation) {
      data.id = currentLocation.bus_location.id;
      data.route = currentLocation.bus_route.id;
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
            <Search
              value={search}
              onChange={e => setSearch(e.target.value)}
              // suffix={<Icon type="search" onClick={getSearchPlace} />}
              onSearch={getSearchPlace}
            />
            <sub>Please click search button to get address information</sub>
          </Item>
          <Row gutter={16}>
            <Col span={12}>
              <Item label="Address">
                <Input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
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

            <Col span={12}>
              <Item label="Province">
                <Input
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                />
              </Item>
            </Col>
          </Row>

          <Item label="Time to next destination (0 if this is final position)">
            <Input
              value={estimatedTravelTime}
              onChange={e => setEstimatedTravelTime(e.target.value)}
            />
          </Item>
          <Row type="flex" justify="center">
            <Button
              onClick={handleOnSubmit}
              htmlType="button"
              disabled={
                !currentLocation && !addressObj
                // !(address || street || ward || district || province)
              }
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
