'use client';
import Header from '../../components/Header';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setMessage(null);
      setLoading(true); 
  
      try {
          const response = await axiosInstance.post('/login', formData);
          const { user, token } = response.data; 
          console.log('Received token:', token); 
          
          if (!token) {
              setError('Token not received from server.');
              setLoading(false);
              return;
          }
  
          login(token); 
          setMessage('Login successful! Welcome, ' + user.name); 
          router.push('/'); 
      } catch (error) {
          setError(error.response?.data.message || 'An error occurred');
      } finally {
          setLoading(false); // End loading
      }
  };
  

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                    {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
                    <Link href="/auth/register" className="underline hover:underline">
                                Go Register
                            </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
