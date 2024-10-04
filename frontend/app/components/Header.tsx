// app/components/Header.tsx
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
                <Link href="/" className="text-xl font-bold">Home</Link>
                <div>
                    {user ? (
                        <>
                            <span className="mr-4">{user.name}</span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
