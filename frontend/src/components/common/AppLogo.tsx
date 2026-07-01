import { Droplets } from "lucide-react";

interface AppLogoProps {
  isCollapsed: boolean;
}

const AppLogo = ({ isCollapsed }: AppLogoProps) => {
  return (
    <div
      className={`flex items-center gap-2 ${
        isCollapsed ? "justify-center px-0 py-5" : "px-4 py-5"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
        <Droplets size={28} />
      </div>

      {!isCollapsed ? (
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Sapthagiri</h2>
          <p className="text-xs text-slate-500">Water Suppliers</p>
        </div>
      ) : null}
    </div>
  );
};

export default AppLogo;