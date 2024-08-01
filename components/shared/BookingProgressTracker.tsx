// components/shared/BookingProgressTracker.js

const statusStages = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];

const BookingProgressTracker = ({ status }: { status: string }) => {
  const currentStageIndex = statusStages.indexOf(status);

  return (
    <div className="relative md:flex items-center justify-between space-y-4 md:space-y-0 w-full">
      {statusStages.map((stage, index) => (
        <div key={stage} className="relative flex items-center w-full ">
          <div className="flex items-center">
            <div
              className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStageIndex
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 ${
                index <= currentStageIndex
                  ? "text-primary font-medium"
                  : "text-gray-600"
              }`}
            >
              {stage.charAt(0) + stage.slice(1).toLowerCase()}
            </span>
          </div>
          {index < statusStages.length - 1 && (
            <div className="hidden md:inline-flex md:flex-1 h-1 mx-2 bg-gray-300 relative">
              <div
                className={`h-full ${
                  index < currentStageIndex ? "bg-primary" : "bg-gray-300"
                }`}
                style={{ width: `${currentStageIndex >= index ? 100 : 0}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingProgressTracker;
