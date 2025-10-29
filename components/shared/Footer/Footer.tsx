import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-4 px-6 border-t bg-white w-full">
      <div className="flex justify-between items-center text-sm text-slate-500">
        <p>2025 &copy; Todos los derechos reservados.</p>
        <div className="flex gap-2 items-center">
          <Link href="/privacy-policy">Política de privacidad</Link>
          <Link href="/terms">Términos de uso</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
