import { StationList } from "@/components/admin";
import { getAllStations } from "@/lib/admin/getStations";
import React from "react";

const StationsPage = async () => {
  const stations = await getAllStations();
  return (
    <section className="pb-10">
      {!stations?.length ? (
        <p className="my-4 px-5 text-center font-semibold">
          No stations found
        </p>
      ) : (
        <>
          <h1 className="text-lg px-5 font-semibold ">
            All Stations <span>({stations?.length})</span>
          </h1>
          <StationList stations={stations} />
        </>
      )}
    </section>
  );
};

export default StationsPage;
