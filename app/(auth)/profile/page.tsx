import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserDetails } from "@/lib/user/getUserBooking";
import { ProfileForm } from "@/components/form";

const UserProfilePage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login?");
  }

  const userDetails = await getUserDetails();
  const initials =
    userDetails &&
    (userDetails.firstName ? userDetails.firstName[0] : "") +
      (userDetails.lastName ? userDetails.lastName[0] : "");

  return (
    <>
      {" "}
      <section className="bg-[url('/profile-banner.jpg')] bg-no-repeat bg-center bg-cover h-96 w-full">
        <h1 className="flex items-center justify-center w-full h-full text-primary bg-black/90 dark:bg-black/70">
          Profile
        </h1>
      </section>
      <section className="my-12">
        <Tabs defaultValue="Profile">
          <div className="text-center">
            <TabsList className="w-fit font-semibold">
              <TabsTrigger value="Profile" className="flex-1">
                Your Profile
              </TabsTrigger>
              <TabsTrigger value="Edit_Profile" className="flex-1">
                Edit Profile
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Profile" className="mx-3 lg:mx-5">
            <div className="border border-primary rounded-md py-10 mt-8 grid grid-cols-1 md:grid-cols-2">
              {" "}
              <div className="self-center">
                <Image
                  src={`https://avatar.vercel.sh/rauchg.svg?text=${initials}`}
                  width={300}
                  height={300}
                  alt=""
                  className="rounded-full m-auto size-[200px] sm:size-[300px]"
                />
              </div>
              <div className="mt-8 px-3 lg:px-0 lg:mt-0">
                <h2 className="text-xl text-primary lg:text-2xl font-bold">
                  Manage your Name, ID and Email Addresses
                </h2>
                <p className="my-4">
                  Below are the names and email addresses currently associated
                  with your account
                </p>
                <div className="[&>div]:sm:grid [&>div]:grid-cols-3 [&>div]:items-center [&>div]:gap-4 space-y-4">
                  <div>
                    <p className="font-semibold">Your name</p>
                    <p className="col-span-2">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Your ID</p>
                    <p className="col-span-2">{userDetails?.id}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email </p>
                    <p className="col-span-2">{userDetails?.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Number</p>
                    <p className="col-span-2">{userDetails?.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Role</p>
                    <p className="col-span-2">{userDetails?.role}</p>
                  </div>
                  <div>
                    <p className="font-semibold"> Address</p>
                    <p className="col-span-2">{userDetails?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Edit_Profile" className="mx-5">
            <ProfileForm userDetails ={userDetails}/>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default UserProfilePage;
