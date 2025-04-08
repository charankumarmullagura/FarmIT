import { useEffect, useState } from "react";
import API from "../components/api";
import "../farmer/GetProfile1.css";

const GetProfile1 = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get(`/getprofilebyid`);
                if (response.status !== 200) {
                    throw new Error("Profile not found");
                }
                setProfile(response.data || {});
            } catch (err) {
                setError("Create profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <p className="custom-profile-loader">Loading profile...</p>;
    if (error) return <p className="custom-profile-error">Error: {error}</p>;

    return (
        <div className="custom-profile-wrapper">
            <div className="custom-profile-section">
                <h2 className="custom-profile-heading">User Profile</h2>
                {profile && Object.keys(profile).length > 0 ? (
                    <div className="custom-profile-content">
                        <div className="custom-profile-row"><span>Full Name:</span> <strong>{profile.fullName}</strong></div>
                        <div className="custom-profile-row"><span>Email Address:</span> <strong>{profile.EmailAddress}</strong></div>
                        <div className="custom-profile-row"><span>Phone Number:</span> <strong>{profile.PhoneNumber}</strong></div>
                        <div className="custom-profile-row"><span>Country:</span> <strong>{profile.Country}</strong></div>
                        <div className="custom-profile-row"><span>State:</span> <strong>{profile.State}</strong></div>
                        <div className="custom-profile-row"><span>City:</span> <strong>{profile.City}</strong></div>
                        <div className="custom-profile-row"><span>Postal Code:</span> <strong>{profile.PostalCode}</strong></div>
                        <div className="custom-profile-row"><span>Address:</span> <strong>{profile.Address}</strong></div>
                        <div className="custom-profile-row"><span>Date of Birth:</span> <strong>{profile.DateofBirth}</strong></div>
                        <div className="custom-profile-row"><span>Gender:</span> <strong>{profile.Gender}</strong></div>
                        <div className="custom-profile-row custom-profile-verified"><span>Verified:</span> <strong>{profile.isVerified ? "✅ Verified" : "⛔ Not Verified"}</strong></div>
                    </div>
                ) : (
                    <p className="custom-profile-empty">No profile data available.</p>
                )}
            </div>
        </div>
    );
};

export default GetProfile1;
