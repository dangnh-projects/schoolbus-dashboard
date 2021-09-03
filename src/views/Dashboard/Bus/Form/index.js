import React, { useState, useEffect } from 'react';
import { Card, notification } from 'antd';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import BaseForm from 'components/Form';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { BASE_URL } from 'api';
import axios from 'axios';

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

const BusForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);
  const [routes, setRoutes] = useState([]);
  const { token } = useSelector(store => store.user);
  const { access } = token;

  const getBusRoutes = async id => {
    const res = await getMetaData(
      '/core/api/bus/' + id + '/bus_routes',
      access
    );

    if (res.data && res.data.routes) {
      setRoutes(res.data.routes);
      return;
    }
    setRoutes([]);
  };

  const handleSubmit = fields => {
    if (routes && routes.length > 0) {
      let { number_of_seat } = fields;
      number_of_seat = parseInt(number_of_seat);
      const haveRoute = routes.find(
        route => route.students.length > number_of_seat
      );

      if (haveRoute) {
        notification.error({
          message: `The No of Seats cannot be updated to ${number_of_seat}, less than ${haveRoute.students.length} - the number of registered students. Please remove from the assigned route "${haveRoute.name}" first.`,
          duration: 2,
        });
        return;
      }
    }
    fields.start_working_date = fields.start_working_date.format('YYYY-MM-DD');
    if (id) {
      fields.id = id;
      updateItem({
        url: '/core/api/bus/',
        data: fields,
        afterSave: () => navigate('/dashboard/bus'),
      });
    } else {
      formSave({
        url: '/core/api/bus',
        data: fields,
        afterSave: () => navigate('/dashboard/bus'),
      });
    }
  };

  id = parseInt(id);
  useEffect(() => {
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
      getBusRoutes(found.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, data, id]);

  return (
    <Card title={id ? 'Update Bus' : 'Create New Bus'}>
      <BaseForm
        fields={[
          {
            type: 'TEXT',
            label: 'License plate',
            name: 'vehicle_registration_plate',
            rules: [
              {
                required: true,
                message: 'License plate is required',
              },
            ],
            defaultValue: item ? item.vehicle_registration_plate : '',
          },
          {
            type: 'TEXT',
            label: 'Bus number',
            name: 'name',
            rules: [
              {
                required: true,
                message: 'Bus number is required',
              },
              {
                pattern: new RegExp('^[0-9]*$'),
                message: 'Invalid number',
              },
            ],
            defaultValue: item ? item.name : '',
          },
          {
            type: 'TEXT',
            label: 'Transportation brand',
            name: 'brand',
            rules: [
              {
                required: false,
              },
            ],
            defaultValue: item ? item.brand : '',
          },
          {
            type: 'DATE_PICKER',
            label: 'Used from',
            name: 'start_working_date',
            rules: [
              {
                required: true,
                message: 'Used from is required',
              },
            ],
            defaultValue: item ? moment(item.start_working_date) : '',
          },
          {
            type: 'TEXT',
            label: 'No of seat',
            name: 'number_of_seat',
            rules: [
              {
                required: true,
                message: 'No of seat is required',
              },
              {
                pattern: new RegExp('^0*[1-9]\\d*$'),
                message: 'Invalid number and number must be greater than 0',
              },
            ],
            defaultValue: item ? item.number_of_seat : '',
          },
        ]}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};

const mapStateToProps = state => state.dataTable;

const mapDispatchToProps = {
  formSave: actionCreator.formSave,
  updateItem: actionCreator.updateItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusForm);
