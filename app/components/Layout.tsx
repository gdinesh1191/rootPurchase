 // components/Layout.tsx
'use client';

import { useState } from 'react'; // Import useState
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../modules/dashboard/page';  
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col">
           <Header pageTitle={pageTitle} onSearchClick={handleDropdownToggle} />  

           <Dashboard // Dashboard is rendered here
           isDropdownOpen={isDropdownOpen}
           handleDropdownToggle={handleDropdownToggle}
           />

          <main className="custom-scrollbar bg-white">
            {children} {/* Your actual page content goes here */}
          </main>
        </div>
      </div>
    </LocalizationProvider>
  );
}