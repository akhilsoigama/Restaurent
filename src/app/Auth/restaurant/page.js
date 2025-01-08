'use client'
import { useState } from "react";
import RestaurantLogin from "../RestaurantLogin";
import RestaurantSignup from'../RestaurantSignup';

const Rastaurant = () => {
    const [login, setLogin] = useState(true)
    return (
        <>
            <div className="min-h-screen max-w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white flex flex-col justify-center ">
                <h1 className="text-3xl font-semibold mb-4 text-center ">Rastaurant Login/Signup Page</h1>
                {
                    login ? <RestaurantSignup /> : <RestaurantLogin /> 
                }
                <button onClick={() => setLogin(!login)} className="text-center ">{login ?  "Already have an account?Login" : "create a new acount? Signup"}</button>
            </div>
        </>
    )
}

export default Rastaurant;
