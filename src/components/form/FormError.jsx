const FormError = ({ errorMsg }) => {
  return (
    <div
      className={`bg-red-800 text-white px-4 text-sm text-center rounded-lg overflow-hidden duration-300 ease-in-out ${
        !errorMsg ? "max-h-0" : "max-h-60 py-2"
      }`}
    >
      {errorMsg}
    </div>
  );
};

export default FormError;
