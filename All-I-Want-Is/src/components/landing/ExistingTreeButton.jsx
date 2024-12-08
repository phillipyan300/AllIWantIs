import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../login/Login.css";


// COPY OF LOGIN BUTTON, JUST DIFFERNT
const REDIRECT_URL = import.meta.env.VITE_SUPABASE_REDIRECT_URL;

function ExistingTreeButton() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: REDIRECT_URL,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.log("Sign-in successful!");
      navigate('/existing-tree'); // Redirect to '/existing-tree' after successful login
    }
  };

  return (
    <button className="existing-tree" onClick={handleGoogleSignIn}>
      I Already Have a Tree
    </button>
  );
}

export default ExistingTreeButton;
