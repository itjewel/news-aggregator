const fetchUserInfoFromAPI = async (token: string, setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-info`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        setUser(userInfo); // Set the user in your state
    } catch (error) {
        console.error('Failed to fetch user info', error);
    }
};

export default fetchUserInfoFromAPI;
