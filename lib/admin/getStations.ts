import prisma from "../db";

export const getAllStations = async () => {
  try {
    const stations = await prisma.station.findMany();
    if (stations.length === 0) {
      return [];
    }
    return stations;
   
  } catch (error) {
    console.error("Failed to fetch stations:", error);
  }
};
