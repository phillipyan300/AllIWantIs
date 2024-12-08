import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Safely access environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// TO Test, same id as existing what happens, can i use the auth value to do id?, does id need to increentn by one by one
// Test if gift s need to be wrapped in string? Or can just use a dict? idk
function InsertTableTest() {
    const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    insertUser();
    }, []);

    async function insertUser() {
        try {
          const { data } = await supabase.from("Users").insert({ id: 10, user_name: 'testman1', gifts: { id: 1, gift_name: 'testgift1'} });
          setUsers(data);
          console.log(users)
        }
        catch (error) {
          setError(error.message);
          console.error("Error fetching users:", error);
      }
    }





}
export default InsertTableTest



