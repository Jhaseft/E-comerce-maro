import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';

export default function CheckoutHeader() {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold text-brandGold">Checkout</h1>
                <h2 className="text-4xl font-semibold text-white">Distribuidora Aguilar</h2>
            </div>
            <Link href="/" className="text-white hover:text-brandGold">
                <Home size={28} />
            </Link>
        </div>
    );
}
