'use client';
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const GoogleSignUp = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_URL;
    const handleGoogleSignUp = async (response) => {
        try {
            const { credential } = response;

            const res = await axios.post(apiUrl, {
                token: credential,
            });
            const data = res.data;
            if (data.success) {
                localStorage.setItem('restaurantUser',JSON.stringify(data.user))
                toast.success("Sign-Up successful!");
                router.push("/pages/admin/dashboard");
            } else {
                toast.error('Google Sign-Up failed: ' + data.error);
            }
        } catch (error) {
            toast.error(` ${error.response?.data?.error || "Please try again."}`);
        }
    };

    const handleGoogleFailure = () => {
        toast.error("Google Sign-Up failed. Please try again.");
    };

    return (
        <div className="flex justify-center items-center">
            <GoogleLogin
                onSuccess={handleGoogleSignUp}
                onError={handleGoogleFailure}
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                buttonText="Sign Up with Google"
                cookiePolicy={'single_host_origin'}

            />
        </div>
    );
};

export default GoogleSignUp;
