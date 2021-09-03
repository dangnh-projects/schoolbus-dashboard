import React, { memo, useState, useEffect, Fragment } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Divider,
  Table,
  Input,
  Descriptions,
  Icon,
  Modal,
  Popconfirm,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'store/student/student.meta';
import ParentForm from './ParentForm';
import { BASE_URL } from 'api';
import StudentContact from './StudentContactModal';

const { Search } = Input;

const IdSearchBar = memo(() => {
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
      align="middle"
      style={{ alignItems: 'center' }}
    >
      <Col md={10}>Search by ID number:</Col>
      <Col md={12}>
        <Search onSearch={handleOnSearch} />
      </Col>
    </Row>
  );
});

const ParentData = memo(({ parent, siblings, student, contactList }) => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [contactId, setContactId] = useState(null);
  const contacts_data = contactList.data.contacts || [];

  const handleOnNext = () => {
    const data = { id: student.id, parent_id: parent.info };
    dispatch(
      actionCreator.updateStudent({
        data,
        afterSuccess: () => dispatch(actionCreator.changeStage(2)),
      })
    );
  };

  const editContact = props => {
    setContactId(props.id);
    setVisible(true);
  };

  const addContact = () => {
    setContactId(null);
    setVisible(true);
  };

  const columns_contacts = [
    { title: 'Full name', dataIndex: 'name', key: 'name' },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    { title: 'Phone number', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) => {
        return (
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => editContact(record)}
            >
              <Icon type="form" />
            </Button>
            <Popconfirm
              placement="top"
              title={'Delete row?'}
              onConfirm={() => {
                dispatch(
                  actionCreator.removeContact({
                    id: `${record.id}`,
                    afterDelete: () =>
                      dispatch(
                        actionCreator.getContact({
                          id: `${student.id}`,
                        })
                      ),
                  })
                );
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </Row>
        );
      },
    },
  ];

  return (
    <Row>
      <Divider orientation="left">Parent</Divider>
      <Descriptions column={4}>
        <Descriptions.Item label="Image">
          <img
            src={
              parent.avatar
                ? BASE_URL + parent.avatar
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
        <Descriptions.Item>
          <Button
            type="danger"
            onClick={() => {
              Modal.error({
                maskClosable: true,
                onOk: () => {
                  const data = { id: student.id, parent_id: -1 };
                  dispatch(
                    actionCreator.updateStudent({
                      data,
                      afterSuccess: () => {
                        dispatch(actionCreator.searchParentSuccess(null));
                        dispatch(actionCreator.setSibling([]));
                        dispatch(actionCreator.setShowParentForm(true));
                      },
                    })
                  );
                },
                content: 'Are you sure? This action cannot be rolled back',
              });
            }}
          >
            <Icon type="delete" />
          </Button>
        </Descriptions.Item>
      </Descriptions>
      {siblings && siblings.length > 0 && (
        <Fragment>
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
        </Fragment>
      )}
      {columns_contacts && columns_contacts.length > 0 && (
        <Fragment>
          <Row type="flex" gutter={16} style={{ alignItems: 'center' }}>
            <Col md={16}>
              <Divider orientation="left">Student Contact Information</Divider>
            </Col>
            <Col md={4} style={{ textAlign: 'center' }}>
              <Button onClick={addContact}>Add contact</Button>
            </Col>
            <Col md={4}>
              <Divider />
            </Col>
            <Col md={24} style={{ marginTop: '10px' }}>
              <Table columns={columns_contacts} dataSource={contacts_data} />
            </Col>
          </Row>
          <StudentContact
            isVisible={isVisible}
            setVisible={setVisible}
            studentid={student.id}
            parentid={parent.info}
            contactId={contactId}
            setContactId={setContactId}
            data={contacts_data}
          />
        </Fragment>
      )}

      <Row type="flex" align="middle" style={{ marginTop: 24 }}>
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

const ParentInfo = ({ form }) => {
  const {
    parent,
    siblings,
    student,
    showParentForm,
    contactList,
  } = useSelector(state => state.student);
  const dispatch = useDispatch();
  return (
    <Fragment>
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
                form={form}
                contactList={contactList}
              />
            </Col>
          )}
          {showParentForm && <ParentForm />}
        </Row>
      </Form>
    </Fragment>
  );
};

export default ParentInfo;
