const StepProgress = ({ steps, currentIndex }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg p-4">
      <div className="relative flex justify-between gap-4">
        {/* ✅ الخط الخلفي الرمادي */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -translate-y-1/2 rounded-full"></div>

        {/* ✅ الخط الأمامي الملون (progress line) */}
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-l from-myGreen via-myBlue to-myPurple -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={index}
              className={`w-8 h-8  z-10 flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-700
                  ${
                    isActive
                      ? "bg-myGreen text-white border-myGreen scale-110"
                      : isCompleted
                      ? "bg-myPurple text-white border-myPurple"
                      : "bg-white text-gray-500 border-gray-300"
                  }
                `}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
