<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tu pedido fue entregado</title>
</head>

<body style="margin:0; padding:0; background-color:#f2f2f2; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f2; padding:40px 0;">
    <tr>
        <td align="center">

            <!-- CARD -->
            <table width="600" cellpadding="0" cellspacing="0"
                   style="background-color:#231f20; border-radius:14px; padding:32px;">
                <tr>
                    <td>

                        <!-- Logo -->
                        <div style="text-align:center; margin-bottom:25px;">
                            <img
                                src="https://res.cloudinary.com/dnbklbswg/image/upload/v1765627552/Captura_de_pantalla_2025-12-13_075927-removebg-preview_m4lqsz.png"
                                alt="Maro"
                                style="width:150px;"
                            >
                        </div>

                        <!-- Título -->
                        <h2 style="text-align:center; color:#ffffff; margin-bottom:8px;">
                            ¡Gracias por tu compra, {{ $order->customer_name }}!
                        </h2>

                        <p style="text-align:center; color:#cccccc; margin-bottom:25px;">
                            Tu pedido ha sido <strong>entregado correctamente</strong>.
                        </p>

                        <!-- Pedido -->
                        <div style="
                            background:#2f2b2c;
                            padding:18px;
                            border-radius:12px;
                            text-align:center;
                            margin-bottom:30px;
                            border:1px solid #3a3637;
                        ">
                            <p style="margin:0; font-size:13px; color:#bfbfbf; letter-spacing:1px;">
                                NÚMERO DE PEDIDO
                            </p>
                            <p style="
                                margin:8px 0 0;
                                font-size:26px;
                                font-weight:bold;
                                color:#ffffff;
                                letter-spacing:2px;
                            ">
                                #{{ $order->id }}
                            </p>
                        </div>

                        <!-- Productos -->
                        <table width="100%" cellpadding="0" cellspacing="0"
                               style="border-collapse:collapse; margin-bottom:25px; color:#ffffff;">
                            <thead>
                                <tr style="background-color:#2f2b2c;">
                                    <th style="padding:10px; text-align:left;">Producto</th>
                                    <th style="padding:10px; text-align:center;">Cant.</th>
                                </tr>
                            </thead>
                            <tbody>
                               @foreach($order->items as $item)
                                <tr>
                                    <td style="padding:10px; border-bottom:1px solid #3a3637;">
                                        {{ optional($item->product)->name ?? 'Producto' }}
                                        <br>
                                        @php
                                            $talla = $item->variant?->values
                                                ->firstWhere('attribute.name', 'Talla')
                                                ?->value;
                                        @endphp
                                        <small style="color:#b0b0b0;">
                                            Talla: {{ $talla ?? '—' }}
                                        </small>
                                    </td>

                                    <td style="padding:10px; text-align:center; border-bottom:1px solid #3a3637;">
                                        {{ $item->quantity }}
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>

                        <!-- Total -->
                        <div style="
                            background:#2f2b2c;
                            padding:18px;
                            border-radius:12px;
                            text-align:right;
                            color:#ffffff;
                            font-size:16px;
                            font-weight:bold;
                        ">
                            Total pagado: {{ number_format($order->total, 2) }} $
                        </div>

                        <!-- Footer -->
                        <p style="margin-top:30px; text-align:center; color:#bfbfbf; font-size:13px;">
                            ¡Esperamos verte pronto nuevamente! 🤍<br>
                            <strong style="color:#ffffff;">Maro</strong>
                        </p>

                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>

</body>
</html>
