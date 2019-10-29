import React, { useState, useEffect } from 'react';
import { Card, notification } from 'antd';
//import moment from 'moment';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import BaseForm from 'components/Form';
import { actionCreator } from 'store/dataTable/dataTable.meta';
import { API } from 'api/metaData';

const BatchForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const { body } = await API.getCourse();
    setCourses(body.results);
  };

  const handleSubmit = fields => {
    if (fields.start_time > fields.end_time) {
      notification.error({
        message: 'End time must not be set before start time',
      });
      return;
    }

    fields.start_time = fields.start_time.format('YYYY-MM-DD');
    fields.end_time = fields.end_time.format('YYYY-MM-DD');
    if (id) {
      fields.id = id;
      updateItem({
        url: '/r/batches/',
        data: fields,
        afterSave: () => navigate('/dashboard/batch'),
      });
    } else {
      formSave({
        url: '/r/batches/',
        data: fields,
        afterSave: () => navigate('/dashboard/batch'),
      });
    }
  };
  id = parseInt(id);
  useEffect(() => {
    getCourses();
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
    }
  }, [item, data, id]);

  return (
    <Card title={id ? 'Update Driver' : 'Create New Driver'}>
      <BaseForm
        fields={[
          {
            type: 'TEXT',
            label: 'Code',
            name: 'code',
            rules: [
              {
                required: true,
                message: 'Code is required',
              },
            ],
            defaultValue: item ? item.name : '',
          },
          {
            type: 'TEXT',
            label: 'Full name',
            name: 'fullname',
            rules: [
              {
                required: true,
                message: 'Name is required',
              },
            ],
            defaultValue: item ? item.code : '',
          },
          {
            type: 'SELECT',
            label: 'License plate',
            name: 'license_plate',
            options: courses.map(course => ({
              value: course.id,
              title: course.name,
            })),
            defaultValue: item
              ? item.course_id
              : courses.length > 0 && courses[0].id,
          },

          {
            type: 'SELECT',
            label: 'Permission',
            name: 'permission',
            options: courses.map(course => ({
              value: course.id,
              title: course.name,
            })),
            defaultValue: item
              ? item.course_id
              : courses.length > 0 && courses[0].id,
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
)(BatchForm);
