<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ReporteVentasExport implements FromCollection, WithHeadings, WithMapping
{
    protected $desde;
    protected $hasta;

    public function __construct($desde, $hasta)
    {
        $this->desde = $desde;
        $this->hasta = $hasta;
    }

    public function collection()
    {
        return DB::table('order_items as oi')
            ->join('orders as o', 'o.id', '=', 'oi.order_id')
            ->join('products as p', 'p.id', '=', 'oi.product_id')

            ->join('product_variants as pv', 'pv.sku', '=', 'oi.sku')
            ->join('product_variant_values as pvv', 'pvv.variant_id', '=', 'pv.id')
            ->join('product_attribute_values as pav', 'pav.id', '=', 'pvv.attribute_value_id')
            ->join('product_attributes as pa', 'pa.id', '=', 'pav.attribute_id')

            ->where('pa.name', 'Talla')
            ->whereBetween(DB::raw('DATE(o.created_at)'), [$this->desde, $this->hasta])

            ->select(
                'o.id as orden_id',
                'p.name as producto',
                'pav.value as talla',
                'oi.price as precio_unitario',
                DB::raw('SUM(oi.quantity) as cantidad_total'),
                DB::raw('SUM(oi.subtotal) as total_generado')
            )
            ->groupBy(
                'o.id',
                'p.name',
                'pav.value',
                'oi.price'
            )
            ->orderBy('o.id', 'asc')
            ->get();
    }

    /** Encabezados del Excel */
    public function headings(): array
    {
        return [
            'Orden',
            'Producto',
            'Talla',
            'Precio Unitario ($)',
            'Cantidad Total',
            'Total Generado ($)',
        ];
    }

    /** Formato de cada fila */
    public function map($row): array
    {
        return [
            $row->orden_id,
            $row->producto,
            $row->talla,
            number_format($row->precio_unitario, 2),
            $row->cantidad_total,
            number_format($row->total_generado, 2),
        ];
    }
}