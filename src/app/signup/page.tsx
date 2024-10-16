"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-6 px-4"
            style={{
                backgroundImage: 'url("https://i.pinimg.com/564x/5f/bc/34/5fbc34ed1a292b5f8a064a38328ed112.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(5px)",
            }}
        >
            <div className="bg-transparent bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-4">{loading ? "Processing..." : "Signup🔐"}</h1>
                <hr className="mb-4" />
                
                <label htmlFor="username" className="block mb-1 font-medium">Name</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />
                
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                />
                
                <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />
                
                <button
                    onClick={onSignup}
                    className={`w-full p-2 text-white rounded-lg mb-4 ${buttonDisabled ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "Fill all fields" : "Signup"}
                </button>
                
                <p className="text-center">
                    Already have an account?
                    <Link href="/login" className="mx-2 text-blue-800 underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
