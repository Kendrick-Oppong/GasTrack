import prisma from "../db";

export const getAllWorkers = async () => {
  try {
    const workers = await prisma.worker.findMany();
    if (workers.length === 0) {
      return [];
    }
    return workers;
   
  } catch (error) {
    console.error("Failed to fetch workers:", error);
  
  }
};
