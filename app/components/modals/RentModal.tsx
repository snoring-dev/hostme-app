"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { HOSTING_STEPS } from "@/app/types";
import Heading from "../Heading";
import { categories } from "@/app/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function RentModal() {
  const rentModal = useRentModal();
  const router = useRouter();
  const [step, setStep] = useState(HOSTING_STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      otherPictures: [],
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const otherPictures = watch("otherPictures");

  const customSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((step) => step - 1);
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== HOSTING_STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    try {
      const resp = await axios.post("/api/listings", data);
      if (resp) {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(HOSTING_STEPS.CATEGORY);
        rentModal.onClose();
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === HOSTING_STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === HOSTING_STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  let modalBody = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of the following describes the best your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item, index) => {
          return (
            <div className="col-span-1" key={index}>
              <CategoryInput
                onClick={(cat) => customSetValue("category", cat)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === HOSTING_STEPS.LOCATION) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="How guests can find you!"
        />
        <CountrySelect
          value={location}
          onChange={(val) => customSetValue("location", val)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === HOSTING_STEPS.INFO) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are allowed?"
          value={guestCount}
          onChange={(value) => customSetValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => customSetValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => customSetValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === HOSTING_STEPS.IMAGES) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onUploadStart={() => setIsLoading(true)}
          onUploadEnd={() => setIsLoading(false)}
          values={[imageSrc, ...otherPictures].filter(img => img !== '')}
          onChange={(images: string[]) => {
            const mainPicture = images.shift();
            customSetValue("imageSrc", mainPicture);
            customSetValue("otherPictures", [...images]);
          }}
        />
      </div>
    );
  }

  if (step === HOSTING_STEPS.DESCRIPTION) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place"
          subtitle="Provide a short and sweet description about your place!"
        />
        <Input
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === HOSTING_STEPS.PRICE) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          subtitle="How much do you charge for a night?"
        />
        <Input
          type="number"
          id="price"
          label="price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title="Hostify your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === HOSTING_STEPS.CATEGORY ? undefined : onBack}
      body={modalBody}
      disabled={isLoading}
    />
  );
}

export default RentModal;
