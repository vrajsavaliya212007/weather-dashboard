import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-5">
      <h1 className="text-8xl font-black text-blue-600">404</h1>
      <h2 className="mt-5 text-3xl font-bold">Page Not Found</h2>
      <p className="mt-4 text-center text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
