// import { useEffect } from "react";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../AppContext/AppContext";
import useAuth from "../../hooks/useAuth";

import Loader from "../Loader/Loader";
import Posts from "../Posts/Posts";

const Profile = () => {
  // const { user: profileData } = useContext(AppContext);
  // const navigate = useNavigate();

  // //
  // useEffect(() => {
  //   if (!profileData) {
  //     navigate("/signIn");
  //   }
  // }, [profileData]);

  const profileData = useAuth();

  if (!profileData) return <Loader isLoading={true} />;

  return (
    <>
      <h1>Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
      <p>Phone: {profileData.phone}</p>
      {profileData.id && <Posts userId={profileData.id} />}
    </>
  );
};

export default Profile;
