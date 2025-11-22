import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Restablecer Contraseña" />

            <form
                onSubmit={submit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border"
            >
                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://res.cloudinary.com/dcmjhycsr/image/upload/v1763825595/Captura_de_pantalla_2025-11-22_102220-removebg-preview_eur39c.png"
                        alt="Logo"
                        className="h-24 object-contain"
                    />
                </div>

                {/* Email */}
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}

                {/* Password */}
                <label className="block text-gray-700 mt-4 mb-1">Contraseña</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}

                {/* Confirm Password */}
                <label className="block text-gray-700 mt-4 mb-1">Confirmar Contraseña</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                />
                {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password_confirmation}
                    </p>
                )}

                {/* Botón */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Restablecer Contraseña
                </button>
            </form>
        </div>
    );
}
