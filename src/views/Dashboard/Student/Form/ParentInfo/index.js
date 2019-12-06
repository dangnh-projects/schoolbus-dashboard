import React, { memo } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Divider,
  Table,
  Input,
  Descriptions,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/student/student.meta';
import ParentForm from './ParentForm';

const { Search } = Input;

const IdSearchBar = memo(props => {
  const dispatch = useDispatch();

  const handleOnSearch = idNumber => {
    dispatch(
      actionCreator.searchParent({
        idNumber,
      })
    );
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="center"
      style={{ alignItems: 'center' }}
    >
      <Col md={10}>Search by ID number:</Col>
      <Col md={12}>
        <Search onSearch={handleOnSearch} />
      </Col>
    </Row>
  );
});

const ParentData = memo(({ parent, siblings, student }) => {
  const dispatch = useDispatch();
  const handleOnNext = () => {
    const data = { id: student.id, parent_id: parent.info };
    dispatch(
      actionCreator.updateStudent({
        data,
        afterSuccess: () => dispatch(actionCreator.changeStage(2)),
      })
    );
  };
  return (
    <Row>
      <Divider orientation="left">Parent</Divider>
      <Descriptions>
        <Descriptions.Item label="Image">
          <img
            src={
              parent.avatar
                ? process.env.REACT_APP_BACKEND_URL + parent.avatar
                : '/images/default-user.png'
            }
            alt="Parent"
            style={{ width: 150, height: 'auto' }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Fullname">
          {parent.first_name} {parent.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="ID number">
          {parent.id_number}
        </Descriptions.Item>
      </Descriptions>
      {siblings && siblings.length > 0 && (
        <div>
          <Divider orientation="left">Sibling</Divider>
          <Table
            columns={[
              { title: 'Student', dataIndex: 'name' },
              { title: 'Class', dataIndex: 'classroom' },
              {
                title: 'School',
                render: (_, record) => record.school && record.school.name,
              },
            ]}
            dataSource={siblings || []}
          />
        </div>
      )}

      <Row type="flex" align="center" style={{ marginTop: 24 }}>
        <Button
          onClick={() => dispatch(actionCreator.changeStage(0))}
          type="primary"
        >
          Back
        </Button>
        <Button onClick={handleOnNext} style={{ marginLeft: 12 }}>
          Save
        </Button>
      </Row>
    </Row>
  );
});

const ParentInfo = props => {
  const { parent, siblings, student, showParentForm } = useSelector(
    state => state.student
  );
  const dispatch = useDispatch();
  return (
    <div>
      <Form style={{ padding: 16 }} layout="horizontal">
        <Row gutter={16}>
          <Row type="flex" gutter={18} style={{ alignItems: 'center' }}>
            <Col md={10}>
              <IdSearchBar />
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <Divider>or</Divider>
            </Col>
            <Col md={10}>
              <Button
                onClick={() => dispatch(actionCreator.setShowParentForm(true))}
              >
                Add new
              </Button>
            </Col>
          </Row>
          {parent && !showParentForm && (
            <Col>
              <ParentData
                parent={parent}
                siblings={siblings}
                student={student}
              />
            </Col>
          )}
          {showParentForm && <ParentForm />}
        </Row>
      </Form>
    </div>
  );
};

export default ParentInfo;
