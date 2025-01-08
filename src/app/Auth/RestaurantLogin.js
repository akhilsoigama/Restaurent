'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginSchemas } from './Schemas';
import ShineBorder from '@/components/ui/shine-border';
import FormInput from './common/FormInput';

const RestaurantLogin = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ;

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchemas),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log("Form Data:", data);

            const response = await axios.post(baseUrl, {
                login: true,
                email: data.email,
                password: data.password,
            });

            if (response.data.success) {
                localStorage.setItem("restaurantUser", JSON.stringify(response.data.data));
                toast.success("Your login has been successful");
                router.push("/pages/admin/dashboard"); 
            } else {
                toast.error(response.data.error || "Invalid email or password.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.error || "Something went wrong. Please try again."
            );
        } finally {
            reset();
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r p-2 from-gray-800 via-gray-700 to-gray-800 text-white">
            <ShineBorder
                className="relative w-full max-w-xl p-0 rounded-lg overflow-hidden bg-slate-900 text-white shadow-lg"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="font-semibold w-full flex flex-col gap-8 py-6 md:py-10 px-4 md:px-20 bg-slate-900 text-white"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>

                    <FormInput
                        {...register("email")}
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        control={control}
                        icon={FaEnvelope}
                        errors={errors}
                    />
                    <FormInput
                        {...register("password")}
                        label="Password"
                        placeholder="******"
                        type={show ? "text" : "password"}
                        control={control}
                        icon={FaLock}
                        errors={errors}
                        rightElement={
                            <button
                                type="button"
                                className="text-gray-400 hover:text-white transition duration-300"
                                onClick={() => setShow(!show)}
                                aria-label={show ? "Hide password" : "Show password"}
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        }
                    />

                    <button
                        type="submit"
                        className="w-36 h-12 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-white font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
                    >
                        Login
                    </button>
                </form>
            </ShineBorder>
        </div>
    );
};

export default RestaurantLogin;
