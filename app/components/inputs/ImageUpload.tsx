"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface Props {
  values: string[];
  onChange: (values: string[]) => void;
  onUploadStart: () => void;
  onUploadEnd: () => void;
}

function ImageUpload({ onChange, onUploadEnd, onUploadStart, values }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>(values);

  useEffect(() => {
    setUploadedImages(values);
  }, [values]);

  const handleUpload = async () => {
    const formData = new FormData();
    const files = fileInput.current?.files ?? [];

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    formData.append("upload_preset", "akx6woek");
    try {
      onUploadStart();
      const resp = await axios.post(
        "https://api.cloudinary.com/v1_1/mjemmoudi/image/upload",
        formData
      );
      console.log(resp.data.secure_url);
      const newImages = [...uploadedImages, resp.data.secure_url];
      setUploadedImages(newImages);
      onChange(newImages);
    } catch (e) {
      console.error(e);
    } finally {
      onUploadEnd();
    }
  };

  return (
    <>
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {uploadedImages.map((imgSrc, index) => (
            <div
              key={index}
              className="aspect-square w-[120px] h-[120px] relative overflow-hidden rounded-xl"
            >
              <Image
                fill
                alt="uploaded-image"
                src={imgSrc}
                className="object-cover h-full w-full group-hover:scale-110 transition"
              />
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => {
          if (fileInput && fileInput.current) {
            fileInput.current.click();
          }
        }}
        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
      >
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        <form className="hidden">
          <input
            type="file"
            name="file"
            ref={fileInput}
            onChange={handleUpload}
          />
        </form>
      </div>
    </>
  );
}

export default ImageUpload;
