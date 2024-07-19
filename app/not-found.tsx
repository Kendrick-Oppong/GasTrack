import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="mt-10 grid place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-400">404</h1>

        <p className="my-4 text-2xl font-bold tracking-tight sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We couldn&apos;t find that page.</p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-primary px-5 py-3 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
