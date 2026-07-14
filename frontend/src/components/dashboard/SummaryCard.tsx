import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
  prefix?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  color,
  prefix = "",
}: SummaryCardProps) => {
  return (
    <div
      className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      ${color}
      p-4
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      `}
    >
      <div className="absolute -right-6 -top-6 opacity-10 transition-transform duration-300 group-hover:scale-125">
        {icon}
      </div>

      <div className="relative z-10">
        <p className="text-sm font-medium text-white/80">{title}</p>

        <h2 className="mt-5 text-3xl font-bold tracking-tight">
          {prefix}
          {value.toLocaleString()}
        </h2>

        <div className="mt-6 h-1.5 w-16 rounded-full bg-white/30" />

        <p className="mt-3 text-xs text-white/80">Updated just now</p>
      </div>
    </div>
  );
};

export default SummaryCard;
