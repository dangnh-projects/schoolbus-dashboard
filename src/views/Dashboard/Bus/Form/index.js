import React, { useState, useEffect } from 'react';
import { Card, notification } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import BaseForm from 'components/Form';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { API } from 'api/metaData';

const BusForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);

  const handleSubmit = fields => {
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
    }
  }, [item, data, id]);

  console.log(item);

  return (
    <Card title={id ? 'Update Bus' : 'Create New Bus'}>
      <BaseForm
        fields={[
          {
            type: 'TEXT',
            label: 'License Plate',
            name: 'vehicle_registration_plate',
            rules: [
              {
                required: true,
                message: 'Name is required',
              },
            ],
            defaultValue: item ? item.vehicle_registration_plate : '',
          },
          {
            type: 'TEXT',
            label: 'Bus Number',
            name: 'number',
            rules: [
              {
                required: true,
                message: 'Number is required',
              },
            ],
            defaultValue: item ? item.number : '',
          },
          {
            type: 'TEXT',
            label: 'Route Name',
            name: 'name',
            rules: [
              {
                required: true,
                message: 'Number is required',
              },
            ],
            defaultValue: item ? item.number : '',
          },
          {
            type: 'TEXT',
            label: 'Transportation Brand',
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
            label: 'Start Working Day',
            name: 'start_working_date',
            rules: [
              {
                required: true,
                message: 'Start working day is required',
              },
            ],
            defaultValue: item ? moment(item.start_working_date) : '',
          },
          {
            type: 'TEXT',
            label: 'No of Seat',
            name: 'number_of_seat',
            rules: [
              {
                required: true,
                message: 'No of seat is required',
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
