import Link from "next/link";

const HomePage = () => {
  return (
    <main className="absolute top-0 left-0 w-full h-screen">
      <img
        src="/background.jpeg"
        alt="Taste-Trails"
        className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      <div className="relative md:pt-14 flex flex-col items-center justify-center h-screen text-center text-black">
        <h1 className="md:mb-8 mb-4 md:text-6xl text-2xl font-bold">
          Welcome to TASTE-TRAILS
        </h1>
        <p className="md:mb-8 mb-4 md:text-3xl text-xl">
          Discover delicious recipes for every occasion!
        </p>
        <Link
          href="/recipe-list?page=1"
          className="md:w-52 md:h-14 px-6 py-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-300"
        >
          Explore Recipes
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
