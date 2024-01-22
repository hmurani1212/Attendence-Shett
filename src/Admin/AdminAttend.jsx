import React, { useEffect, useState } from 'react';
import AttendanceCalendar from './AdminAttend1';

function AdminAttend() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAuth = localStorage.getItem('AuthToken');

    const getData1 = async () => {
      try {
        const result = await fetch('http://localhost:5000/ap2/v2/getattendance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': getAuth,
          },
        });

        const response = await result.json();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getData1();
  }, []);
  console.log(data);

  return (
    <div className="p-4 sm:ml-48">
      {data.length > 0 ? (
        <>
          <h1 className="text-2xl text-green-700 font-bold text-center my-3">All Students Attendence Record</h1>
          <AttendanceCalendar attendanceData={data} />
        </>
      ) : (
        <div className="text-xl text-center font-bold">Please Make Attendance Today</div>
      )}
    </div>
  );
}

export default AdminAttend;
