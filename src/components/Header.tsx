import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Parqueadero
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/residentes"
                className="hover:text-gray-300 transition-colors"
              >
                Residentes
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
