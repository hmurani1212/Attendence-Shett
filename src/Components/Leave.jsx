import React, { useState, useEffect } from 'react';
import axios from 'axios';

// http://localhost:5000/ap3/v3//admin/leave-requests
function Leave() {
    const [reason, setReason] = useState('');
    const [leaveRequests, setLeaveRequests] = useState([]);
    // Function to fetch all leave requests
    const fetchLeaveRequests = async () => {
        const getAuth = localStorage.getItem("AuthToken");
        try {
            // Make a GET request to fetch leave requests
            const response = await axios.get('http://localhost:5000/ap3/v3/admin/leave-requests', {
                headers: {
                    'auth-token': getAuth,
                    'Content-Type': 'application/json',
                },
            });

            // Update the state with the fetched leave requests
            setLeaveRequests(response.data.leaveRequests);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };
    const MarkLeave = async () => {
        const getAuth = localStorage.getItem("AuthToken");
        try {
            const result = await axios.post("http://localhost:5000/ap3/v3/Leave", { reason }, {
                headers: {
                    'auth-token': getAuth,
                    'Content-Type': 'application/json',
                },
            });

            const response = result.data;
            console.log(response);

            if (response && response.status === 400 && response.data === 'Attendance already marked today') {
                alert('Attendance already marked today');
            } else {
                // If leave is successfully marked, fetch updated leave requests
                fetchLeaveRequests();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Call the fetchLeaveRequests function
        fetchLeaveRequests();
    }, []);
    console.log(leaveRequests)
    return (
        <div className='ml-20 mr-20 mt-20'>
            <h1 className='text-3xl text-center font-bold'>Enter The Reason of Leave</h1>
            <textarea
                id="message"
                rows={4} value={reason} onChange={(e) => setReason(e.target.value)}
                className="block mt-10 border-indigo-600 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                defaultValue={""}
            />
            <button
                type="button"
                className="text-white my-3 mt-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={MarkLeave}>
                Submit
            </button>
            <br></br>
            Your Request For Leave
            {
                leaveRequests.map((element) => {
                    return (
                        <>
                            <div
                                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                            >
                                <span className="font-medium">Status :</span>  <h1> Your  Request For Leave is Stil  <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                    {element.status}
                                </span></h1>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Leave