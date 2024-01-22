import React, { useState } from 'react';
import AdminLeave from './AdminLeave';
import AdminAttend from './AdminAttend';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate= useNavigate()
    const [first, setfirst] = useState(true)
    const [second, setsecond] = useState(false)
    const HandleAttendence = () => {
        setfirst(true);
        setsecond(false)
    }
    const HandleLeave = () => {
        setfirst(false);
        setsecond(true)
    }
    const HandleLogute = () => {
        window.location.reload()
        localStorage.clear();
        navigate("/")
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl bg-green-700 text-center font-bold text-white h-14 '>
                    <span>Admin Pannel</span></h1>
                    <button
                        type="button"
                        className="text-white mt-3  bg-red-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={HandleLogute}>
                    Logout
                </button>
                {/* <h1 className='text-2xl font-bold mt-10 ml-20 font-serif'> Welcome <span className='text-amber-500'>{profile?.user?.name}</span></h1> */}
                <button
                    type="button"
                    className="text-white my-5 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={HandleAttendence}>
                    view Attendnce
                </button>
                <button
                    type="button"
                    className="text-white my-5 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={HandleLeave}>
                    view Leave
                </button>
                {/* <button
                    type="button"
                    className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={HandleAttendence}>
                    View Attendnce
                </button> */}
            </div>
            {second && <AdminLeave />}
            {first && <AdminAttend />}
        </div>
    )
}

export default Home