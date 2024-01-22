import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Function to get the name of the day
const getDayName = (dayIndex) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};
const AttendanceCalendar = ({ attendanceData }) => {
  const [date, setdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const dateInputRef = useRef(null);
  const [getuserId, setuserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (userId) => {
    setuserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModal(false)
  };

  const sendData = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/ap2/v2/attendancedate/${getuserId}`, { date }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = result.data;
      console.log(response);
      if (result.status === 200) {
        // Successful attendance marking
        alert('Attendance marked successfully');
      } else if (result.status === 404 && response === 'Attendance already marked today') {
        // Attendance already marked today
        alert('Attendance already marked today');
      } else {
        // Handle other cases or show a generic error message
        alert('Error marking attendance');
      }
    } catch (error) {
      // Handle the error
      console.error('Error marking attendance:', error);
    }
  };
  const deleletHandle = async (userId) => {
    console.log(userId);
    try {
      const result = await axios.delete(`http://localhost:5000/ap2/v2/deleteAttendance/${userId}`);
      const response = result.data;
      console.log(response);
      if (result.status === 200) {
        // Successful attendance marking
        alert('Attendance deleted successfully');
      } else if (result.status === 404 && response === 'Attendance not found for the specified date') {
        // Attendance not found for the specified date
        alert('Attendance not found for the specified date');
      } else {
        // Handle other cases or show a generic error message
        alert('Error deleting attendance');
      }
    } catch (error) {
      // Handle the error
      console.error('Error deleting attendance:', error);
    }
  };
  const openModal1 = (userId, dateString) => {
    setuserId(userId);
    setSelectedDate(dateString); // Set the selected date here
    setShowModal1(true);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  const closeModal1 = () => {
    setShowModal1(false)

  }
  const updateDate = async (dateIndex) => {
    console.log('User Id:', getuserId);
    console.log('Selected Date:', selectedDate);
  
    try {
      const result = await axios.put(
        `http://localhost:5000/ap2/v2/updateAttendance/${getuserId}`,
        {
          dateIndex: dateIndex,
          date: selectedDate,
        }
      );
  
      console.log('Axios Response:', result);
    } catch (error) {
      // Handle the error
      console.error('Error updating attendance:', error);
    }
  };
  const deleletHandle1 = async (userId, dateIndex) => {
    console.log(userId);
    try {
      const result = await axios.delete(`http://localhost:5000/ap2/v2/deleteAttendance1/${userId}/${dateIndex}`);
      const response = result.data;
      console.log(response);
  
      if (result.status === 200) {
        // Successful attendance deletion
        alert('Attendance date deleted successfully');
      } else if (result.status === 404 && response === 'Attendance not found for the specified date') {
        // Attendance not found for the specified date
        alert('Attendance not found for the specified date');
      } else {
        // Handle other cases or show a generic error message
        alert('Error deleting attendance date');
      }
    } catch (error) {
      // Handle the error
      console.error('Error deleting attendance date:', error);
    }
  };
  


  const renderMarkedDays = () => {
    return attendanceData.map((attendance, index) => {
      const { user, dates } = attendance;
      const userName = user.name;
      const index1 = index + 1;

      return (
        <div key={user._id} className="mb-4">
           {getuserId === user._id && (
          <button
            type="button"
            className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => deleletHandle(user._id)}
          >
            Delete All Attendance
          </button>
            )}
          <h3 className="text-lg font-semibold text-blue-700">
            <span onClick={() => setuserId(user._id)} className={`cursor-pointer ${getuserId === user._id ? 'text-red-500' : ''}`}>
              {index1}) {userName}
            </span>
            {getuserId === user._id && (
              <button
                type="button"
                className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => openModal(user._id)}
              >
                Add Attendance
              </button>

            )}

          </h3>
          {getuserId === user._id && (
            <div className="grid grid-cols-2 mt-5 md:grid-cols-4 gap-4">
              {dates.map((dateString, dayIndex) => {
                const date = new Date(dateString);
                const day = date.getDate();
                const dayName = getDayName(date.getDay());
                return (
                  <div key={day} className="col-span-1">
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        {`${dayName}, ${day}`}
                        {/* <br></br> */}
                        <i className="fa-solid mx-2 fa-trash" onClick={() => deleletHandle1(user._id, dayIndex)}></i>
                        <i className="fa-solid ml-4 fa-pen" onClick={() => openModal1(attendance._id, dateString, dayIndex)}></i>

                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {showModal && (
        <div className="justify-center overflow-x-auto items-center flex overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* Modal content here */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[800px] bg-white outline-none focus:outline-none">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-semibold">Enter Date of This Month </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Modal body */}
              <form>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                      className="bg-gray-50 border border-indigo-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Date"
                      ref={dateInputRef}
                      required=""
                      // min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`}
                      // max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`}
                    />
                  </div>
                </div>
                {/* Modal footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={sendData}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal1 && (
        <div className="justify-center overflow-x-auto items-center flex overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* Modal content here */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[800px] bg-white outline-none focus:outline-none">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-semibold">Enter Date of This Month </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    Close
                  </span>
                </button>
              </div>
              {/* Modal body */}
              <form>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-gray-50 border border-indigo-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Date"
                      ref={dateInputRef}
                      required=""
                      // min={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-01`}
                      // max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal1}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

                    onClick={updateDate} >
                    Update
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
      {renderMarkedDays()}
    </div>
  );
};
export default AttendanceCalendar;
