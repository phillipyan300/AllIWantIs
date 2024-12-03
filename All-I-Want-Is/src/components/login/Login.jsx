import supabase  from "../supabaseClient";

function Login() {
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5174/oauth/callback", // Replace with your app's callback URL
      }
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.log("Sign-in successful!");
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
