import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container py-5">
      <div className="bg-white border rounded-4 shadow-sm p-4 p-md-5 text-center">
        <div className="display-6 fw-semibold mb-2">404</div>
        <div className="text-muted mb-4">That page doesn’t exist.</div>
        <Link className="btn btn-primary" to="/products">
          Go to products
        </Link>
      </div>
    </div>
  );
}

