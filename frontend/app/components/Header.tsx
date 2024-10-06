import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { useRouter } from 'next/navigation'; // Import useRouter

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter(); // Initialize useRouter

    const handleLogout = () => {
        logout();
        router.push('/auth/login'); // Use router for navigation after logout
    };

    return (
        <header className="bg-gray-800 p-4 text-white">
            <nav className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold hover:underline">Home</Link>
                <div className="flex items-center">
                    {user ? (
                        <>
                            <span className="mr-4">Hello, {user.name}</span>
                            <Link href="/preferences" className="mr-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
                                Preferences
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/auth/login" className="hover:underline">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
