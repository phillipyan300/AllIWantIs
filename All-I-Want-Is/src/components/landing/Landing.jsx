import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../supabaseClient";
import Login from "../login/Login";


// For now, it will be static landing page, later on can have header which displays whether logged in or not

function Landing() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>This is a landing page</h1>
      <p>Welcome! Please log in to continue.</p>
      <Login />
    </div>
  );
}

export default Landing;