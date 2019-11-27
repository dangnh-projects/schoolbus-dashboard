import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
import 'antd/dist/antd.css';
import './App.css';
import './app.scss';
import Loading from './views/Loading';

const NotFound = lazy(() => import('./views/NotFound'));

const Login = lazy(() => import('./views/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Home = lazy(() => import('./views/Dashboard/Home'));

const Bus = lazy(() => import('./views/Dashboard/Bus'));
const BusForm = lazy(() => import('./views/Dashboard/Bus/Form'));

const BusRoute = lazy(() => import('./views/Dashboard/BusRoute'));
const BusRouteForm = lazy(() => import('./views/Dashboard/BusRoute/Form'));
const BusTrack = lazy(() => import('./views/Dashboard/BusTrack'));

const Driver = lazy(() => import('./views/Dashboard/Driver'));
const DriverForm = lazy(() => import('./views/Dashboard/Driver/Form'));

const Parent = lazy(() => import('./views/Dashboard/Parent'));
const ParentForm = lazy(() => import('./views/Dashboard/Parent/Form'));

const BusSupervisor = lazy(() => import('./views/Dashboard/BusSupervisor'));
const BusSupervisorForm = lazy(() =>
  import('./views/Dashboard/BusSupervisor/Form')
);
const Student = lazy(() => import('./views/Dashboard/Student'));
const StudentForm = lazy(() => import('./views/Dashboard/Student/Form'));

const WaitingComponent = ({ Component, ...props }) => (
  <Suspense maxDuration={1500} fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

function App() {
  return (
    <Suspense maxDuration={1500} fallback={<Loading />}>
      <Router>
        <WaitingComponent Component={Login} path="/" />
        <WaitingComponent Component={Login} path="/login" />

        <WaitingComponent Component={Dashboard} path="dashboard">
          <WaitingComponent Component={Home} path="/" />

          <WaitingComponent Component={Bus} path="bus" />
          <WaitingComponent Component={BusForm} path="bus/new" />
          <WaitingComponent Component={BusForm} path="bus/:id" />

          <WaitingComponent Component={BusRoute} path="bus-route" />
          <WaitingComponent Component={BusRouteForm} path="bus-route/new" />
          <WaitingComponent Component={BusRouteForm} path="bus-route/:id" />
          <WaitingComponent Component={BusTrack} path="bus-track" />

          <WaitingComponent Component={Driver} path="driver" />
          <WaitingComponent Component={DriverForm} path="driver/new" />
          <WaitingComponent Component={DriverForm} path="driver/:id" />

          <WaitingComponent Component={Parent} path="parent" />
          <WaitingComponent Component={ParentForm} path="parent/new" />
          <WaitingComponent Component={ParentForm} path="parent/:id" />

          <WaitingComponent Component={BusSupervisor} path="bus-supervisor" />
          <WaitingComponent
            Component={BusSupervisorForm}
            path="bus-supervisor/new"
          />
          <WaitingComponent
            Component={BusSupervisorForm}
            path="bus-supervisor/:id"
          />
          <WaitingComponent Component={Student} path="student" />
          <WaitingComponent Component={StudentForm} path="student/new" />
          <WaitingComponent Component={StudentForm} path="student/:id" />
        </WaitingComponent>
        <WaitingComponent Component={Dashboard} path="permission">
          {/* <WaitingComponent Component={User} path="user" />
          <WaitingComponent Component={UserForm} path="user/new" />
          <WaitingComponent Component={UserForm} path="user/:id" />

          <WaitingComponent Component={Group} path="group" />
          <WaitingComponent Component={GroupForm} path="group/new" />
          <WaitingComponent Component={GroupForm} path="group/:id" /> */}
        </WaitingComponent>
        <NotFound default />
      </Router>
    </Suspense>
  );
}

export default App;
