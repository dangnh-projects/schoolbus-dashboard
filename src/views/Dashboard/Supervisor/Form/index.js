import React, { useState, useEffect } from 'react';
import { Card, notification } from 'antd';
//import { navigate } from '@reach/router'
import BaseForm from 'components/Form';
import { connect } from 'react-redux';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { API } from 'api/metaData';

const SupervisorForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);

  const handleSubmit = fields => {
    if (fields.start_time > fields.end_time) {
      notification.error({
        message: 'End time must not be set before start time',
      });
      return;
    }

    fields.start_time = fields.start_time.format('YYYY-MM-DD');
    fields.end_time = fields.end_time.format('YYYY-MM-DD');
  };

  id = parseInt(id);
  useEffect(() => {
    //getCourses();
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
    }
  }, [item, data, id]);

  return (
    <Card title={id ? 'Update Supervisor' : 'Create New Supervisor'}>
      <BaseForm
        fields={[
          {
            type: 'TEXT',
            label: 'First Name',
            name: 'firstname',
            rules: [
              {
                required: true,
                message: 'First name is required',
              },
            ],
          },
          {
            type: 'TEXT',
            label: 'Last Name',
            name: 'lastname',
            rules: [
              {
                required: true,
                message: 'Last name is required',
              },
            ],
          },
          {
            type: 'DATE_PICKER',
            label: 'Birthday',
            name: 'Birthday',
          },
          {
            type: 'TEXT',
            label: 'School',
            name: 'School',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'DATE_PICKER',
            label: 'Bus Registered Date',
            name: 'busregistereddate',
          },
          {
            type: 'TEXT',
            label: 'No',
            name: 'no',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'TEXT',
            label: 'District',
            name: 'district',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'TEXT',
            label: 'Ward',
            name: 'ward',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'CHECKBOX',
            label: 'Status',
            name: 'status',
          },
          {
            type: 'CHECKBOX',
            label: 'To School',
            name: 'toschool',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'CHECKBOX',
            label: 'To Home',
            name: 'tohome',
            rules: [
              {
                required: false,
              },
            ],
          },
          {
            type: 'TEXT',
            label: 'Mobile',
            name: 'mobile',
            rules: [
              {
                required: false,
              },
            ],
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
)(SupervisorForm);
