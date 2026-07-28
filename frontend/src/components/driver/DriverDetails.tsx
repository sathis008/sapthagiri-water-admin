import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import type { Driver } from '@/types/driver';

interface Props {
  driver: Driver;
}

const DetailRow = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div className="flex justify-between border-b py-2 last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>

    <span className="text-sm font-medium">{value || '-'}</span>
  </div>
);

const DriverDetails = ({ driver }: Props) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>

        <CardContent>
          <DetailRow label="Employee Name" value={driver.name} />

          <DetailRow label="Type" value={driver.isDriver !== false ? 'Driver' : 'Office Employee'} />

          <DetailRow label="Mobile" value={driver.phone} />

          <DetailRow label="Alternate Mobile" value={driver.alternatePhone} />

          <DetailRow label="Address" value={driver.address} />

          <DetailRow label="Status" value={<Badge>{driver.status}</Badge>} />
        </CardContent>
      </Card>

      {driver.isDriver !== false && <Card>
        <CardHeader>
          <CardTitle>Driving License</CardTitle>
        </CardHeader>

        <CardContent>
          <DetailRow label="License Number" value={driver.licenseNumber} />

          <DetailRow label="License Expiry" value={driver.licenseExpiry} />

          <DetailRow label="Assigned Vehicle" value={typeof driver.assignedVehicleId === 'object' ? driver.assignedVehicleId?.vehicleNumber : driver.assignedVehicleId} />

          <DetailRow label="Document" value={driver.licenseDocument ? 'Uploaded' : '-'} />
        </CardContent>
      </Card>}

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>

        <CardContent>
          <p>{driver.notes || '-'}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDetails;
