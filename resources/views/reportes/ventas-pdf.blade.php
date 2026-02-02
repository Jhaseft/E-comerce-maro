<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Ventas</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #000; padding: 5px; text-align: left; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>

    <h2>Reporte de Ventas</h2>
    <p>Desde: {{ $desde }} — Hasta: {{ $hasta }}</p>

    <h3>Resumen General</h3>
    <p>Total de pedidos: {{ $totales->total_pedidos ?? 0 }}</p>
    <p>Total vendido: $ {{ number_format($totales->total_vendido ?? 0, 2) }}</p>
    <p>Total de productos vendidos: {{ $totales->total_items_vendidos ?? 0 }}</p>


    <h3>Productos Vendidos por Talla</h3>
    <table>
        <thead>
            <tr>
                <th>Orden</th>
                <th>Producto</th>
                <th>Talla</th>
                <th>Precio Unitario ($)</th>
                <th>Cantidad Total</th>
                <th>Total Generado ($)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos as $p)
                <tr>
                    <td>{{ $p->orden_id }}</td>
                    <td>{{ $p->producto }}</td>
                    <td>{{ $p->talla }}</td>
                    <td>{{ number_format($p->precio_unitario, 2) }}</td>
                    <td>{{ $p->cantidad_total }}</td>
                    <td>{{ number_format($p->total_generado, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
