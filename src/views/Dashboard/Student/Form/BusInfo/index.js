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

import { actionCreator } from 'store/student/student.meta';

const getMetaData = async (url, token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    notification.error({ message: `Load fail with url: ${url}` });
  }
};

const Item = Form.Item;

const RouteInfo = memo(({ currentRoute }) => (
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
    </Descriptions>
  </Col>
));

const BusRouteSection = memo(props => {
  const { token } = useSelector(store => store.user);
  const [currentRoute, setCurrentRoute] = useState(false);

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
    }
  };

  const getRoutes = async () => {
    const routesResponse = await getMetaData(
      '/core/api/bus-route/by-type/' + props.type,
      access
    );

    if (routesResponse && routesResponse.data) {
      setRoutes(routesResponse.data.routes);
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
                defaultValue={props.route}
                onChange={val => {
                  props.setRoute && props.setRoute(val);
                  getLocations(val);
                  setCurrentRoute(routes.find(item => item.id === val));
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
                defaultValue={props.location}
                disabled={locations && locations.length === 0}
                onChange={val => props.setLocation && props.setLocation(val)}
              >
                {locations.map(location => (
                  <Select.Option value={location.id} key={location.id}>
                    {location.bus_location && location.bus_location.address}
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

  const handleOnSave = () => {
    if (pickUpLocation && pickUpLocation) {
      dispatch(
        actionCreator.addToLocation({
          student: student.id,
          route: pickUpRoute,
          location: pickUpLocation,
        })
      );
    }

    if (dropOffRoute && dropOffLocation) {
      dispatch(
        actionCreator.addToLocation({
          student: student.id,
          route: dropOffRoute,
          location: dropOffLocation,
        })
      );
    }
  };

  useEffect(() => {
    if (student && student.bus_routes && student.bus_routes.length > 0) {
      const pickup = student.bus_routes.find(
        bus_route => bus_route.route && bus_route.route.route_type === 'P'
      );

      if (pickup) {
        setPickupEnabled(true);
        setPickupRoute(pickup.route.id);
        setPickupLocation(pickup.location.id);
      }
      const dropOff = student.bus_routes.find(
        bus_route => bus_route.route && bus_route.route.route_type === 'D'
      );
      if (dropOff) {
        setDropOffEnable(true);
        setDropOffRoute(dropOff.route.id);
        setDropOffLocation(dropOff.location.id);
      }
    }
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
            />
          </Col>
          <Col
            md={24}
            style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
          >
            <Button onClick={handleOnSave}>Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BusInfo;
