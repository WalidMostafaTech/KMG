import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

const ImageInput = ({ control, name, label, disabled = false }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (file, fieldOnChange) => {
    if (file) {
      fieldOnChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (fieldOnChange) => {
    fieldOnChange(null);
    setPreview(null);
  };

  return (
    <FormField
      control={control}
      name={name}
      id={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          {!preview && (
            <FormControl>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!disabled) {
                    const file = e.dataTransfer.files[0];
                    handleFile(file, field.onChange);
                  }
                }}
                onClick={() => {
                  if (!disabled) {
                    document.getElementById(name)?.click();
                  }
                }}
                className={`border-2 border-dashed rounded-lg p-4 flex flex-col gap-2 items-center justify-center cursor-pointer relative
                border-gray-300 bg-muted
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="file"
                  id={name}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(e.target.files?.[0], field.onChange)
                  }
                  disabled={disabled}
                />

                <Upload size={30} />

                <p className="text-center text-sm text-muted-foreground">
                  اسحب وأسقط الصورة هنا أو اضغط لاختيار صورة
                </p>
              </div>
            </FormControl>
          )}

          {preview && (
            <div className="flex flex-col items-center gap-2 mt-2 relative border-2 border-dashed border-gray-300 bg-muted rounded-xl">
              <img
                src={preview}
                alt="preview"
                className="max-h-40 object-contain rounded-md"
              />
              <button
                onClick={() => removeFile(field.onChange)}
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer z-10"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default ImageInput;
