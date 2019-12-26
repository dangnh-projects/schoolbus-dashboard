import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  notification,
  Card,
  Select,
  Checkbox,
  Descriptions,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import axios from 'axios';
import { BASE_URL } from 'api';

import { actionCreator } from 'store/student/student.meta';

const getMetaData = async (url, token) => {
  try {
    const response = await axios.get(
      BASE_URL + url + '?records_per_page=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    notification.error({ message: `Load fail with url: ${url}` });
  }
};

const Item = Form.Item;

const RouteInfo = memo(({ currentRoute }) => {
  const remaining =
    currentRoute &&
    currentRoute.bus &&
    currentRoute.bus.number_of_seat - currentRoute.students.length;
  return (
    <Col span={24}>
      <Descriptions column={1} title="Route information" bordered size="small">
        <Descriptions.Item label="Bus">
          {currentRoute &&
            currentRoute.bus &&
            currentRoute.bus.vehicle_registration_plate}
        </Descriptions.Item>
        <Descriptions.Item label="Driver">
          {currentRoute && currentRoute.driver && currentRoute.driver.name}
        </Descriptions.Item>
        <Descriptions.Item label="Supervisor">
          {currentRoute &&
            currentRoute.bus_supervisor &&
            currentRoute.bus_supervisor.first_name +
              ' ' +
              currentRoute.bus_supervisor.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="Number of seats">
          {currentRoute && currentRoute.bus && currentRoute.bus.number_of_seat}
        </Descriptions.Item>
        <Descriptions.Item label="Number remaining">
          <div style={{ color: (!remaining || remaining === 0) && 'red' }}>
            {remaining}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Col>
  );
});

const BusRouteSection = memo(props => {
  const { token } = useSelector(store => store.user);
  const [currentRoute, setCurrentRoute] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { originalRoute, setCanSubmit } = props;

  const { access } = token;
  if (!token) {
    navigate('/login');
  }

  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);

  const getLocations = async route => {
    const locationRes = await getMetaData(
      `/core/api/bus-route/${route}/locations`,
      access
    );

    if (locationRes && locationRes.data) {
      setLocations(locationRes.data);
      if (props.location) {
        const found = locationRes.data.find(
          loc => loc.bus_location && loc.bus_location.id === props.location
        );

        if (found) {
          setCurrentLocation(found.bus_location.id);
          props.setLocation(found.bus_location.id);
        } else {
          if (locationRes.data.length > 0) {
            setCurrentLocation(locationRes.data[0].bus_location.id);
            props.setLocation(locationRes.data[0].bus_location.id);
          } else {
            setCurrentLocation(null);
            props.setLocation(null);
          }
        }
      }
    }
  };

  const getRoutes = async () => {
    const routesResponse = await getMetaData(
      '/core/api/bus-route/by-type/' + props.type,
      access
    );

    if (routesResponse && routesResponse.data) {
      setRoutes(routesResponse.data.routes);
      if (props.route) {
        const found = routesResponse.data.routes.find(
          item => item.id === props.route
        );
        if (found) {
          setCurrentRoute(found);
        } else {
          setCurrentRoute(
            routesResponse.data.routes.length > 0
              ? routesResponse.data.routes[0]
              : ''
          );
        }
      }
    }
  };

  useEffect(() => {
    getRoutes();
    if (props.route) {
      getLocations(props.route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route]);

  return (
    <Card
      title={props.name}
      bodyStyle={{ padding: 0 }}
      extra={
        <Checkbox
          onChange={e => props.toggleEnable(e.target.checked)}
          checked={props.enable}
        />
      }
    >
      {props.enable && (
        <Row gutter={16} style={{ padding: 24, transition: '0.5s' }}>
          <Col span={24}>
            <Item label="Bus route">
              <Select
                value={currentRoute.id}
                onChange={val => {
                  props.setRoute && props.setRoute(val);
                  getLocations(val);
                  const selectedRoute = routes.find(item => item.id === val);

                  setCurrentRoute(selectedRoute);
                  setCanSubmit(true);
                  if (
                    originalRoute &&
                    originalRoute.route &&
                    originalRoute.route.id === selectedRoute.id
                  ) {
                    return;
                  }

                  const remain =
                    selectedRoute &&
                    selectedRoute.bus &&
                    selectedRoute.bus.number_of_seat -
                      selectedRoute.students.length;
                  if (remain === 0) {
                    notification.error({
                      message:
                        'This bus route has reached limit seat, please choose another route',
                    });
                    setCanSubmit(false);
                  }
                  props.setLocation(null);
                }}
              >
                {routes.map(route => (
                  <Select.Option value={route.id} key={route.id}>
                    {route.name}
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item label="Locations">
              <Select
                value={currentLocation}
                disabled={locations && locations.length === 0}
                onChange={val => {
                  props.setLocation && props.setLocation(val);
                  setCurrentLocation(val);
                }}
              >
                {locations.map(location => (
                  <Select.Option
                    value={location.bus_location.id}
                    key={location.bus_location.id}
                  >
                    {location.bus_location &&
                      `${location.bus_location.address} ${
                        location.bus_location.street
                      } ${location.bus_location.ward !== '' &&
                        'phường ' + location.bus_location.ward} ${
                        location.bus_location.district
                      }`}
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          {currentRoute && <RouteInfo currentRoute={currentRoute} />}
        </Row>
      )}
    </Card>
  );
});

const BusInfo = props => {
  const dispatch = useDispatch();
  const { student } = useSelector(store => store.student);

  const [pickupEnabled, setPickupEnabled] = useState(false);
  const [pickUpRoute, setPickupRoute] = useState();
  const [pickUpLocation, setPickupLocation] = useState();

  const [dropOffEnable, setDropOffEnable] = useState(false);
  const [dropOffRoute, setDropOffRoute] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();

  const [originalPickup, setOriginalPickup] = useState();
  const [originalDropOff, setOriginalDropOff] = useState();

  const [canSubmit, setCanSubmit] = useState(true);

  const handleOnSave = () => {
    if (pickupEnabled) {
      if (pickUpRoute && pickUpLocation) {
        dispatch(
          actionCreator.addToLocation({
            student: student.id,
            route: pickUpRoute,
            location: pickUpLocation,
          })
        );
      }
    } else {
      if (originalPickup) {
        // remove original
        dispatch(
          actionCreator.addToLocation({
            student: student.id,
            route: -1,
            location: originalPickup && originalPickup.location.id,
          })
        );
      }
    }

    if (dropOffEnable) {
      if (dropOffRoute && dropOffLocation) {
        dispatch(
          actionCreator.addToLocation({
            student: student.id,
            route: dropOffRoute,
            location: dropOffLocation,
          })
        );
      }
    } else {
      if (originalDropOff) {
        // remove original
        dispatch(
          actionCreator.addToLocation({
            student: student.id,
            route: -1,
            location: originalDropOff && originalDropOff.location.id,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (student && student.bus_routes && student.bus_routes.length > 0) {
      const pickup = student.bus_routes.find(
        bus_route => bus_route.route && bus_route.route.route_type === 'P'
      );

      if (pickup) {
        setOriginalPickup(pickup);
        setPickupEnabled(true);
        setPickupRoute(pickup.route.id);
        setPickupLocation(pickup.location.id);
      }

      const dropOff = student.bus_routes.find(
        bus_route => bus_route.route && bus_route.route.route_type === 'D'
      );
      if (dropOff) {
        setOriginalDropOff(dropOff);
        setDropOffEnable(true);
        setDropOffRoute(dropOff.route.id);
        setDropOffLocation(dropOff.location.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Col md={12}>
            <BusRouteSection
              name="Pick up"
              type="P"
              route={pickUpRoute}
              location={pickUpLocation}
              setRoute={setPickupRoute}
              setLocation={setPickupLocation}
              enable={pickupEnabled}
              toggleEnable={setPickupEnabled}
              originalRoute={originalPickup}
              setCanSubmit={setCanSubmit}
            />
          </Col>
          <Col md={12}>
            <BusRouteSection
              name="Drop off"
              type="D"
              route={dropOffRoute}
              location={dropOffLocation}
              setRoute={setDropOffRoute}
              setLocation={setDropOffLocation}
              enable={dropOffEnable}
              toggleEnable={setDropOffEnable}
              originalRoute={originalDropOff}
              setCanSubmit={setCanSubmit}
            />
          </Col>
          <Col
            md={24}
            style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
          >
            <Button disabled={!canSubmit} onClick={handleOnSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BusInfo;
