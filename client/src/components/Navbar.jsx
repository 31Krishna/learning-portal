import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          🎓 Learning Portal
        </Link>

        <div className="text-sm">
          GVCC Assignment
        </div>
      </div>
    </nav>
  );
}

export default Navbar;