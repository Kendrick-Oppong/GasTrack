import { CustomerNames } from "@/components/admin";
import { getAllUsers } from "@/lib/admin/getCustomers";

const CustomerPage = async () => {
  const userBookings = await getAllUsers();

  return (
    <section className="pb-10">
      {!userBookings.length ? (
        <p className="my-4 px-5 text-center font-semibold">No customers found</p>
      ) : (
        <>
          <h1 className="text-lg px-5 font-semibold ">All Customers <span>({userBookings.length})</span></h1>
        <CustomerNames users={userBookings} />
        </>
      )}
    </section>
  );
};

export default CustomerPage;
