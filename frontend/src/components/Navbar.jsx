import React from 'react';
import { FaSearch, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="bg-orange-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="SoundCloud" className="h-8" />
                    <a href="/" className="hover:text-gray-200">Home</a>
                    <a href="/feed" className="hover:text-gray-200">Feed</a>
                    <a href="/library" className="hover:text-gray-200">Library</a>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-white text-black rounded-full py-1 px-4 pr-8"
                        />
                        <FaSearch className="absolute right-2 top-2 text-gray-500" />
                    </div>
                    <button className="hover:text-gray-200"><FaBell /></button>
                    <button className="hover:text-gray-200"><FaEnvelope /></button>
                    <button className="hover:text-gray-200"><FaUser /></button>
                </div>
            </div>
        </nav>
    );
}