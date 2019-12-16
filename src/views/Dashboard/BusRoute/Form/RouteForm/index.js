import React, { useState, useEffect } from 'react';
import {
  Col,
  Form,
  Select,
  Input,
  TimePicker,
  Row,
  Button,
  notification,
  Modal,
} from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import axios from 'axios';
import { actionCreator } from 'store/busRoute/busRoute.meta';
const FormItem = Form.Item;
const Option = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const getMetaData = async (url, token) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + url + '?records_per_page=1000',
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

const RouteForm = ({ form }) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  const { token } = useSelector(store => store.user);
  const { route } = useSelector(store => store.busRoute);

  const [buses, setBuses] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [name, setName] = useState('');
  const [bus, setBus] = useState('');
  const [driver, setDriver] = useState('');
  const [busSupervisor, setBusSupervisor] = useState('');

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [type, setType] = useState('P');

  /*
    For validation
  */

  const [busRoutes, setBusRoutes] = useState([]);
  const [supervisorRoutes, setSupervisorRoutes] = useState([]);
  const [driverRoutes, setDriverRoutes] = useState([]);

  const { access } = token;
  if (!token) {
    navigate('/login');
  }
  const getMeta = async () => {
    const [busRes, supervisorRes, driverRes] = await Promise.all([
      getMetaData('/core/api/bus', access),
      getMetaData('/core/api/supervisor', access),
      getMetaData('/core/api/driver', access),
    ]);

    setBuses(busRes && busRes.data ? busRes.data.results : []);
    setSupervisors(
      supervisorRes && supervisorRes.data ? supervisorRes.data.results : []
    );
    setDrivers(driverRes && driverRes.data ? driverRes.data.results : []);
  };
  useEffect(() => {
    getMeta();
    // dispatch(actionCreator.getRouteLocations());
    if (route) {
      setName(route.name);
      setBusSupervisor(route.bus_supervisor.id);
      setDriver(route.driver.id);
      setBus(route.bus.id);
      setStartTime(
        route.estimated_start_time
          ? moment(route.estimated_start_time, 'HH:mm:ss')
          : moment()
      );

      setEndTime(
        route.estimated_end_time
          ? moment(route.estimated_end_time, 'HH:mm:ss')
          : moment()
      );
      setType(route.route_type);
    } else {
      setName('');
      setBusSupervisor('');
      setDriver('');
      setBus('');
      setStartTime('');
      setEndTime('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const checkBus = () => {
    // check type
    // const typedRoute = busRoutes.find();

    // return false;
    return true;
  };

  const checkSupervisor = () => {
    if (supervisorRoutes && supervisorRoutes.length > 0) {
      // check sameType

      const supervisorObj = supervisors.find(sup => sup.id === busSupervisor);

      const sameRoutes = supervisorRoutes.filter(
        route => route.route_type === type
      );

      if (sameRoutes && sameRoutes.length > 0) {
        Modal.error({
          width: 800,
          content: (
            <div>
              Supervisor{' '}
              <b>
                {supervisorObj &&
                  supervisorObj.first_name + ' ' + supervisorObj.last_name}{' '}
              </b>
              has already been assigned for another route(s):
              <ul style={{ marginTop: 12 }}>
                {sameRoutes.map(route => (
                  <li key={route.id}>
                    <b>{route.route_type === 'P' ? 'Pick-up' : 'Drop-off'}</b>
                    {` ${route.name} - ${moment(
                      route.estimated_start_time,
                      'HH:mm:ss'
                    ).format('HH:mm')} - ${moment(
                      route.estimated_end_time,
                      'HH:mm:ss'
                    ).format('HH:mm')}`}
                  </li>
                ))}
              </ul>
            </div>
          ),
        });

        return false;
      }

      const overlapsedRoute = supervisorRoutes.find(route => {
        const timePlanStart = route.estimated_start_time
          ? moment(route.estimated_start_time, 'HH:mm:ss')
          : moment();

        const timePlanEnd = route.estimated_end_time
          ? moment(route.estimated_end_time, 'HH:mm:ss')
          : moment();
        // start is between
        return (
          startTime.isBetween(timePlanStart, timePlanEnd) ||
          endTime.isBetween(timePlanStart, timePlanEnd)
        );
      });

      if (overlapsedRoute) {
        Modal.error({
          width: 800,
          content: (
            <div>
              Supervisor{' '}
              <b>
                {supervisorObj &&
                  supervisorObj.first_name + ' ' + supervisorObj.last_name}{' '}
              </b>
              have time overlapsed with another route(s):
              <div>
                <b>
                  {overlapsedRoute.route_type === 'P' ? 'Pick-up' : 'Drop-off'}
                </b>
                {` ${overlapsedRoute.name} - ${moment(
                  overlapsedRoute.estimated_start_time,
                  'HH:mm:ss'
                ).format('HH:mm')} - ${moment(
                  overlapsedRoute.estimated_end_time,
                  'HH:mm:ss'
                ).format('HH:mm')}`}
              </div>
            </div>
          ),
        });
        return false;
      }
    }

    return true;
  };

  const checkDriver = () => {
    const driverObj = drivers.find(i => i.id === driver);

    if (driverRoutes && driverRoutes.length > 0) {
      // check sameType

      const sameRoutes = driverRoutes.filter(
        route => route.route_type === type
      );

      if (sameRoutes && sameRoutes.length > 0) {
        Modal.error({
          width: 800,
          content: (
            <div>
              Driver <b>{driverObj && driverObj.name}</b> has already been
              assigned for another route
              <ul>
                {sameRoutes.map(route => (
                  <li key={route.id}>
                    <b>{route.route_type === 'P' ? 'Pick-up' : 'Drop-off'}</b>
                    {` ${route.name} - ${moment(
                      route.estimated_start_time,
                      'HH:mm:ss'
                    ).format('HH:mm')} - ${moment(
                      route.estimated_end_time,
                      'HH:mm:ss'
                    ).format('HH:mm')}`}
                  </li>
                ))}
              </ul>
            </div>
          ),
        });

        return false;
      }

      const overlapsedRoute = driverRoutes.find(route => {
        const timePlanStart = route.estimated_start_time
          ? moment(route.estimated_start_time, 'HH:mm:ss')
          : moment();

        const timePlanEnd = route.estimated_end_time
          ? moment(route.estimated_end_time, 'HH:mm:ss')
          : moment();
        // start is between
        return (
          startTime.isBetween(timePlanStart, timePlanEnd) ||
          endTime.isBetween(timePlanStart, timePlanEnd)
        );
      });

      if (overlapsedRoute) {
        Modal.error({
          width: 800,
          content: (
            <div>
              Driver <b>{driverObj && driverObj.name} </b>
              have time overlapsed with another route(s):
              <div>
                <b>
                  {overlapsedRoute.route_type === 'P' ? 'Pick-up' : 'Drop-off'}
                </b>
                {` ${overlapsedRoute.name} - ${moment(
                  overlapsedRoute.estimated_start_time,
                  'HH:mm:ss'
                ).format('HH:mm')} - ${moment(
                  overlapsedRoute.estimated_end_time,
                  'HH:mm:ss'
                ).format('HH:mm')}`}
              </div>
            </div>
          ),
        });
        return false;
      }
    }
    return true;
  };

  const saveBusInfo = () => {
    // validate Bus

    if (startTime >= endTime) {
      notification.warning({ message: 'Start time must be before end time' });
      return;
    }

    if (!route) {
      const data = {
        route_type: type,
        name,
        bus,
        bus_supervisor: busSupervisor,
        driver,
        estimated_start_time: startTime.format
          ? startTime.format('HH:mm')
          : moment().format('HH:mm'),
        estimated_end_time: endTime.format
          ? endTime.format('HH:mm')
          : moment().format('HH:mm'),
      };

      dispatch(actionCreator.postRoute(data));
    } else {
      const data = {
        route_type: type,
        name,
        bus_id: bus,
        bus_supervisor_id: busSupervisor,
        driver_id: driver,
        estimated_start_time: startTime.format
          ? startTime.format('HH:mm')
          : moment().format('HH:mm'),
        estimated_end_time: endTime.format
          ? endTime.format('HH:mm')
          : moment().format('HH:mm'),
      };

      data.id = route.id;

      dispatch(actionCreator.updateRoute(data));
    }
  };

  const handleSubmitCheck = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        if (!checkBus() || !checkSupervisor() || !checkDriver()) {
          return;
        }
        saveBusInfo && saveBusInfo(fieldsValue);
      }
    });
  };

  const getBusRoutes = async id => {
    const res = await getMetaData(
      '/core/api/bus/' + id + '/bus_routes',
      access
    );

    if (res.data && res.data.routes) {
      setBusRoutes(res.data.routes);
      return;
    }
    setBusRoutes([]);
  };

  const getSupervisorRoutes = async id => {
    const res = await getMetaData(
      '/core/api/supervisor/' + id + '/bus_routes',
      access
    );

    if (res.data && res.data.routes) {
      setSupervisorRoutes(res.data.routes);
      return;
    }
    setSupervisorRoutes([]);
  };

  const getDriverRoutes = async id => {
    const res = await getMetaData(
      '/core/api/driver/' + id + '/bus_routes',
      access
    );

    if (res.data && res.data.routes) {
      setDriverRoutes(res.data.routes);
      return;
    }
    setDriverRoutes([]);
  };

  return (
    <Col>
      <Form {...formItemLayout} onSubmit={handleSubmitCheck}>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              {
                required: true,
                message: 'Name is required',
              },
            ],
          })(<Input onChange={e => setName(e.target.value)} />)}
        </FormItem>
        <FormItem label="Type">
          <Select
            value={type}
            onChange={val => setType(val)}
            style={{ minWidth: 200 }}
          >
            <Option value="P">Pick-up</Option>
            <Option value="D">Drop-off</Option>
          </Select>
        </FormItem>

        <FormItem label="Planned start time">
          {getFieldDecorator('start_name', {
            initialValue: startTime,
            rules: [
              {
                required: true,
                message: 'Start time is required',
              },
            ],
          })(
            <TimePicker
              format="HH:mm"
              minuteStep={5}
              onChange={val => setStartTime(val)}
            />
          )}
        </FormItem>
        <FormItem label="Planned end time">
          {getFieldDecorator('end_name', {
            initialValue: endTime,
            rules: [
              {
                required: true,
                message: 'End time is required',
              },
            ],
          })(
            <TimePicker
              format="HH:mm"
              minuteStep={5}
              onChange={val => setEndTime(val)}
            />
          )}
        </FormItem>
        <FormItem label="Bus">
          {getFieldDecorator('bus', {
            initialValue: bus,
            rules: [
              {
                required: true,
                message: 'Bus is required',
              },
            ],
          })(
            <Select
              style={{ minWidth: 200 }}
              onChange={val => {
                getBusRoutes(val);
                setBus(val);
              }}
            >
              {buses &&
                buses.map(bus => (
                  <Option key={bus.id} value={bus.id}>
                    {bus.number}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Supervisor">
          {getFieldDecorator('busSupervisor', {
            initialValue: busSupervisor,
            rules: [
              {
                required: true,
                message: 'Bus supervisor is required',
              },
            ],
          })(
            <Select
              // defaultValue={
              //   // supervisors && supervisors.length > 0 && supervisors[0].id
              // }
              style={{ minWidth: 200 }}
              onChange={val => {
                getSupervisorRoutes(val);
                setBusSupervisor(val);
              }}
            >
              {supervisors &&
                supervisors.map(supervisor => (
                  <Option key={supervisor.id} value={supervisor.id}>
                    {supervisor.first_name + ' ' + supervisor.last_name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Driver">
          {getFieldDecorator('driver', {
            initialValue: driver,
            rules: [
              {
                required: true,
                message: 'Driver is required',
              },
            ],
          })(
            <Select
              // defaultValue={drivers && drivers.length > 0 && drivers[0].id}
              style={{ minWidth: 200 }}
              onChange={val => {
                getDriverRoutes(val);
                setDriver(val);
              }}
            >
              {drivers &&
                drivers.map(driver => (
                  <Option key={driver.id} value={driver.id}>
                    {driver.name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        <Row type="flex" justify="center">
          <Button htmlType="submit">Save</Button>
        </Row>
      </Form>
    </Col>
  );
};

const WrappedRouteForm = Form.create({ name: 'RouteForm' })(RouteForm);

export default WrappedRouteForm;
