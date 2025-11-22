import { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from "./GoogleLoginButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            preserveState: true,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Login" />

            <form
                onSubmit={submit}
                className="w-full max-w-md p-8 bg-white 
                           rounded-2xl shadow-xl border border-gray-200"
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link href="/" className="flex items-center">
                        <img
                            src="https://res.cloudinary.com/dcmjhycsr/image/upload/v1763825595/Captura_de_pantalla_2025-11-22_102220-removebg-preview_eur39c.png"
                            alt="Logo de la empresa"
                            className="h-24 w-24 object-contain "
                        />
                    </Link>
                </div>

                {/* Título */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Iniciar Sesión
                    <span className="block w-16 mx-auto mt-2 border-b-2 border-yellow-500"></span>
                </h2>

                {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                        autoComplete="username"
                    />
                    {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800 font-medium mb-1">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password}</p>}
                </div>

                {/* Recordarme */}
                <div className="mb-6 flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
                        Recordarme
                    </label>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-between mb-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-yellow-600 text-sm underline hover:text-yellow-500"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 rounded-lg font-medium text-white
                                    ${processing ? 'bg-gray-500' : 'bg-yellow-600 hover:bg-yellow-700'}
                                    transition-colors duration-200`}
                    >
                        {processing ? 'Procesando...' : 'Iniciar Sesión'}
                    </button>
                </div>

                {/* Google */}
                <div className="mt-6">
                    <GoogleLoginButton />
                </div>
            </form>
        </div>
    );
}
