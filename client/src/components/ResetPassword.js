import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams(); // Extract the token from the URL
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the new password to the backend with the token
            const response = await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { newPassword });

            // Display a message to the user
            console.log(response.data);

            // If the response was successful, navigate to the login page
            navigate('/login');
        } catch (error) {
            // Handle errors (e.g., network errors, server errors)
            console.error('Error resetting password:', error);
            console.log('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
