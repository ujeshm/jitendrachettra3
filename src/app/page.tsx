'use client';
import LmcMap from '@/components/page-components/map/LmcMap';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // const handleLogout = () => {
  //   deleteCookie('lmcVotersUser');
  //   router.replace('/login');
  // };

  return (
    <div className="h-screen w-full relative" suppressHydrationWarning>
      {/* <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 text-sm font-medium text-red-600 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div> */}
      <LmcMap />
    </div>
  );
}
