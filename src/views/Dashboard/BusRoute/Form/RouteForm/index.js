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

  const saveBusInfo = () => {
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
        saveBusInfo && saveBusInfo(fieldsValue);
      }
    });
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
              value={startTime}
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
              value={endTime}
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
            <Select style={{ minWidth: 200 }} onChange={val => setBus(val)}>
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
