import Logo from "../headerComponents/Logo";
import DesignerSidebar from "../headerComponents/DesignerSidebar";

const DesignerAdminHeader = () => {
  return (
    <header className="sticky top-0 left-0 w-full duration-500 border-b border-gray-900/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        <DesignerSidebar />
      </div>
    </header>
  );
};

export default DesignerAdminHeader;
