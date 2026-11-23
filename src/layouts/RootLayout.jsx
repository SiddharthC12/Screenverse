import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-midnight text-ivory w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
