// DashboardViewer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import TreeViewer from './TreeViewer';
import './DashboardViewer.css';

function DashboardViewer() {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', decodedEmail)
          .single();

        if (error) throw error;

        if (data) {
          setUserData(data);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error loading tree");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [decodedEmail]);

  if (loading) {
    return (
      <div className="dashboard-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Loading wish list...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-viewer-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!userData) return <div>No wish list found</div>;

  return (
    <div className="dashboard-viewer">
      <h1 className="dashboard-viewer-name">{userData.name}'s Tree</h1>
      {userData.avatar_url && (
        <img
          src={userData.avatar_url}
          alt={`${userData.name}'s profile`}
          className="profile-picture"
        />
      )}
      <TreeViewer 
        userEmail={userData.email} 
        userName={userData.name} 
        userAvatarLink={userData.avatar_url}
      />
    </div>
  );
}

export default DashboardViewer;