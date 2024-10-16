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
               backgroundImage: 'url("https://i.pinimg.com/564x/5f/bc/34/5fbc34ed1a292b5f8a064a38328ed112.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="bg-transparent p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl mb-4 text-gray-800">Welcome!</h1>
                <p className="text-gray-600 mb-2">You are now logged in </p>
                <p className="text-gray-800 font-semibold"></p>
                <div className="mt-6 flex justify-around">
                    
                    <button
                        onClick={handleLogout}
                        className="p-2 border border-gray-300 rounded-lg bg-red-600 text-white focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
