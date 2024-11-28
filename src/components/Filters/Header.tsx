import React from 'react';
import logo from '../../assets/img/imagelogo.png';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-white">
            <div className="logo">
                <img src={logo} alt="Logo" className="w-14 h-auto object-contain" />
            </div>

            <div className="menu-icon">
                <button className="focus:outline-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;

