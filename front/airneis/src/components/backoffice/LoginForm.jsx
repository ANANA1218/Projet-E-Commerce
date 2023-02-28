import React from "react"
import Input from "./Input";

const LoginForm = () => {

    return (
        <div className='grid h-screen w-full'>
            <div className='bg-gray-900 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto rounded-lg bg-white/5 p-8 px-8'>
                    <h2 className='text-4xl text-white font-bold text-center mb-8'>Connexion au Backoffice</h2>

                    <Input label={"Email"} type={"text"} />
                    <Input label={"Mot de passe"} type={"password"} />

                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg text-white font-semibold rounded-lg'>Connexion</button>

                </form>
            </div>
        </div>
    );
}

export default LoginForm;