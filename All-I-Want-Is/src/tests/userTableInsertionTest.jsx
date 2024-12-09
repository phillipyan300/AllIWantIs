import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function InsertTableTest() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // First, fetch the session
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const { data: session } = await supabase.auth.getSession();

            if (session?.session?.user) {
                const { email, name, avatar_url } = session.session.user.user_metadata;
                setUser({ email, name, avatar_url });
                // Only try to insert after we have the user
                await insertUser({ email, name, avatar_url });
            } else {
                setError("No user is logged in.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };




    

    const insertUser = async (userData) => {
        if (!userData?.email) {
            console.error("No user email available");
            return;
        }

        try {
            const { data, error } = await supabase.from("Users").upsert({ 
                id: 37,
                email: userData.email,
                user_name: 'testman1',
                gifts: [
                    {
                      "ornament": {
                        "type": "Ball 6",
                        "image": "/balls/ball6.png"
                      },
                      "wish": {
                        "title": "New Bike",
                        "link": "https://ahrefs.com/traffic-checker/?input=ahrefs.com&mode=subdomains",
                        "description": "Blue mountain bike"
                      }
                    },
                
                    {
                      "ornament": {
                        "type": "Ball 1",
                        "image": "/balls/ball1.png"
                      },
                      "wish": {
                        "title": "Headphones",
                        "link": "https://www.amazon.com/Bluetooth-Headphones-KVIDIO-Microphone-Lightweight/dp/B09BF64J55/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.uBSCszTOHh74VMlFNpX5swfLMwusbUJVsMOJzvBVT7XyTm_WhGbnlUd3RfeAEyJY0jk7K8KCabWD9GemT88nVrEG7IHngb3OxEYvz5anMe_OLGZcXdWn1D3aywrOqIrBMKXMSstsxpCLfwbvlecf3Glv8KJGS_7vrwsr-ADAPijrUf-cM71vCXLH4SCOais_FnUPnGq16Dzx7fIQwEuNYWj1ma6pBvjlFAoe7HdGvc8.aw5k1IBcq1_LBoplNHG8cGxB5BO4ELt3VyzzcHIVk14&dib_tag=se&keywords=headphones&qid=1733701407&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
                        "description": "Noise cancelling"
                      }
                    }
                  ]
                    // Can add more gift objects here
            
            });
            if (error) throw error;
            setUsers(data);
            console.log("Insert successful:", data);
        } catch (error) {
            setError(error.message);
            console.error("Error inserting user:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {user ? (
                <div>User {user.email} inserted successfully</div>
            ) : (
                <div>No user logged in</div>
            )}
        </div>
    );
}

export default InsertTableTest;