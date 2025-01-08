'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import ShineBorder from '@/components/ui/shine-border';
import Schemas from './Schemas';
import FormInput from './common/FormInput';
import GoogleSignUp from './GoogleSignUp';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const { register, handleSubmit, formState: { errors }, reset, control, } = useForm({
        resolver: yupResolver(Schemas),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: "",
            mobile: "",
        },
    });

    const onSubmit = async (data) => {
        const { confirm_password, ...userDetails } = data;

        const response = await axios.post(baseUrl, userDetails, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.data.success) {
            localStorage.setItem("restaurantUser", JSON.stringify(userDetails));
            toast.success("Your sign-up has been successful!");
            router.push("/pages/admin/dashboard");
        } else {
            toast.error(response.data.message || "Sign-up failed. Please try again.");
        }
        reset();

    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-4">
            <ShineBorder
                className="relative w-full max-w-3xl p-0 rounded-lg overflow-hidden bg-slate-900 text-white shadow-lg"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
                <form className="py-6 px-4 font-semibold" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            name="firstname"
                            label="First Name"
                            placeholder="Enter your first name"
                            icon={FaUser}
                            control={control}
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            name="lastname"
                            label="Last Name"
                            placeholder="Enter your last name"
                            icon={FaUser}
                            control={control}
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            name="gender"
                            label="Gender"
                            type="select"
                            options={["Select...", "Male", "Female", "Other"]}
                            control={control}
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            icon={FaEnvelope}
                            control={control}
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            placeholder="******"
                            type={showPassword ? "text" : "password"}
                            icon={FaLock}
                            control={control}
                            register={register}
                            errors={errors}
                            rightElement={
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />
                        <FormInput
                            name="confirm_password"
                            label="Confirm Password"
                            placeholder="******"
                            type={showConfirmPassword ? "text" : "password"}
                            icon={FaLock}
                            control={control}
                            register={register}
                            errors={errors}
                            rightElement={
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />
                        <FormInput
                            name="mobile"
                            label="Mobile Number"
                            placeholder="1234567890"
                            type="tel"
                            icon={FaPhone}
                            control={control}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="flex justify-center mt-6 mb-3">
                        <button
                            type="submit"
                            className="w-40 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg active:scale-95 transition-transform"
                        >
                            Sign Up
                        </button>
                    </div>
                    <GoogleSignUp/>
                </form>
            </ShineBorder>
        </div>
    );
};

export default SignUp;
