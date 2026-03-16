'use client'
import { useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";

export default function Autenticacao() {
    const [form, setForm] = useState('login');
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="border-white-500 border-2 rounded w-1/3 h-auto p-10 gap-4 flex flex-col">
                {form === 'login' ? <Login /> : <Registro />}
                <hr />
                <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setForm(form === 'login' ? 'registro' : 'login')}>{form === 'login' ? 'Registrar' : 'Login'}</button>
            </div>
        </main>
    );
}