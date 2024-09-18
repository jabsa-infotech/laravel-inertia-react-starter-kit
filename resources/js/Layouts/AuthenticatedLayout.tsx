import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import Sidebar from './AuthenticatedLayoutPartials/Sidebar';
import Navbar from './AuthenticatedLayoutPartials/Navbar';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="flex max-h-screen gap-0">
                <div className={`transition-all duration-300 ease-in-out bg-white h-[100vh] max-h-screen print:hidden ${sidebarOpen ? 'w-[300px] print:w-0' : 'w-0'}`}>
                    <Sidebar isOpen={sidebarOpen} onClose={handleToggleSidebar} user={user} />
                </div>

                <main className={`bg-gray-100 print:bg-white overflow-y-auto min-h-screen dark:bg-slate-900 rounded-4xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[calc(100%-300px)] print:w-full' : 'w-full'}`}>
                    <Navbar onToggleSidebar={handleToggleSidebar} user={user} sidebarOpen={sidebarOpen} />

                    <div className="print:hidden">
                        {header && <div className='p-4'>{header}</div>}
                    </div>

                    <div className="mx-auto mb-8 lg:max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
