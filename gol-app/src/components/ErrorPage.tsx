import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Nothing to see here.
      </h1>
      <h2 className="scroll-m-20 text-center text-2xl tracking-tight text-balance">
        <Link to="/" className="hover:underline">
          <a>Go to the home page</a>
        </Link>
      </h2>
    </>
  );
}
