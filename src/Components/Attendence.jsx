import React, { useEffect, useState } from 'react';
import AttendanceCalendar from './AttendanceCalendar';

function AdminAttend() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAuth = localStorage.getItem('AuthToken');

    const getData1 = async () => {
      try {
        const result = await fetch('http://localhost:5000/ap2/v2/getattendanceone', {
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
    <div>
      {data.length > 0 ? (
        <div className='ml-20 mr-20 mt-20'>
          <h1 className='text-2xl text-green-700 font-bold text-center my-3'>This Month Attendance</h1>
          <AttendanceCalendar attendanceData={data} />
        </div>
      ) : (
        <div className="p-4 sm:ml-64">
          <h1 className='text-xl text-center font-bold'>Please Make Attendance Today</h1>
        </div>
      )}
    </div>
  );
}

export default AdminAttend;
