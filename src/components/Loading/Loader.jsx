const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />

      <h2 className="text-xl font-bold text-primary mt-4">Loading...</h2>
    </div>
  );
};

export default Loader;
