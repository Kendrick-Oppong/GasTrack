import { CustomerNames as WorkerNames} from "@/components/admin";
import { getAllWorkers } from "@/lib/admin/getWorkers";
import React from "react";

const DispatchRidersPage = async () => {
  const workers = await getAllWorkers();
  return (
    <section className="pb-10">
      {!workers?.length ? (
        <p className="my-4 px-5 text-center font-semibold">
          No workers found
        </p>
      ) : (
        <>
          <h1 className="text-lg px-5 font-semibold ">
            All Workers <span>({workers?.length})</span>
          </h1>
          <WorkerNames users={workers} />
        </>
      )}
    </section>
  );
};

export default DispatchRidersPage;
