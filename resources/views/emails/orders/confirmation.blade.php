@component('mail::message')
{{-- Cabecera con logo --}}
<div style="text-align:center; padding:20px; background-color:#000000;">
    <img src="https://res.cloudinary.com/dcmjhycsr/image/upload/v1763825595/Captura_de_pantalla_2025-11-22_102220-removebg-preview_eur39c.png" 
         alt="Mi Empresa" 
         style="width:150px; max-width:100%; height:auto;">
</div>

# <span style="color:#c00000;">Pedido confirmado</span>

Hola {{ $order->user->name }},

Tu pedido ha sido recibido correctamente. Aquí tienes los detalles más importantes:

**ID de pedido:** {{ $order->id }}  
**Total:** Bs.{{ number_format($order->total, 2) }}  
**Tipo de envío:** {{ ucfirst($order->note) }}  
**Fecha de entrega:** {{ $order->delivery_date ? $order->delivery_date->format('d/m/Y') : 'N/A' }}  
**Hora de entrega:** {{ $order->delivery_time ?? 'N/A' }}

@component('mail::table')
| Producto | Cantidad | Precio | Subtotal |
|----------|----------|-------|---------|
@foreach ($items as $item)
| {{ $item->product->name }} | {{ $item->quantity }} | Bs.{{ number_format($item->price, 2) }} | Bs.{{ number_format($item->subtotal, 2) }} |
@endforeach
@endcomponent

<div style="color:#c00000; font-weight:bold; margin-top:20px;">
Gracias por comprar con nosotros!
</div>

@endcomponent
