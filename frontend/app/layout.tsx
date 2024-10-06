// app/layout.tsx
import './globals.css'; // Optional: Import global styles if you have any
import { AuthProvider } from './context/AuthContext'; // Adjust the path if necessary
import Header from './components/Header'; // Assuming Header is a Client Component

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
};

export default Layout;
