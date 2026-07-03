import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { Vehicle } from "@/types/vehicle";

interface Props {
  vehicle: Vehicle;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex justify-between border-b py-2 last:border-b-0">
    <span className="text-sm font-medium text-muted-foreground">
      {label}
    </span>

    <span className="text-sm font-semibold text-right">
      {value || "-"}
    </span>
  </div>
);


const renderSection = (
  title: string,
  rows: { label: string; value?: React.ReactNode }[]
) => {
  if (rows.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {rows.map((row) => (
          <DetailRow
            key={row.label}
            label={row.label}
            value={row.value}
          />
        ))}
      </CardContent>
    </Card>
  );
};

const getDocumentViewUrl = (fileUrl?: string) => {
  if (!fileUrl) return null;

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  const normalized = fileUrl.replace(/\\/g, "/");
  const uploadsIndex = normalized.indexOf("/uploads/");

  if (uploadsIndex !== -1) {
    return `${import.meta.env.VITE_API_URL ?? window.location.origin}${normalized.slice(uploadsIndex)}`;
  }

  if (normalized.startsWith("/")) {
    return `${import.meta.env.VITE_API_URL ?? window.location.origin}${normalized}`;
  }

  return `${import.meta.env.VITE_API_URL ?? window.location.origin}/${normalized}`;
};

const VehicleDetails = ({
  vehicle,
}: Props) => {
  const registrationRows = [
    { label: "RC Number", value: vehicle.rcNumber },
    { label: "RC Expiry", value: vehicle.rcExpiry },
  ];

  const insuranceRows = [
    { label: "Company", value: vehicle.insuranceCompany },
    { label: "Policy Number", value: vehicle.policyNumber },
    { label: "Insurance Expiry", value: vehicle.insuranceExpiry },
  ];

  const fitnessRows = [
    { label: "FC Number", value: vehicle.fcNumber },
    { label: "FC Expiry", value: vehicle.fcExpiry },
  ];

  const pollutionRows = [
    { label: "PUC Number", value: vehicle.pucNumber },
    { label: "PUC Expiry", value: vehicle.pucExpiry },
  ];

  const additionalRows = [
    { label: "Current KM", value: vehicle.currentKm },
    { label: "Notes", value: vehicle.notes },
  ];

  const documentRows = [
    {
      label: "RC Copy",
      fileName: vehicle.documents?.rc?.fileName,
      fileUrl: vehicle.documents?.rc?.fileUrl,
    },
    {
      label: "Insurance Copy",
      fileName: vehicle.documents?.insurance?.fileName,
      fileUrl: vehicle.documents?.insurance?.fileUrl,
    },
    {
      label: "FC Copy",
      fileName: vehicle.documents?.fc?.fileName,
      fileUrl: vehicle.documents?.fc?.fileUrl,
    },
    {
      label: "PUC Copy",
      fileName: vehicle.documents?.puc?.fileName,
      fileUrl: vehicle.documents?.puc?.fileUrl,
    },
  ];

  return (
    <div className="space-y-6">
      {renderSection("Vehicle Information", [
        { label: "Vehicle Number", value: vehicle.vehicleNumber },
        { label: "Capacity", value: vehicle.capacity },
        { label: "Manufacturer", value: vehicle.manufacturer },
        { label: "Vehicle Model", value: vehicle.vehicleModel },
        { label: "Registration Year", value: vehicle.year },
        {
          label: "Status",
          value: <Badge>{vehicle.status}</Badge>,
        },
      ])}

      {renderSection("Registration Details", registrationRows)}
      {renderSection("Insurance", insuranceRows)}
      {renderSection("Fitness Certificate", fitnessRows)}
      {renderSection("Pollution Certificate", pollutionRows)}

      {documentRows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>

          <CardContent>
            {documentRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b py-2 last:border-b-0"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {row.label}
                </span>

                <span className="flex items-center gap-3 text-sm font-semibold text-right">
                  <span>
                    {row.fileName || "Not uploaded"}
                  </span>

                  {row.fileUrl ? (
                    <button
                      type="button"
                      className="text-primary underline"
                      onClick={() => {
                        const viewUrl = getDocumentViewUrl(
                          row.fileUrl
                        );

                        if (viewUrl) {
                          window.open(viewUrl, "_blank");
                        }
                      }}
                    >
                      View
                    </button>
                  ) : null}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {renderSection("Additional Information", additionalRows)}
    </div>
  );
};

export default VehicleDetails;