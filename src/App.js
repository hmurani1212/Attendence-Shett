import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Sign from './Components/Sign';
import Attendence from './Components/Attendence';
import AttendanceCalendar from './Components/AttendanceCalendar';
import Leave from './Components/Leave';
import Admin from './Admin/Admin';
import AdminAttend from './Admin/AdminAttend';
import AdminAttend1 from './Admin/AdminAttend1';
import AdminLeave from './Admin/AdminLeave';
import Login from './Components/Login';
import LiveStrea from './Components/LiveStrea';
function App() {
  const getAuth = localStorage.getItem('AuthToken');
  const AdminDne = localStorage.getItem("AdminDne")
  return (
    <BrowserRouter>
      <Routes>
        {!getAuth ? (
          // If not authenticated, show Sign component
          <Route path="/" element={<Login />} />
        ) : (
          // If authenticated, show Home component
          <>
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
              <Route path="Attendence" element={<Attendence />} />
              <Route path="AttendanceCalendar" element={<AttendanceCalendar />} />
              <Route path="Leave" element={<Leave />} />
              {getAuth && (
                <Route path="/LiveStrea" element={<LiveStrea />} />
              )}
            </Route>
          </>
        )}
        {/* Protected routes for Admin */}
        {AdminDne && (
          <>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/AdminAttend" element={<AdminAttend />} />
            <Route path="/AdminAttend1" element={<AdminAttend1 />} />
            <Route path="/AdminLeave" element={<AdminLeave />} />
          </>
        )}
        {/* Login route */}
        {!getAuth && <Route path="/Login" element={<Login />} />}
        {/* Redirect user to Home if they try to access Login or Sign after login */}
        {getAuth && (
          <Route path="/Login" element={<Navigate to="/" replace />} />
        )}
        {getAuth && (
          <Route path="/Sign" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
