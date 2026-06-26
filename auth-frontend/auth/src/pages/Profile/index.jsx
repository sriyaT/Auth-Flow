import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state?.auth?.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl p-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl shadow-md">
            👤
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">My Profile</h1>

          <p className="mt-2 text-gray-500">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">
              {auth?.username}
            </span>{" "}
            👋
          </p>
        </div>

        {/* Information */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-600">
              Username
            </label>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
              {auth?.username}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-600">
              Email Address
            </label>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
              {auth?.email}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          {/* <button className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-gray-700 transition hover:bg-blue-700">
            Edit Profile
          </button> */}

          <button className="flex-1 rounded-xl border border-red-300 py-3 font-semibold text-red-600 transition hover:bg-red-50">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
