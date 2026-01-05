import { Link } from "react-router";
import { Button } from "@/components/ui/Button";

const NotFound = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <Link to="/" replace className="mainBtn">
        <Button>Go Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
