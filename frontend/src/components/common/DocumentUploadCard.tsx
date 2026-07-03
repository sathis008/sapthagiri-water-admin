import { useRef } from "react";

import {
  Eye,
  FileText,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface DocumentUploadCardProps {
  title: string;

  file?: File | null;

  existingFileUrl?: string;

  accept?: string;

  onFileSelect: (file: File | null) => void;

  onView?: () => void;

  onRemove?: () => void;
}

const DocumentUploadCard = ({
  title,
  file,
  existingFileUrl,
  accept = ".pdf,.jpg,.jpeg,.png",
  onFileSelect,
  onView,
  onRemove,
}: DocumentUploadCardProps) => {

  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">

      <div className="mb-3 flex items-center gap-2">

        <FileText className="h-5 w-5 text-primary" />

        <h4 className="font-medium">
          {title}
        </h4>

      </div>

      {file || existingFileUrl ? (

        <div className="space-y-3">

          <p className="truncate text-sm text-muted-foreground">

            {file
              ? file.name
              : "Uploaded Document"}

          </p>

          <div className="flex gap-2">

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {

                if (file) {

                  window.open(
                    URL.createObjectURL(file)
                  );

                } else {

                  onView?.();

                }

              }}
            >
              <Eye className="mr-2 h-4 w-4" />

              View

            </Button>

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() =>
                inputRef.current?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4" />

              Replace

            </Button>

            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={() => {

                onFileSelect(null);

                onRemove?.();

              }}
            >
              <X className="h-4 w-4" />
            </Button>

          </div>

        </div>

      ) : (

        <div className="rounded-md border-2 border-dashed border-slate-300 py-8">

          <Upload className="mx-auto mb-3 h-8 w-8 text-slate-400" />

          <p className="mb-4 text-center text-sm text-muted-foreground">

            No document uploaded

          </p>

          <div className="flex justify-center">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                inputRef.current?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4" />

              Upload Document

            </Button>

          </div>

        </div>

      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={(e) => {

          const selectedFile =
            e.target.files?.[0] ?? null;

          onFileSelect(selectedFile);

        }}
      />

    </div>
  );
};

export default DocumentUploadCard;