import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import BaseForm from 'components/Form';
import { actionCreator } from 'store/dataTable/dataTable.meta';

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
                pattern: new RegExp('^[0-9]*$'),
                message: 'Invalid number',
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
