'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Header from '../components/Header'; // Import the Header component

// Define the Preference interface
interface Preference {
    source: string;
    category: string;
    author: string;
}

// Update the Preferences component
const Preferences = (): JSX.Element => {
    const [preferences, setPreferences] = useState<Preference | null>(null); // Type preferences as Preference or null
    const [error, setError] = useState<string | null>(null); // Type error as string or null
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/preferences`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch preferences');
                }

                const data: Preference = await response.json(); // Type data as Preference
                setPreferences(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message); // Ensure error is an instance of Error
                }
            }
        };

        fetchPreferences();
    }, []);

    const handleAddPreference = () => {
        router.push('/preferences/create'); // Redirect to the create preference page
    };

    return (
        <div>
            <Header /> {/* Add the Header component here */}
            <main className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">User Preferences</h1>
                <button
                    onClick={handleAddPreference}
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
                >
                    Add Preference
                </button>
            </main>
            <div className="p-4">
               {error && <p className="text-red-500">Error: {error}</p>}
                {preferences ? ( // Ensure preferences is not null or undefined
                    <div>
                        {Array.isArray(preferences) && preferences.length > 0 ? ( // Check if preferences is an array and has elements
                            preferences.map((preference, index) => ( // Use map to iterate over each preference
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4"> {/* Use a unique key for each item */}
                                    <ul className="space-y-2">
                                        <li className="text-lg">
                                            Source: <span className="font-semibold">{preference.source}</span>
                                        </li>
                                        <li className="text-lg">
                                            Category: <span className="font-semibold">{preference.category}</span>
                                        </li>
                                        <li className="text-lg">
                                            Author: <span className="font-semibold">{preference.author}</span>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No preferences found.</p> // Message if no preferences are available
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">Loading preferences...</p>
                )}

            </div>
        </div>
    );
};

export default Preferences;
