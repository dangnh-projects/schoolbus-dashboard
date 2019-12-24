import React, { useState, Fragment, useEffect, lazy, Suspense } from 'react';
import moment from 'moment';
import { Table, Tag, Modal, Row, Button, Spin } from 'antd';
import { actionCreator } from 'store/busRoute/busRoute.meta';
import { useSelector, useDispatch } from 'react-redux';

const BusRouteMap = lazy(() => import('./BusRouteMap'));

export const STUDENT_STATUS = {
  NOT_ON_BUS: 0,
  MISSING: 1,
  ABSENCE_WITH_REPORT: 2,
  ON_THE_WAY_TO_SCHOOL: 3,
  ON_THE_WAY_TO_HOME: 4,
  OFF_BUS: 5,
};

const STATUS_TEXT = {
  0: 'Not on the bus',
  1: 'Miss the bus',
  2: 'Student absent with report',
  3: 'Student on the way to school',
  4: 'Student on the way to home',
  5: 'Student off the bus',
};

const STATUS_TAG_COLOR = {
  0: '#108ee9',
  1: '#f50',
  2: 'orange',
  3: '#108ee9',
  4: '#108ee9',
  5: '',
};

const processAttendanceTableData = items => {
  const output = {};
  items.forEach(item => {
    const address = `${item.location.address} ${item.location.street} ${item
      .location.ward !== '' && 'phường ' + item.location.ward} Quận ${
      item.location.district
    }`;
    if (!output[address]) {
      output[address] = [];
    }

    output[address].push(item);
  });

  return Object.keys(output).map(key => ({
    address: key,
    children: output[key],
  }));
};

const AttendanceTable = ({ visible, attendances = [], setVisible }) => {
  const processedData = processAttendanceTableData(attendances);
  // console.log(processedData);
  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      cancelButtonProps={{ display: 'none' }}
      footer={false}
      bodyStyle={{ padding: 24 }}
      width={600}
    >
      <div
        className="ant-table ant-table-middle ant-table-bordered ant-table-scroll-position-left"
        style={{ padding: 12 }}
      >
        <table style={{ border: '1px solid #e8e8e8' }}>
          <thead className="ant-table-thead" style={{}}>
            <tr>
              <th
                style={{
                  borderRight: '1px solid #e8e8e8',
                  borderBottom: '1px solid #e8e8e8',
                  padding: 12,
                }}
              >
                <span className="ant-table-header-column">Location</span>
              </th>
              <th
                style={{
                  borderRight: '1px solid #e8e8e8',
                  borderBottom: '1px solid #e8e8e8',
                  padding: 12,
                }}
              >
                Student name
              </th>
              <th style={{ padding: 12, borderBottom: '1px solid #e8e8e8' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            {processedData.map(loc => {
              const { address, children } = loc;
              const [first, ...last] = children;
              return (
                <Fragment>
                  <tr key={address} className="">
                    <td rowSpan={children.length}>{address}</td>
                    <td>{first.student.name}</td>
                    <td>
                      <Tag color={STATUS_TAG_COLOR[first.status]}>
                        {STATUS_TEXT[first.status]}
                      </Tag>
                    </td>
                  </tr>
                  {last.map(attend => (
                    <tr key={attend.student.id}>
                      <td>{attend.student.name}</td>
                      <td>
                        <Tag color={STATUS_TAG_COLOR[first.status]}>
                          {STATUS_TEXT[attend.status]}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

const processData = records => {
  return records.map(route => {
    let { locations } = route;
    const onboarding = [];
    const remaining = [];
    let nextLoc = null;
    let currentLoc = null;
    locations = locations.sort((a, b) => a.order - b.order);

    for (let i = 0; i < locations.length; i++) {
      const { attendances } = locations[i];
      if (attendances.length === 0) {
        continue;
      }

      const haveStudentNotOnBus = attendances.some(
        item => item.status === STUDENT_STATUS.NOT_ON_BUS
      );

      if (!nextLoc && haveStudentNotOnBus) {
        nextLoc = locations[i];
        if (i > 0) {
          currentLoc = locations[i - 1];
        } else {
          currentLoc = false;
        }
      }

      attendances.forEach(atten => {
        atten.location = locations[i].location;
        if (
          atten.status === STUDENT_STATUS.ON_THE_WAY_TO_SCHOOL ||
          atten.status === STUDENT_STATUS.ON_THE_WAY_TO_HOME
        ) {
          onboarding.push(atten);
        } else {
          remaining.push(atten);
        }
      });
    }

    route.nextLoc = nextLoc;
    route.onboarding = onboarding;
    route.remaining = remaining;
    route.currentLoc = currentLoc;
    return route;
  });
};

const LiveTable = props => {
  const { currentRoute } = useSelector(store => store.busRoute);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isShowMap, setShowMap] = useState(false);
  // const [currentRoute, setCurrentRoute] = useState(null);

  const columns = [
    {
      title: 'ID',
      render: (_, i) => i.bus_route && i.bus_route.id,
    },
    {
      title: 'Route name',
      render: (_, i) => i.bus_route && i.bus_route.name,
    },
    {
      title: 'Bus number',
      render: (_, i) => i.bus_route && i.bus_route.bus && i.bus_route.bus.name,
    },

    {
      title: 'Driver',
      render: (_, i) =>
        i.bus_route && i.bus_route.driver && i.bus_route.driver.name,
    },

    {
      title: 'Bus supervisor',
      render: (_, i) =>
        i.bus_route &&
        i.bus_route.bus_supervisor &&
        i.bus_route.bus_supervisor.first_name +
          ' ' +
          i.bus_route.bus_supervisor.last_name,
    },
    {
      title: 'Start time',
      render: (_, i) =>
        i.bus_route &&
        i.bus_route.start_time &&
        moment(i.bus_route && i.bus_route.start_time, 'HH:mm:ss').format(
          'HH:mm'
        ),
    },
    {
      title: 'Next stop',
      render: (_, i) => {
        if (i.nextLoc)
          return `${i.nextLoc.location.address} ${i.nextLoc.location.street} ${i
            .nextLoc.location.ward !== '' &&
            'phường ' + i.nextLoc.location.ward} Quận ${
            i.nextLoc.location.district
          }`;

        return 'To school';
      },
    },
    {
      title: 'No of onboarding',
      align: 'center',
      render: (_, i) => (
        <Tag
          color="#87d068"
          style={{ paddingLeft: 12, paddingRight: 12, cursor: 'pointer' }}
          onClick={() => {
            setVisible(true);
            setAttendances(i.onboarding);
          }}
        >
          {i.onboarding ? i.onboarding.length : 0}
        </Tag>
      ),
    },
    {
      title: 'No of remaining',
      align: 'center',
      render: (_, i) => (
        <Tag
          color="#108ee9"
          style={{ paddingLeft: 12, paddingRight: 12, cursor: 'pointer' }}
          onClick={() => {
            setVisible(true);
            setAttendances(i.remaining);
          }}
        >
          {i.remaining ? i.remaining.length : 0}
        </Tag>
      ),
    },

    {
      title: 'Planned end time',
      align: 'center',
      render: (_, i) =>
        i.estimated_end_time &&
        moment(i.estimated_end_time, 'HH:mm:ss').format('HH:mm'),
    },
    {
      title: '',
      render: (_, i) => (
        <Row>
          <Button
            onClick={() => {
              // setCurrentRoute(i);
              setShowMap(true);
              props.setCurrentRoute(i);
            }}
          >
            <img
              src="/images/map.png"
              alt="map-icon"
              style={{ width: 16, height: 'auto' }}
            />
          </Button>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    const data = processData(props.dataSource);
    setData(data);
    // check current route and update;
    if (currentRoute) {
      console.log(data, currentRoute);
      const foundRoute = data.find(
        route => route.bus_route.id === currentRoute.bus_route.id
      );

      if (foundRoute) {
        dispatch(actionCreator.setCurrentRoute(foundRoute));
      } else {
        dispatch(actionCreator.setCurrentRoute(null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataSource]);

  return (
    <Fragment>
      <AttendanceTable
        setVisible={setVisible}
        visible={isVisible}
        attendances={attendances}
      />
      <Suspense fallback={<Spin />}>
        <BusRouteMap
          route={currentRoute}
          visible={isShowMap}
          setVisible={setShowMap}
        />
      </Suspense>
      <Table columns={columns} bordered size="middle" dataSource={data || []} />
    </Fragment>
  );
};

export default LiveTable;
