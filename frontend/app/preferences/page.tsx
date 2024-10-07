'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from '../components/Header'; 

interface Preference {
    source: string;
    category: string;
    author: string;
}

// Update the Preferences component
const Preferences = (): JSX.Element => {
    const [preferences, setPreferences] = useState<Preference | null>(null); 
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); 

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/preferences`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch preferences');
                }

                const data: Preference = await response.json();
                setPreferences(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message); 
                }
            }
        };

        fetchPreferences();
    }, []);

    const handleAddPreference = () => {
        router.push('/preferences/create'); 
    };

    return (
        <div>
            <Header /> 
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
                {preferences ? ( 
                    <div>
                        {Array.isArray(preferences) && preferences.length > 0 ? ( 
                            preferences.map((preference, index) => ( 
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4"> 
                                    <ul className="space-y-2">
                                        <li className="text-lg">
                                            Source: <span className="font-semibold">{preference.source}</span>
                                        </li>
                                        <li className="text-lg">
                                            Category: <span className="font-semibold">{preference.category}</span>
                                        </li>
                                        {/* <li className="text-lg">
                                            Author: <span className="font-semibold">{preference.author}</span>
                                        </li> */}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No preferences found.</p>
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
