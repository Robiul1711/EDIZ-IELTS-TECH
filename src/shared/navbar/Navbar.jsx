import { ImageAssets } from '@/lib/ImageProvider'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='bg-card sticky top-0 z-50 transition-colors duration-300'>
      <div className="flex items-center justify-between p-4 container mx-auto">
        <img src={ImageAssets.logo} alt="Logo" className='bg-white rounded' />
        <div className="flex gap-5 items-center">

          {/* Theme Toggle Button - Slider Style */}
          <button
            onClick={toggleTheme}
            className="relative w-20 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 p-1 transition-all duration-300 hover:shadow-lg flex items-center"
            aria-label="Toggle theme"
          >
            {/* Sliding Circle Indicator */}
            <div
              className={`absolute w-8 h-8 rounded-full bg-white shadow-md transform transition-all duration-300 flex items-center justify-center ${theme === 'light' ? 'translate-x-0' : 'translate-x-10'
                }`}
            >
              {/* Active Icon inside the circle */}
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>

            {/* Background Icons */}
            <div className="w-full flex items-center justify-between px-2 relative z-0">
              <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
          </button>

          <button className='px-8 py-3 bg-[#604CDF] text-primary-foreground  rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md'>
            Purchase
          </button>
          <button className='px-8 py-3 border bg-primary font-semibold text-white hover:text-black border-border rounded-full hover:bg-accent transition-colors'>
            Sign up
          </button>


        </div>
      </div>
    </div>
  )
}

export default Navbar