import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminAttend from './Attendence';
import Leave from "./Leave"
import { Link } from 'react-router-dom';
function Home() {
    const [profile, setProfile] = useState([]);
    const [first, setfirst] = useState(true)
    const [Attendece1, setAttendence] = useState(false)
    const [laeve1, setleave] = useState(false)
    useEffect(() => {
        const getAuth = localStorage.getItem("AuthToken");
        const getData1 = async () => {
            try {
                const result = await fetch("http://localhost:5000/api/vi/UserDetail", {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': getAuth,
                    }
                });
                const response = await result.json();
                setProfile(response);
            } catch (error) {
                console.error(error);
            }
        };

        getData1();

    }, []);
    const Mark = "Done"
    const MarkAttendnce = async () => {
        const getAuth = localStorage.getItem("AuthToken");
        try {
            const result = await axios.post("http://localhost:5000/ap2/v2/attendance", { Mark }, {
                headers: {
                    'auth-token': getAuth,
                    'Content-Type': 'application/json',
                },
            });
            const response = result.data;
            console.log(response);
            if (result.status === 200) {
                // Successful attendance marking
                toast.success('Attendence Mark Succssifully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error while Maeking your Attendence', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
    const HandleAttendence = () => {
        setfirst(false)
        setAttendence(true)
        setleave(false)
    }
    const HandleLeave = () => {
        setfirst(false)
        setAttendence(false)
        setleave(true)
    }
    const HandleLogute = () => {
        window.location.reload()
        localStorage.clear();
    }
    // http://localhost:5000/ap2/v2/attendance
    return (
        <div>
            <div>
                <h1 className='text-3xl bg-green-700 text-center font-bold text-white h-14'>
                    <span>Your Attendence Sheet</span></h1>    <button
                        type="button"
                        className="text-white mt-3 float-right bg-red-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={HandleLogute}>
                    Logout
                </button>
                <h1 className='text-2xl font-bold mt-10 ml-20 font-serif'> Welcome <span className='text-amber-500'>{profile?.user?.name}</span></h1>
                <button
                    type="button"
                    className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={MarkAttendnce}>
                    Mark Attendnce
                </button>
                <button
                    type="button"
                    className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={HandleLeave}>
                    Take Leave
                </button>
                <button
                    type="button"
                    className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={HandleAttendence}>
                    View Attendnce
                </button>
            </div>
            {first && <div className='mt-20'>
                <p className="mb-3 text-gray-500 dark:text-gray-400 ml-6">
                    <h1 className='text-xl font-bold ml-10'>Caution</h1>
                    <p >Mark your Attendence on Daily Basis </p>
                    <p>If u want to view Your Attendence Click on View Button and View your attendance of this month</p>
                </p>
                <p className="text-gray-500 dark:text-gray-400 ml-6">
                    if you need Leave click of Leave Button and Tell Your Reason of Leave and Wait For Action From Admin
                </p>
            </div>}
            {Attendece1 && <AdminAttend />}
            {laeve1 && <Leave />}
            <Link to="/LiveStrea">
                <button
                    type="button"
                    className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Live
                </button>
            </Link>
        </div>
    )
}

export default Home
