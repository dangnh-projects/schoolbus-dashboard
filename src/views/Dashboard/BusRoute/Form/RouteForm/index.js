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
} from 'antd';
import moment from 'moment';
import { useSelector, useDispatch, connect } from 'react-redux';
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

const RouteForm = props => {
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

  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());

  const [type, setType] = useState('P');

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

    setBuses(busRes ? busRes.data : []);
    setSupervisors(supervisorRes ? supervisorRes.data : []);
    setDrivers(driverRes ? driverRes.data : []);
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
        route.start_time ? moment(route.start_time, 'HH:mm:ss') : moment()
      );

      setEndTime(
        route.end_time ? moment(route.end_time, 'HH:mm:ss') : moment()
      );
      setType(route.route_type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const saveBusInfo = () => {
    console.log(startTime);
    console.log(
      startTime ? startTime.format('HH:mm') : moment().format('HH:mm')
    );

    if (!route) {
      const data = {
        route_type: type,
        name,
        bus,
        bus_supervisor: busSupervisor,
        driver,
        start_time: startTime.format
          ? startTime.format('HH:mm')
          : moment().format('HH:mm'),
        end_time: endTime.format
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
        start_time: startTime.format
          ? startTime.format('HH:mm')
          : moment().format('HH:mm'),
        end_time: endTime.format
          ? endTime.format('HH:mm')
          : moment().format('HH:mm'),
      };

      data.id = route.id;

      dispatch(actionCreator.updateRoute(data));
    }
  };

  return (
    <Col>
      <Form {...formItemLayout}>
        <FormItem label="Name">
          <Input value={name} onChange={e => setName(e.target.value)} />
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

        <FormItem label="Start time">
          <TimePicker
            value={startTime}
            format="HH:mm"
            minuteStep={5}
            onChange={val => setStartTime(val)}
          />
        </FormItem>
        <FormItem label="End time">
          <TimePicker
            value={endTime}
            format="HH:mm"
            minuteStep={5}
            onChange={val => setEndTime(val)}
          />
        </FormItem>
        <FormItem label="Bus">
          <Select
            value={bus}
            style={{ minWidth: 200 }}
            onChange={val => setBus(val)}
          >
            {buses &&
              buses.map(bus => (
                <Option key={bus.id} value={bus.id}>
                  {bus.number}
                </Option>
              ))}
          </Select>
        </FormItem>
        <FormItem label="Supervisor">
          <Select
            value={busSupervisor}
            defaultValue={
              supervisors && supervisors.length > 0 && supervisors[0].id
            }
            style={{ minWidth: 200 }}
            onChange={val => setBusSupervisor(val)}
          >
            {supervisors &&
              supervisors.map(supervisor => (
                <Option key={supervisor.id} value={supervisor.id}>
                  {supervisor.first_name + ' ' + supervisor.last_name}
                </Option>
              ))}
          </Select>
        </FormItem>
        <FormItem label="Driver">
          <Select
            value={driver}
            defaultValue={drivers && drivers.length > 0 && drivers[0].id}
            style={{ minWidth: 200 }}
            onChange={val => setDriver(val)}
          >
            {drivers &&
              drivers.map(driver => (
                <Option key={driver.id} value={driver.id}>
                  {driver.name}
                </Option>
              ))}
          </Select>
        </FormItem>
        <Row type="flex" justify="center">
          <Button onClick={saveBusInfo}>Save</Button>
        </Row>
      </Form>
    </Col>
  );
};

export default RouteForm;
