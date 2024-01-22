import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Sign() {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error1, seterror] = useState("")
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {                                  
            const response = await axios.post("http://localhost:5000/api/vi/Create", {
                email,
                name,
                password,
            });
            const result = await response.data;
            navigate("/Login")
            console.log(result);
            toast.success('Account Create Succesifully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            seterror("Password Must Containe min: 8 Charecter, one upper Character one number and one Spacial Character ")
            if (error.response && error.response.status === 400) {
                toast.error('Sign up With Correct Cradentail', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.log(error.response.data); // Log server error response
            } else {
                console.log(error); // Log other errors
            }
        }
    };

    return (
        <div>
            <div className='max-w-sm mx-auto mt-20'>
                <p
                    href="#"
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    
                    <form className="max-w-sm mx-auto" onSubmit={HandleSubmit}>
                        <h1 className='text-3xl text-center font-bold my-4'>Sign Up</h1>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="text" value={name} onChange={(e) => setname(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Your Name"
                                required=""
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email" value={email} onChange={(e) => setemail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                                required=""
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input value={password} onChange={(e) => setpassword(e.target.value)}
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                            <span className="text-red-600" style={{fontSize:"13px"}}>{error1}</span>
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required=""
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                            <Link to="/Login">
                                <p className='ml-12 mb-3 underline cursor-pointer'>Have Already Account</p>
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </form>
                </p>
            </div>




        </div>
    )
}

export default Sign