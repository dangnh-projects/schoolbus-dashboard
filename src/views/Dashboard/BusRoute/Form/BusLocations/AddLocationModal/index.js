import React, { useState } from 'react';
import { Icon, Modal, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/busRoute/busRoute.meta';

const Item = Form.Item;

const ADDRESS_TYPES = {
  STREET_NUMBER: 'street_number',
  ROUTE: 'route',
  WARD: 'sublocality_level_1',
  DISTRICT: 'administrative_area_level_2',
};

const MapRouteModal = ({
  visible = false,
  setShowAddRoutePosition,
  map,
  handleAddPoint,
}) => {
  const dispatch = useDispatch();
  const busRoute = useSelector(state => state.busRoute);
  const { route, locations = [] } = busRoute;
  // if (!route) {
  //   setShowAddRoutePosition(false);
  //   hand
  // }
  const [address, setAddress] = useState('');
  const [addressObj, setAddressObj] = useState(null);
  const [timeNextLoc, setTimeNextLoc] = useState(0);
  const [point, setPoint] = useState(null);

  const getSearchPlace = async () => {
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

      address_components.forEach(component => {
        if (component && component.types && component.types.length > 0) {
          if (component.types.indexOf(ADDRESS_TYPES.STREET_NUMBER) > -1) {
            addObj['number'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.ROUTE) > -1) {
            addObj['street'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.WARD) > -1) {
            addObj['ward'] = component.long_name;
            return;
          }

          if (component.types.indexOf(ADDRESS_TYPES.DISTRICT) > -1) {
            addObj['district'] = component.long_name;
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
  };

  const handleOnSubmit = async () => {
    const data = {
      address,
      street: addressObj.street,
      ward: addressObj.ward,
      district: addressObj.district,
      lng: point.lng,
      lat: point.lat,
      time_to_next_location: timeNextLoc || 0,
    };

    if (locations.length === 0) {
      data.route = route.id;
    } else {
      data.previous_location = locations[locations.length - 1].id;
    }

    dispatch(actionCreator.postRouteLocation(data));

    // await handleAddPoint(
    //   Object.assign({}, point, addressObj, { address, name })
    // );
    // setShowAddRoutePosition(false);
  };
  return (
    <Modal
      visible={visible}
      onCancel={() => setShowAddRoutePosition(false)}
      onOk={handleOnSubmit}
    >
      <Form>
        <Item label="Address">
          <Input
            value={address}
            onChange={e => setAddress(e.target.value)}
            suffix={<Icon type="search" onClick={getSearchPlace} />}
          />
        </Item>
        <Item label="Time to next destination (0 if this is final position)">
          <Input onChange={e => setTimeNextLoc(e.target.value)} />
        </Item>
      </Form>
    </Modal>
  );
};

export default MapRouteModal;
