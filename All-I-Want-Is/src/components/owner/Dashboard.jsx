import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import UserTree from "./UserTree"; // Import the Tree component
import "./Dashboard.css";
import ShareButton from "./ShareButton";
import Snowfall from "react-snowfall"; // Import the Snowfall component

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSnowing, setIsSnowing] = useState(false); // State for snow toggle

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (session?.session?.user) {
        const { email, name, avatar_url } = session.session.user.user_metadata;
        setUser({ email, name, avatar_url });
      } else {
        console.error("No user is logged in.");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data. Please log in.</div>;
  }

  return (
    <div className={`dashboard ${isSnowing ? "snowing" : ""}`}>
      {/* Show snowfall only when isSnowing is true */}
      {isSnowing && <Snowfall snowflakeCount={300} />}
      
      {/* Dashboard Header */}
      <h1 className="dashboard-name">{user.name}'s Tree</h1>
      <img
        src={user.avatar_url}
        alt={`${user.name}'s profile`}
        className="profile-picture"
      />
      <UserTree userEmail={user.email} userName={user.name} userAvatarLink={user.avatar_url} />
      <ShareButton userEmail={user.email} />

      {/* "Let it Snow!" Button */}
      <button className="snow-toggle-button" onClick={() => setIsSnowing(!isSnowing)}>
        {isSnowing ? "Stop the Snow!" : "Let it Snow!"}
      </button>
    </div>
  );
}

export default Dashboard;
