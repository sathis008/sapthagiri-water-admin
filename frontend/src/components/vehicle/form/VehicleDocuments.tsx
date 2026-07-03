import { useRef } from 'react';
import { Controller, type Control } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import { Upload } from 'lucide-react';

import { useAppDispatch } from '@/redux/hooks';
import { uploadVehicleDocumentThunk } from '@/redux/vehicle';

import type { Vehicle } from '@/types/vehicle';
import type { VehicleFormValues } from './VehicleSchema';

interface VehicleDocumentsProps {
  control: Control<VehicleFormValues>;
  vehicle?: Vehicle | null;
  pendingFiles: Record<string, File | null>;
  onPendingFilesChange: (files: Record<string, File | null>) => void;
}

const VehicleDocuments = ({
  control,
  vehicle,
  pendingFiles,
  onPendingFilesChange,
}: VehicleDocumentsProps) => {
  const dispatch = useAppDispatch();
  const documentInputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const documentTypeMap: Record<string, string> = {
    rcCopy: 'rc',
    insuranceCopy: 'insurance',
    fcCopy: 'fc',
    pucCopy: 'puc',
  };

  const documentCards = [
    { title: 'RC Copy', name: 'rcCopy' },
    { title: 'Insurance Copy', name: 'insuranceCopy' },
    { title: 'FC Copy', name: 'fcCopy' },
    { title: 'PUC Copy', name: 'pucCopy' },
  ];

  const handleFileUpload = async (name: string, file: File | null) => {
    if (!file) return;

    const updatedFiles = {
      ...pendingFiles,
      [name]: file,
    };

    onPendingFilesChange(updatedFiles);

    if (!vehicle?._id) return;

    const documentType = documentTypeMap[name];

    if (!documentType) return;

    const result = await dispatch(
      uploadVehicleDocumentThunk({
        id: vehicle._id,
        documentType,
        file,
      })
    );

    if (uploadVehicleDocumentThunk.fulfilled.match(result)) {
      onPendingFilesChange({
        ...updatedFiles,
        [name]: null,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Registration */}

      <Card>
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>RC Number</Label>

            <Controller
              name="rcNumber"
              control={control}
              render={({ field }) => <Input placeholder="RC Number" {...field} />}
            />
          </div>

          <div className="space-y-2">
            <Label>RC Expiry</Label>

            <Controller
              name="rcExpiry"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Insurance */}

      <Card>
        <CardHeader>
          <CardTitle>Insurance</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Insurance Company</Label>

            <Controller
              name="insuranceCompany"
              control={control}
              render={({ field }) => <Input placeholder="ICICI Lombard" {...field} />}
            />
          </div>

          <div className="space-y-2">
            <Label>Policy Number</Label>

            <Controller
              name="policyNumber"
              control={control}
              render={({ field }) => <Input placeholder="Policy Number" {...field} />}
            />
          </div>

          <div className="space-y-2">
            <Label>Insurance Expiry</Label>

            <Controller
              name="insuranceExpiry"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Fitness */}

      <Card>
        <CardHeader>
          <CardTitle>Fitness Certificate</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>FC Number</Label>

            <Controller
              name="fcNumber"
              control={control}
              render={({ field }) => <Input placeholder="FC Number" {...field} />}
            />
          </div>

          <div className="space-y-2">
            <Label>FC Expiry</Label>

            <Controller
              name="fcExpiry"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </div>
        </CardContent>
      </Card>

      {/* PUC */}

      <Card>
        <CardHeader>
          <CardTitle>Pollution Certificate</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>PUC Number</Label>

            <Controller
              name="pucNumber"
              control={control}
              render={({ field }) => <Input placeholder="PUC Number" {...field} />}
            />
          </div>

          <div className="space-y-2">
            <Label>PUC Expiry</Label>

            <Controller
              name="pucExpiry"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Documents */}

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentCards.map(({ title, name }) => (
            <div key={title} className="rounded-lg border border-dashed p-5 text-center">
              <Upload className="mx-auto mb-3 h-8 w-8 text-slate-400" />

              <p className="mb-3 text-sm text-slate-500">{title}</p>

              <Button
                type="button"
                variant="outline"
                onClick={() => documentInputsRef.current[name]?.click()}
              >
                Upload
              </Button>

              <input
                ref={(node) => {
                  documentInputsRef.current[name] = node;
                }}
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] ?? null;
                  handleFileUpload(name, selectedFile);
                }}
              />

              <p className="mt-2 text-xs text-slate-500">
                {pendingFiles[name] ? `Selected: ${pendingFiles[name]?.name}` : 'No file selected.'}
              </p>

              {!vehicle?._id && pendingFiles[name] ? (
                <p className="text-xs text-amber-600">
                  This file will be uploaded after saving the vehicle.
                </p>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleDocuments;
