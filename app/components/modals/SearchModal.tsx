"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { SEARCH_STEPS } from "@/app/types";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import formatISO from "date-fns/formatISO";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

function SearchModal() {
  const searchModal = useSearchModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState<SEARCH_STEPS>(SEARCH_STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathrommCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => (value > 0 ? value - 1 : 0));
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => (value < 2 ? value + 1 : 2));
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== SEARCH_STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const finalUrl = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(SEARCH_STEPS.LOCATION);
    searchModal.onClose();
    router.push(finalUrl);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    roomCount,
    router,
    searchModal,
    searchParams,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let modalBody = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect place for your next vacation."
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step == SEARCH_STEPS.DATE) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free."
        />
        <Calendar
          value={dateRange}
          onChange={(selection) => setDateRange(selection)}
        />
      </div>
    );
  }

  if (step === SEARCH_STEPS.INFO) {
    modalBody = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find the place that suits you."
        />
        <Counter
          title="Guests"
          subtitle="How many people are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms is enough for you?"
          value={bathroomCount}
          onChange={(value) => setBathrommCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === SEARCH_STEPS.LOCATION ? undefined : onBack}
    />
  );
}

export default SearchModal;
