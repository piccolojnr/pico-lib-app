import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { get_profile, resend_confirmation_email, update_profile } from "../utils/auth";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import BookmarkedBooks from "../components/bookmarks";
import { Helmet } from "react-helmet";

function Profile() {
    const { user, authToken, refreshAuthToken } = useContext(AuthContext);
    const { email } = user;
    const [profile, setProfile] = useState(
        null
    );
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [editError, setEditError] = useState(null);
    const [confirmEmailSent, setConfirmEmailSent] = useState(false);
    const [loadingCE, setLoadingCE] = useState(false)

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line 
    }, [authToken]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await getProfileWithRetry(authToken);
            setProfile(response.profile);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    const getProfileWithRetry = async (token) => {
        try {
            const res = await get_profile(token.auth_token);
            if (res.status === 401) {
                const refreshedToken = await refreshAuthToken(token.refresh_token);
                return await get_profile(refreshedToken.auth.auth_token);
            }
            return res;
        } catch (error) {
            console.error('Error fetching profile:', error);

        }
    };

    const handleEmailConfirmation = async () => {
        setLoadingCE(true);
        try {
            const response = await resend_confirmation_email(authToken.auth_token);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                return await resend_confirmation_email(refreshedToken.auth.auth_token);
            }
            setConfirmEmailSent(true);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            setConfirmEmailSent(false);
        } finally {
            setLoadingCE(false);
        }
    };


    const formatDate = (dateString) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!profile) {
            return;
        }
        const updatedProfile = {
            ...profile,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            location: e.target.location.value,
            bio: e.target.bio.value,
        };


        setLoadingEdit(true);
        setEditError(null);
        try {
            const response = await update_profile(authToken.auth_token, updatedProfile);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                await update_profile(refreshedToken.auth.auth_token, updatedProfile);
            }
            if (response.status === 200) {
                setProfile(prev => {
                    return {
                        ...prev,
                        ...updatedProfile
                    }
                });
                setShowEdit(false);
            }
            else {
                console.log(response);
                throw new Error('Failed to update profile');
            }
        }
        catch (error) {
            console.error('Error updating profile:', error);
            setEditError(error.message);
        }
        finally {
            setLoadingEdit(false);
        }
    }
    return (
        loading || !profile ?
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                            <div className="w-32 h-6 bg-gray-300 mb-2"></div>
                            <div className="w-24 h-4 bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="w-full h-4 bg-gray-300 mb-2"></div>
                        <div className="w-full h-4 bg-gray-300 mb-2"></div>
                        <div className="w-3/4 h-4 bg-gray-300"></div>
                    </div>
                </div>
            </div> :
            <div>
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <Helmet>
                        <title>
                            {profile.first_name} {profile.last_name} | Pico-Library
                        </title>
                    </Helmet>
                    {!profile?.user.is_email_confirmed && (
                        <div className={`${confirmEmailSent ? "bg-green-300 text-gray-800" : "bg-yellow-200 text-white-800"}  p-4 mb-4 rounded-t-md`}>
                            {
                                confirmEmailSent ?
                                    <p>Email confirmation sent successfully. Please check your email</p>
                                    :
                                    <>   <p>Your email is not confirmed. Please click the button below to confirm your email.</p>
                                        <button disabled={loadingCE} className={`px-4 py-2 ${loadingCE ? "opacity-55" : ""}  bg-yellow-500 text-white rounded-md`} onClick={handleEmailConfirmation}>Confirm Email</button>
                                    </>
                            }
                        </div>
                    )}
                    <form className="p-6" onSubmit={handleUpdateProfile}>
                        <div className="flex items-center mb-6">
                            <img className="w-16 h-16 rounded-full mr-4" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${email}`} alt={profile.first_name} />
                            <div>
                                <h2 className="text-xl font-bold">{profile.first_name} {profile.last_name}</h2>
                                <p className="text-gray-600">{email}</p>
                            </div>
                        </div>
                        {
                            showEdit &&
                            <div className="mb-4">
                                <div className="">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="first_name">First name</label>
                                    <input className="w-full p-2 border border-gray-300 rounded-md" name="first_name" type="text" defaultValue={profile.first_name} />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="last_name">Last name</label>
                                    <input className="w-full p-2 border border-gray-300 rounded-md" name="last_name" type="text" defaultValue={profile.last_name} />
                                </div>
                            </div>

                        }
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Bio</h3>
                            {
                                showEdit ?
                                    <textarea name="bio" className="w-full h-32 p-2 border border-gray-300 rounded-md" defaultValue={profile.bio} />
                                    :
                                    profile.bio ? <p className="text-gray-700">{profile.bio}</p> : <p className="text-gray-700">No bio available</p>
                            }

                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Location</h3>
                            {
                                showEdit ?
                                    <input name="location" className="w-full p-2 border border-gray-300 rounded-md" defaultValue={profile.location} />
                                    :
                                    profile.location ? <p className="text-gray-700">{profile.location}</p> : <p className="text-gray-700">Location not provided</p>
                            }
                        </div>
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold">User Details</h3>
                            <p className="text-gray-700 text-xs">Admin: {profile.user.is_admin ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700 text-xs">Public ID: {profile.user.public_id}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-xs text-gray-500">Created At: {formatDate(profile.created_at)}</p>
                            <p className="text-xs text-gray-500">Updated At: {formatDate(profile.updated_at)}</p>
                        </div>
                        <div className="flex justify-end">
                            {
                                showEdit ?
                                    <div className="flex items-center justify-between w-full">
                                        <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setShowEdit(false)}>Cancel</button>
                                        <input disabled={loadingEdit} className={`px-4 py-2 bg-blue-500 text-white rounded-md ${loadingEdit ? "opacity-60" : "cursor-pointer"} `} type="submit" value={"Save"} />
                                    </div>
                                    :
                                    <div className="flex items-center justify-between w-full">
                                        <Link to={"/change-password"} className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md">Change Password</Link>
                                        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => setShowEdit(true)}>Edit</button>
                                    </div>
                            }
                        </div>
                        {
                            editError && <p className="text-red-500">{editError}</p>
                        }
                    </form>
                </div>

                <BookmarkedBooks />

            </div>
    );
}

export default Profile;