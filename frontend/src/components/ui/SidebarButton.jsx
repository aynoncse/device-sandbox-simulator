import DotCircle from "./DotCircle";

const SidebarButton = ({ icon: Icon, label, isActive = false }) => {

  const base = "w-full inline-flex items-center rounded-lg gap-3 border px-3 py-2.5 text-sm shadow-sm border-[#364153]";
  const active = "bg-[#646F7F]";
  const inactive = "bg-[#1E2939] text-slate-300 hover:bg-[#1e2939b9]";


  return (
    <div className="relative group">
      {isActive && <DotCircle />}
      <button type="button" className={`${base} ${isActive ? active : inactive}`}>
        {Icon && <Icon className="h-5 w-5 text-[#99A1AF] shrink-0" />}
        <span className="text-base line-clamp-1 text-[#E5E7EB] text-left">{label}</span>
      </button>


    </div>
  );
};

export default SidebarButton;