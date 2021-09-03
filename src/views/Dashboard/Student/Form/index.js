import React, { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Card, Row, Icon, Steps, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/student/student.meta';

const StudentInfomation = lazy(() => import('./StudentInformation'));
const ParentInformation = lazy(() => import('./ParentInfo'));
const BusInformation = lazy(() => import('./BusInfo'));

const { Step } = Steps;

const getStatus = (step, current = 0) => {
  if (step < current) {
    return 'done';
  }

  if (step === current) {
    return 'process';
  }

  return 'wait';
};

const steps = [
  {
    icon: 'info-circle',
    title: 'Student Information',
  },
  {
    icon: 'user',
    title: 'Parent information',
  },
  {
    icon: 'car',
    title: 'Bus information',
  },
  {
    icon: 'circle-check',
    title: 'Done',
  },
];

const StudentForm = ({ formSave, updateItem, id }) => {
  const [item, setItem] = useState(null);
  const { stage = 0 } = useSelector(state => state.student);
  const { data = [] } = useSelector(state => state.dataTable);
  const dispatch = useDispatch();

  id = parseInt(id);
  useEffect(() => {
    //getCourses();
    dispatch(actionCreator.changeStage(0));

    if (id) {
      const found = data.find(item => item.id === id);
      if (found) {
        setItem(found);
        dispatch(actionCreator.postStudentSuccess(found));
        dispatch(actionCreator.getContact({ id }));

        if (found && found.parent) {
          dispatch(actionCreator.postParentSuccess(found.parent));

          dispatch(actionCreator.setSibling(found.parent.children || []));
          dispatch(actionCreator.setShowParentForm(false));
        } else {
          dispatch(actionCreator.postParentSuccess(null));
          dispatch(actionCreator.setSibling([]));
          dispatch(actionCreator.setShowParentForm(true));
        }
      } else {
        dispatch(actionCreator.postParentSuccess(null));
        dispatch(actionCreator.postStudentSuccess(null));
        dispatch(actionCreator.setShowParentForm(true));
      }
    } else {
      dispatch(actionCreator.postParentSuccess(null));
      dispatch(actionCreator.postStudentSuccess(null));
      dispatch(actionCreator.setShowParentForm(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, data, id]);

  return (
    <div>
      <Card title={id ? 'Update Student' : 'Create New Student'}>
        <Steps>
          {steps.map((step, idx) => (
            <Step
              onClick={() => item && dispatch(actionCreator.changeStage(idx))}
              icon={<Icon type={idx < stage ? 'check-circle' : step.icon} />}
              title={step.title}
              status={getStatus(idx, stage)}
              style={{ cursor: 'pointer' }}
              key={idx}
            />
          ))}
        </Steps>
        <Row style={{ padding: 12 }}>
          {stage === 0 && (
            <Suspense fallback={<Spin />}>
              <StudentInfomation />
            </Suspense>
          )}
          {stage === 1 && (
            <Suspense fallback={<Spin />}>
              <ParentInformation />
            </Suspense>
          )}
          {stage === 2 && (
            <Suspense fallback={<Spin />}>
              <BusInformation />
            </Suspense>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default memo(StudentForm);
