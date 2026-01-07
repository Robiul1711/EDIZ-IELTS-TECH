import React from 'react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PTEStartTest = () => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className="flex flex-col-reverse gap-4 w-full md:w-auto mt-auto md:mt-0">

                <Link to={'/pte'}>
                    <button className='bg-black  text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2'>

                        Exit Test
                    </button>
                </Link>

                <div className="border "></div>

                <Link to="/pte-examination">
                    <button className='bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2'>
                        Start Test
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PTEStartTest;