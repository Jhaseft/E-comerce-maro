import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from "./GoogleLoginButton";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Register" />

            <form
                onSubmit={submit}
                className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-200"
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link href="/" className="flex items-center">
                        <img
                            src="https://res.cloudinary.com/dcmjhycsr/image/upload/v1763825595/Captura_de_pantalla_2025-11-22_102220-removebg-preview_eur39c.png"
                            alt="Logo"
                            className="h-24 w-24 object-contain "
                        />
                    </Link>
                </div>

                {/* Título */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Crear Cuenta
                    <span className="block w-16 mx-auto mt-2 border-b-2 border-yellow-500"></span>
                </h2>

                {/* Nombre */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-800 font-medium mb-1">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                    {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name}</p>}
                </div>

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
                    />
                    {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password}</p>}
                </div>

                {/* Confirmación */}
                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-gray-800 font-medium mb-1">Confirmar Contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                    {errors.password_confirmation && <p className="text-red-600 mt-1 text-sm">{errors.password_confirmation}</p>}
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href={route('login')}
                        className="text-yellow-600 text-sm underline hover:text-yellow-500"
                    >
                        ¿Ya tienes cuenta?
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 rounded-lg font-medium text-white
                                    ${processing ? 'bg-gray-500' : 'bg-yellow-600 hover:bg-yellow-700'}
                                    transition-colors duration-200`}
                    >
                        {processing ? 'Procesando...' : 'Registrarse'}
                    </button>
                </div>

                {/* Google */}
                <GoogleLoginButton />
            </form>
        </div>
    );
}
