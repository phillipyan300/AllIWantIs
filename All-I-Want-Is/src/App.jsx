import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Safely access environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// console.log(import.meta.env);
// console.log(SUPABASE_URL);
// console.log(SUPABASE_KEY);


// TODO: Add an env var for these secrets
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
function App() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
    }, []);


  async function getUsers() {
    try {
      const { data } = await supabase.from("Users").select();
      setUsers(data);
      console.log(users)
    }
    catch (error) {
      setError(error.message);
      console.error("Error fetching users:", error);
  }
}

  return (
    <ul>
      {users.map((user) => (
        <li key={user.user_name}>{user.user_name}</li>
      ))}
    </ul>
  );
}

export default App;