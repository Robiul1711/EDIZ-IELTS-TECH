
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationButton = ({ href = "#", label = "Back" }) => {
  return (
    <Link
      to={href}
      className="inline-flex border dark:text-gray-200 dark:border-gray-200 dark:border-slate-800 rounded-full px-3 py-1 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </Link>
  );
};

export default NavigationButton;
