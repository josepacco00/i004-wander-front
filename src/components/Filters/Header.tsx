import React from 'react';
import logo from '../../assets/img/imagelogo.png';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="logo">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
      </div>
      <button className="menu-icon focus:outline-none">
        <svg
          className="w-8 h-8 fill-none stroke-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
