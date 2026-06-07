import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/auth/profile",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-card">

          <h1>👤 My Profile</h1>

          <div className="profile-info">

            <p>
              <strong>Name:</strong>
              {" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {user.email}
            </p>

            <p>
              <strong>Role:</strong>
              {" "}
              {user.role}
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;