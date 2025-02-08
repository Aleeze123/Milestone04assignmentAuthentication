"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        console.log("User logged out");
        router.push("/login");
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen p-4"
            style={{
                backgroundColor: 'black',  
                color: 'white',  
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                <h1 className="text-4xl font-semibold text-gray-900 mb-4">Welcome back!</h1>
                <p className="text-lg text-gray-700 mb-6">You are now logged in</p>
                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 text-white rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
