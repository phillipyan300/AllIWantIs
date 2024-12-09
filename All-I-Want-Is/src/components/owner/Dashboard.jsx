import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import UserTree from "./UserTree"; // Import the Tree component
import "./Dashboard.css";
import ShareButton from './ShareButton';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="dashboard">
      <h1 className="dashboard-name">{user.name}'s Tree</h1>
      <img
        src={user.avatar_url}
        alt={`${user.name}'s profile`}
        className="profile-picture"
      />
      <UserTree userEmail={user.email} userName={user.name} userAvatarLink={user.avatar_url} />
      <ShareButton userEmail={user.email}/>
      </div>
  );
}

export default Dashboard;
