import React from 'react';

const getDayName = (dayIndex) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

const AttendanceCalendar = ({ attendanceData }) => {
  const markedDays = attendanceData.reduce((accumulator, attendance) => {
    const datesArray = attendance.dates.map((dateString) => {
      const date = new Date(dateString);
      return { day: date.getDate(), dayName: getDayName(date.getDay()) };
    });
    return accumulator.concat(datesArray);
  }, []);

  const renderMarkedDays = () => {
    return markedDays.map(({ day, dayName }) => (
      <div key={day} className="col-span-1">
        <div className="flex items-center mb-4">
          <span
            className="w-4 h-4 text-blue-500 text-xl bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          ></span>
          <span className="bg-blue-100 font-xl text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {`${dayName}, ${day}`}
          </span>


        </div>
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {renderMarkedDays()}
    </div>
  );
};

export default AttendanceCalendar;
