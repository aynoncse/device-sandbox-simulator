import { X } from "lucide-react";
import { useSidebar } from '../../hooks/useSidebar';
const SidebarCloseButton = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    return (
        <button
            type="button"
            onClick={toggleSidebar}
            className="md:hidden text-slate-300 hover:text-white transition p-1 rounded-full hover:bg-slate-800 absolute top-3 right-4"
            aria-label="Toggle Sidebar">
            {isSidebarOpen && <X className="w-6 h-6" />}
        </button>
    );
}

export default SidebarCloseButton;
