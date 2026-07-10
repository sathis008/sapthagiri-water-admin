import type { ReactNode } from "react";

interface ReportLayoutProps {
  title: string;

  description?: string;

  toolbar?: ReactNode;

  summary?: ReactNode;

  children: ReactNode;
}

const ReportLayout = ({
  // title,
  //description,
  toolbar,
  summary,
  children,
}: ReportLayoutProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      {/* <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{title}</h1>

        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div> */}

      {/* Summary */}

      {summary}

      {/* Toolbar */}

      {toolbar && (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          {toolbar}
        </div>
      )}

      {/* Table */}

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;
