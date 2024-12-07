import supabase from "../supabaseClient";
import "./Login.css";

const REDIRECT_URL = import.meta.env.VITE_SUPABASE_REDIRECT_URL;

function Login() {
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
    }
  };

  return (
    <div className="login-container">
      <button className="next-button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
