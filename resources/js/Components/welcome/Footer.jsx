export default function Footer() {
  return (
    <footer className="bg-black text-center py-6 mt-10 border-t-2 border-[#D4AF37] shadow-inner">
      <p className="text-[#D4AF37] font-medium tracking-wide">
        © {new Date().getFullYear()} Distribuidora Aguilar — Todos los derechos reservados.
      </p>
    </footer>
  );
}
