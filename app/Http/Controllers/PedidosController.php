<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Cart;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Mail\OrderConfirmation;

class PedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('checkout');
    } 

    public function store(Request $request)
{
    $request->validate([
        'customer_name' => 'required|string|max:255',
        'customer_phone' => 'required|string|max:20',
        'shipping_type' => 'required|in:local,envio',
        'delivery_date' => 'required|date',
        'delivery_time' => 'required|string',
        'address' => 'required|string',
        'cart' => 'required|array|min:1',
        'cart.*.id' => 'required|exists:products,id',
        'cart.*.quantity' => 'required|integer|min:1',
        'cart.*.price' => 'required|numeric|min:0',
        'subtotal' => 'required|numeric|min:0',
        'total' => 'required|numeric|min:0',
    ]);

    try {
        $order = Order::create([
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'status_id' => 1,
            'payment_method_id' => $request->payment_method_id ?? 1,
            'total' => $request->total,
            'note' => $request->shipping_type === 'envio' ? $request->address : 'Recojo en el local',
            'delivery_date' => $request->delivery_date,
            'delivery_time' => $request->delivery_time,
        ]);

        foreach ($request->cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => round($item['price'], 2),
                'subtotal' => round($item['quantity'] * $item['price'], 2),
            ]);
        }

        if (class_exists('Cart')) {
            try { Cart::destroy(); } catch (\Exception $e) { \Log::warning("Carrito no vaciado: ".$e->getMessage()); }
        }

      return Inertia::location(route('welcome'));

    } catch (\Exception $e) {
        \Log::error("Error creando pedido: ".$e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Error al crear el pedido: '.$e->getMessage()
        ], 500);
    }
}

}
