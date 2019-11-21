import React, { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Card, Row, Icon, Steps, Spin } from 'antd';
import { useSelector } from 'react-redux';

const StudentInfomation = lazy(() => import('./StudentInformation'));
const ParentInformation = lazy(() => import('./ParentInfo'));

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

const StudentForm = ({ formSave, updateItem, id, data }) => {
  const [item, setItem] = useState(null);
  const { stage = 0 } = useSelector(state => state.student);

  id = parseInt(id);
  useEffect(() => {
    //getCourses();
    if (id) {
      const found = data.find(item => item.id === id);
      setItem(found);
    }
  }, [item, data, id]);

  return (
    <div>
      <Card title={id ? 'Update Student' : 'Create New Student'}>
        <Steps>
          {steps.map((step, idx) => (
            <Step
              icon={<Icon type={idx < stage ? 'check-circle' : step.icon} />}
              title={step.title}
              status={getStatus(idx, stage)}
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
              <StudentInfomation />
            </Suspense>
          )}
          {stage === 3 && (
            <Suspense fallback={<Spin />}>
              <StudentInfomation />
            </Suspense>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default memo(StudentForm);
