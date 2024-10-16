"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface User {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<User>({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen text-white"
            style={{
                backgroundImage: 'url("https://i.pinimg.com/564x/5f/bc/34/5fbc34ed1a292b5f8a064a38328ed112.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="p-8 w-full max-w-md rounded-lg shadow-lg bg-transparent bg-opacity-90 text-black">
             
                <h1 className="text-3xl font-semibold text-center mb-4">Login🔐</h1>
                <hr className="mb-4" />
                <form className="flex flex-col" onSubmit={onLogin}>
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                        <input
                            className="border mx-2 border-gray-400 rounded p-3 text-black focus:outline-none focus:border-blue-500"
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                            placeholder="Email"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                        <input
                            className="border mx-2 border-gray-400 rounded p-3 text-black focus:outline-none focus:border-blue-500"
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded p-2 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={buttonDisabled || loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="my-3 text-center">
                    Don't have an account?
                    <Link href="/signup" className="mx-2 text-blue-800 underline">Register</Link>
                </p>
            </div>
        </div>
     
    );
}
