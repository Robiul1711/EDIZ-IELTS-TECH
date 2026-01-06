import React from 'react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PTEResult = () => {
    return (
        <div className="">


            <div className='flex flex-col gap-10 min-h-screen items-center justify-center'>
                <div className="text-center max-w-2xl px-4 space-y-4">
                    <p className="text-2xl font-bold">
                        You have reached the end of the test.
                    </p>
                    <p className="">
                        Your test has ended and your answers were successfully submitted.
                        Check your score report and review areas for improvement.
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-4 w-full md:w-auto mt-auto md:mt-0">
                    <Link to={'/pte'}>
                        <button className='bg-black  text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2'>
                            TAKE ANOTHER TEST
                        </button>
                    </Link>

                    <div className="border "></div>

                    <Link to="/pte-examination">
                        <button className='bg-[#A22BDE] text-white w-full md:w-auto px-[85px] py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2'>
                            SEE THE RESULT
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default PTEResult;