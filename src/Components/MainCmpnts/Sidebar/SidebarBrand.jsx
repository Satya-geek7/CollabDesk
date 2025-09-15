import CollabDesk from "../../../assets/logos/CollabDesk.png";

export default function SidebarBrand({ collapsed, setCollapsed }) {
  return (
    <div
      className=" pl-4 flex items-center gap-4 cursor-pointer"
      onClick={() => setCollapsed(!collapsed)}
    >
      <img src={CollabDesk} alt="CollabDesk Logo" className="w-10 h-10" />
      {!collapsed && (
        <div>
          <h1 className="text-xl font-bold text-purple-700">CollabDesk</h1>
          <p className="text-xs text-gray-500">Your unified workspace</p>
        </div>
      )}
    </div>
  );
}
