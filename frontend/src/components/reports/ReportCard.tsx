import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  to: string;
}

const ReportCard = ({
  title,
  description,
  icon,
  color,
  to,
}: ReportCardProps) => {
  return (
    <Link
      to={to}
      className={`
      group
      relative
      overflow-hidden
      rounded-2xl
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      ${color}
      text-white
      `}
    >
      <div className="absolute right-4 top-4 opacity-20 group-hover:scale-125 transition-transform">
        {icon}
      </div>

      <div className="relative">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="mt-2 text-sm text-white/80">{description}</p>

        <div className="mt-8 flex items-center gap-2 font-medium">
          View Report
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-2"
          />
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
