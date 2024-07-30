export const getStatusBorderColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "border-green-500";
    case "DELIVERED":
      return "border-blue-500";
    case "CANCELLED":
      return "border-red-500";
    default:
      return "border-orange-500";
  }
};
