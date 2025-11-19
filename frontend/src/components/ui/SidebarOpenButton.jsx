import { Menu } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

const SidebarOpenButton = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    if (isSidebarOpen) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex md:hidden text-slate-300 hover:text-white transition p-1 rounded-full hover:bg-slate-800"
            aria-label="Toggle Sidebar">
            <Menu className="w-6 h-6" />
        </button>
    );
}

export default SidebarOpenButton;
