import React, { useState, useEffect } from 'react';
import axios from 'axios';
// http://localhost:5000/ap3/v3//admin/leave-requests
function AdminLeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  useEffect(() => {
    // Function to fetch all leave requests
    const fetchLeaveRequests = async () => {
      try {
        // Make a GET request to fetch leave requests
        const response = await axios.get('http://localhost:5000/ap3/v3/admin/leave-requests1');

        // Update the state with the fetched leave requests
        setLeaveRequests(response.data.leaveRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    // Call the fetchLeaveRequests function
    fetchLeaveRequests();
  }, []);
  // http://localhost:5000/ap3/v3/admin/respond-to-leave
  console.log(leaveRequests)
  const AcceptAttendence = async (leaveRequestId) => {
    console.log(leaveRequestId)
    try {
      const result = await axios.post(" http://localhost:5000/ap3/v3/admin/respond-to-leave", { leaveRequestId, response: "accepted" })

      const response = result.data;
      console.log(response);
      if (result.status === 200) {
        // Successful attendance marking
        alert('Attendance Accept successfully');
      } else if (result.status === 404 && response === 'Attendance already marked today') {
        // Attendance already marked today
        alert('Attendance already marked today');
      } else {
        // Handle other cases or show a generic error message
        alert('Error marking attendance');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeclineAttendence = async (leaveRequestId) => {
    console.log(leaveRequestId)
    try {
      const result = await axios.post(" http://localhost:5000/ap3/v3/admin/respond-to-leave", { leaveRequestId, response: "declined" })
      const response = result.data;
      console.log(response);
      if (result.status === 200) {
        // Successful attendance marking
        alert('Attendance declined successfully');
      } else if (result.status === 404 && response === 'Attendance already marked today') {
        // Attendance already marked today
        alert('Attendance already marked today');
      } else {
        // Handle other cases or show a generic error message
        alert('Error marking attendance');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className='text-2xl mt-20 text-center font-bold'>Here is Leaves From Student is in Pending</h1>
      {
        leaveRequests.map((element) => {
          return (
            <>
              <div
                className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <span className="font-medium">{element?.user?.name}</span><br></br> Leave:
                <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                  {element.status}
                </span>
                <br></br> Reason For Leave: {element.reason}
                <button
                  type="button"
                  className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => AcceptAttendence(element._id)}>
                  Acccept
                </button>
                <button
                  type="button"
                  className="focus:outline-none float-right text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => DeclineAttendence(element._id)}>
                  Decline
                </button>


              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default AdminLeave