import { useState } from "react";

export default function ReportsSection() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const exportFile = (type) => {
    if (!desde || !hasta) {
      alert("Seleccione un rango de fechas antes de exportar.");
      return;
    }

    const url = `/admin/reportes/${type === "excel" ? "excel" : type === "csv" ? "csv" : "pdf"}?desde=${desde}&hasta=${hasta}`;

    if (type === "pdf") {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };

  const exportFileprod = (type) => {
    const url = `/admin/${type === "excel" ? "productos/excel" : type === "csv" ? "productos/csv" : "productos/pdf"}`;

    if (type === "pdf") {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  }; 

  return (
    <div className="flex flex-col items-center w-full pt-10 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Reportes de Ventas</h2>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha desde</label>
              <input
                type="date"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha hasta</label>
              <input
                type="date"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => exportFile("pdf")}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Exportar PDF Ventas
            </button>
            <button
              onClick={() => exportFile("excel")}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Exportar Excel Ventas
            </button>
             
            <button
              onClick={() => exportFileprod("pdf")}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Exportar PDF Productos
            </button>
            <button
              onClick={() => exportFileprod("excel")}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Exportar Excel Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}