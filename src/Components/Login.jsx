import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const AdminDne ="AdminDne";
    const HandleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (email === "admin123@gmail.com" && password === "12345") {
                // Admin login
                localStorage.setItem("AdminDne",AdminDne)
                navigate("/Admin");
                window.location.reload()

            } else  {
                const AuthToken = "atuwetqw34534625374dgfsdhgfdhfg";
                window.location.reload()
                 navigate("/");
                localStorage.setItem("AuthToken", AuthToken);
                // // User login
                // const response = await axios.post("http://localhost:5000/api/vi/Login", {
                //     email,
                //     password,
                // });

                // const result = await response.data;
                // const AuthToken = result.AuthToken;
                // 
                // setTimeout(() => {
                //     
                   
                // }, 1000);
            }
        } catch (error) {
            
            // Handle login errors
            if (error.response && error.response.status === 400) {
                toast.error('Login with correct credentials', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
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
                         <h1>Enter (email="student123@gmail.com" and password="12345")</h1>
                          <h1>For admin pannel Enter (email === "admin123@gmail.com" && password === "12345")</h1>
                        <h1 className='text-3xl text-center font-bold my-4'>Login</h1>
                       
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

export default Login
