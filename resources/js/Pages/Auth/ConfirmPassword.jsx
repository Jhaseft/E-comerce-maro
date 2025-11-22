import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Confirmar Contraseña" />

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

                <p className="text-gray-600 text-sm mb-4 text-center">
                    Esta área es segura. Debes confirmar tu contraseña antes de continuar.
                </p>

                {/* Password */}
                <label className="block text-gray-700 mb-1">Contraseña</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}

                {/* Botón */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    {processing ? "Procesando..." : "Confirmar"}
                </button>
            </form>
        </div>
    );
}
