import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Row,
  Col,
  Divider,
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

const BusRouteSection = memo(props => {
  const { token } = useSelector(store => store.user);
  const [enable, setEnable] = useState(false);
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
  }, []);

  return (
    <Card
      title={props.name}
      bodyStyle={{ padding: 0 }}
      extra={<Checkbox onChange={e => setEnable(e.target.checked)} />}
    >
      {enable && (
        <Row gutter={16} style={{ padding: 24, transition: '0.5s' }}>
          <Col span={24}>
            <Item label="Bus route">
              <Select
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
                disabled={locations && locations.length === 0}
                onChange={val => props.setLocation && props.setLocation(val)}
              >
                {locations.map(location => (
                  <Select.Option value={location.id} key={location.id}>
                    {location.address}
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          {currentRoute && (
            <Col span={24}>
              <Descriptions>
                <Descriptions.Item label="Driver">
                  {currentRoute &&
                    currentRoute.driver &&
                    currentRoute.driver.first_name +
                      ' ' +
                      currentRoute.driver.last_name}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          )}
        </Row>
      )}
    </Card>
  );
});

const BusInfo = props => {
  // const []
  const [pickUpRoute, setPickupRoute] = useState();
  const [pickUpLocation, setPickupLocation] = useState();

  const [dropOffRoute, setDropOffRoute] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();

  const handleOnSave = () => {
    const data = {
      pickUpRoute,
      pickUpLocation,
      dropOffRoute,
      dropOffLocation,
    };
    console.log(data);
  };

  return (
    <div>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Col md={12}>
            <BusRouteSection
              name="Pick up"
              type="P"
              setRoute={setPickupRoute}
              setLocation={setPickupLocation}
            />
          </Col>
          <Col md={12}>
            <BusRouteSection
              name="Drop off"
              type="D"
              setRoute={setDropOffRoute}
              setLocation={setDropOffLocation}
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
