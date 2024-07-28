import dynamic from "next/dynamic";
import { getAllStations } from "@/lib/admin/getStations";
import { Loader } from "lucide-react";

const StationsMap = dynamic(() => import("@/components/admin/Map"), {
  loading: () => (
    <p className="flex justify-center items-center gap-1 text-primary">
      Loading Map <Loader className="animate-spin" />
    </p>
  ),
  ssr: false,
});

const MapPage = async () => {
  const stations = await getAllStations();

  return (
    <section className="pb-10">
      {!stations?.length ? (
        <p className="my-4 px-5 text-center font-semibold">No stations found</p>
      ) : (
        <>
          <h1 className="text-lg px-5 font-semibold mb-6">
            All Stations <span>({stations?.length})</span>
          </h1>
          <StationsMap stations={stations} />
        </>
      )}
    </section>
  );
};

export default MapPage;
