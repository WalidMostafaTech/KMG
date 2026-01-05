import Loader from "./Loader";

const LoadingModal = () => {
  return (
    <section className="fixed inset-0 w-full h-svh flex items-center justify-center">
      <Loader />
    </section>
  );
};

export default LoadingModal;
