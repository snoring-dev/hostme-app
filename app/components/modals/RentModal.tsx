"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { HOSTING_STEPS } from "@/app/types";
import Heading from "../Heading";
import { categories } from "@/app/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = useState(HOSTING_STEPS.CATEGORY);

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
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
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

  const modalBody = (
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
                onClick={(cat) => customSetValue('category', cat)}
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

  return (
    <Modal
      title="Hostify your home!"
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === HOSTING_STEPS.CATEGORY ? undefined : onBack}
      body={modalBody}
    />
  );
}

export default RentModal;
