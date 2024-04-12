import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


function Profile() {
    const { user, base_api_url } = useContext(AuthContext);
    const { email } = user;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full mr-4" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${email}`} alt={"name"} />
                    <div>
                        <h2 className="text-xl font-bold">{"john doe"}</h2>
                        <p className="text-gray-600">{email}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Bio</h3>
                    <p className="text-gray-700">{"bio"}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;