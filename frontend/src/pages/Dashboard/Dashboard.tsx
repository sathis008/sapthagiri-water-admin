import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, UserPlus, Briefcase, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div />
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-700">
            04 Jun 2026 - 01 Jul 2026
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: 'Total Appointments',
              value: '2350',
              change: '+20.1%',
              accent: 'text-emerald-600',
              icon: CalendarDays,
              iconBg: 'bg-blue-100',
              iconColor: 'text-blue-600',
            },
            {
              label: 'New Patients',
              value: '145',
              change: '+180.1%',
              accent: 'text-emerald-600',
              icon: UserPlus,
              iconBg: 'bg-emerald-100',
              iconColor: 'text-emerald-600',
            },
            {
              label: 'Operations',
              value: '89',
              change: '-19%',
              accent: 'text-rose-600',
              icon: Briefcase,
              iconBg: 'bg-violet-100',
              iconColor: 'text-violet-600',
            },
            {
              label: 'Total Revenue',
              value: '$9583',
              change: '+20.1%',
              accent: 'text-emerald-600',
              icon: DollarSign,
              iconBg: 'bg-amber-100',
              iconColor: 'text-amber-600',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`${item.iconBg} flex h-12 w-12 items-center justify-center rounded-3xl`}
                  >
                    <Icon size={20} className={item.iconColor} />
                  </div>
                </div>
                <p className={`mt-4 text-sm font-medium ${item.accent}`}>
                  {item.change} from last month
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Patient Visits by Gender</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 rounded-3xl bg-slate-50 p-6 text-slate-500">Chart placeholder</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Patients by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 rounded-3xl bg-slate-50 p-6 text-slate-500">Chart placeholder</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
