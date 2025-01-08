import React from "react";
import { Controller } from "react-hook-form";

const FormInput = ({ name, label, placeholder, type = "text", control, register, icon: Icon, errors, rightElement, options = [], additionalClass = "", value = "", ...rest }) => {
    const isControlled = Boolean(control);

    return (
        <div className="relative">
            <label className="block mb-1 text-sm sm:text-lg">{label}:</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-3 text-gray-400 text-xl" />}
                {type === "select" && options.length > 0 ? (
                    isControlled ? (
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className={`w-full h-10 pl-3 pr-10 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] && "border-2 border-red-500"
                                        } ${additionalClass}`}
                                    {...rest}
                                >
                                    {options.map((option, idx) => (
                                        <option key={idx} value={option.toLowerCase()}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    ) : (
                        <select
                            {...register(name)}
                            className={`w-full h-10 pl-3 pr-10 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] && "border-2 border-red-500"
                                } ${additionalClass}`}
                            {...rest}
                        >
                            {options.map((option, idx) => (
                                <option key={idx} value={option.toLowerCase()}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )
                ) : isControlled ? (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                className={`w-full h-10 pl-10 pr-10 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] && "border-2 border-red-500"
                                    } ${additionalClass}`}
                                {...rest}
                            />
                        )}
                    />
                ) : (
                    <input
                        {...register(name)}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full h-10 pl-10 pr-10 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] && "border-2 border-red-500"
                            } ${additionalClass}`}
                        {...rest}
                    />
                )}
                {rightElement && <div className="absolute right-3 top-3">{rightElement}</div>}
            </div>
            {errors[name] && <p className="text-red-700 text-sm mt-1">{errors[name]?.message}</p>}
        </div>
    );
};

export default FormInput;
