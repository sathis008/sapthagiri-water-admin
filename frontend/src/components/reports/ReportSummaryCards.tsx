interface SummaryItem {
  title: string;

  value: number;

  prefix?: string;

  icon: React.ReactNode;

  color: string;
}

interface ReportSummaryCardsProps {
  items: SummaryItem[];
}

const ReportSummaryCards = ({ items }: ReportSummaryCardsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className={`
            relative
            overflow-hidden
            rounded-xl
            p-5
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            ${item.color}
            text-white
          `}
        >
          <div className="absolute right-3 top-3 opacity-20 scale-[2]">
            {item.icon}
          </div>

          <div className="relative">
            <p className="text-sm text-white/80">{item.title}</p>

            <h2 className="mt-3 text-3xl font-bold">
              {item.prefix}{Number(item.value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}

              {/* <CountUp end={item.value} duration={1} /> */}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportSummaryCards;
