import React from 'react';
import { Link } from "react-router-dom";

const Artistregisterpage = () => {
    return(
        <div>
            <div className='flex justify-center p-16'>
                <h1 className='text-4xl font-bold'>Create your account</h1>
            </div>
                <div className='flex justify-center items-center'>
                    <div className='flex w-[1000px] h-[500px] bg-white rounded-xl shadow-lg overflow-hidden'>
                        <div className='w-1/2  flex justify-center items-center'>
                            <form action="#" className='w-[330px]'>
                                <input type="text" placeholder="Name" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5" required/><br/><br/>
                                <input type="email" placeholder="Email" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5" required/><br /><br />
                                <input type="password" placeholder="Password" className="w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5" required/><br /><br />
                                <Link to="/login-artist">
                                <button type="submit" className="w-full rounded-xl bg-blue-400 text-white py-2.5 font-medium shadow-md hover:bg-blue-500">
                                    Sign up
                                </button>
                                </Link>
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login-artist" className="font-medium text-gray-900 underline underline-offset-4 hover:no-underline">
                                        Login
                                    </Link>
                                </p>

                                <div className="my-4 flex items-center gap-2">
                                    <div className="h-px flex-1 bg-gray-400" />
                                    <span className="text-xs text-gray-500">OR</span>
                                    <div className="h-px flex-1 bg-gray-400" />
                                </div>

                                <button className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-2.5 font-medium text-gray-900 shadow-sm hover:bg-gray-50" aria-label="Continue with Google">
                                    <GoogleIcon className="h-5 w-5"/>Continue with Google
                                </button>
                            </form>    
                            </div>
                        <div className='w-1/2 bg-green-500 flex justify-center items-center'>
                            <img src="photos\artistregisterui.jpg" alt="Signup img" className='w-[500px] h-[500px]'/>
                        </div>
                    </div>
                </div>
        </div>
    );
};

function GoogleIcon({ className = "" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.4 2.9l6-6C34.7 4.6 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.5-4z"/>
            <path d="M6.3 14.7l7 5.1C15 16 18.2 14 24 14c3.1 0 6 .9 8.4 2.9l6-6C34.7 4.6 29.6 3 24 3 16.1 3 9.2 7.3 6.3 14.7z"/>
            <path d="M24 45c6.1 0 11.2-2 15-5.4l-6.9-5.7C29.8 35.8 27.2 37 24 37c-6.1 0-10.7-4.1-11.7-9.5l-7.1 5.5C8 40.2 15.2 45 24 45z"/>
            <path d="M44.5 20H24v8.5h11.8C35.5 31.1 30.9 34 24 34c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .9 8.4 2.9l6-6C34.7 4.6 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.5-4z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
    );
}

export default Artistregisterpage;