import { useSelector } from "react-redux";
const Profile = () => {
  const auth = useSelector((state) => state?.auth?.user);
  console.log("auth", auth);
  return (
    <div>
      <h1>Profile</h1>
      <p>Username:{auth?.username}</p>
      <p>Email:{auth?.email}</p>
    </div>
  );
};

export default Profile;
