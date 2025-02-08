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
    const [error, setError] = React.useState<string | null>(null); 

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

            // Check if the error is about the user already existing
            if (error.response && error.response.data.message === "User already exists") {
                setError("This email is already registered. Please try logging in.");
            } else {
                setError(error.message || "An error occurred");
            }
            toast.error(error.message || "Login failed");
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
                backgroundColor: "black", 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: "blur(5px)", 
            }}
        >
            <div className="p-8 w-full max-w-md rounded-lg shadow-xl bg-black text-white border-2 border-white">
                <h1 className="text-3xl font-semibold text-center mb-4">Login🔐</h1>
                <hr className="mb-4" style={{ borderColor: "white" }} />

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form className="flex flex-col" onSubmit={onLogin}>
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                        <input
                            className="border mx-2 border-white rounded p-3 text-black focus:outline-none focus:border-blue-500"
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                            placeholder="Email"
                            style={{ backgroundColor: "#333" }}
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                        <input
                            className="border mx-2 border-white rounded p-3 text-black focus:outline-none focus:border-blue-500"
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            placeholder="Password"
                            style={{ backgroundColor: "#333" }}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`mt-4 text-white rounded-lg p-3 transition duration-300 ease-in-out transform ${loading ? "opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"}`}
                        disabled={buttonDisabled || loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="my-3 text-center text-white">
                    Don't have an account?
                    <Link href="/signup" className="mx-2 text-blue-800 underline">Register</Link>
                </p>
            </div>
        </div>
    );
}
