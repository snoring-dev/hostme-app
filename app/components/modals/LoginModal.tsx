"use client";
import axios, { AxiosError } from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const defaultValues = { email: "", password: "" };

function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const resp = await signIn("credentials", { ...data, redirect: false });
      if (resp?.ok) {
        toast.success("Successfully logged in!");
        router.refresh();
        loginModal.onClose();
      }

      if (resp?.error) {
        toast.error(resp.error);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-4">
          <Heading title="Welcome back" subtitle="Login to your account!" />
          <Input
            type="email"
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            type="password"
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      }
      footer={
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline
            label="Sign-up using Google"
            icon={FcGoogle}
            onClick={() => {}}
          />
          <Button
            outline
            label="Sign-up using Github"
            icon={AiFillGithub}
            onClick={() => {}}
          />
          <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center justify-center gap-2">
              <div>Already have an account?</div>
              <div
                className="text-neutral-800 cursor-pointer hover:underline"
                onClick={registerModal.onClose}
              >
                Sign-up
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default LoginModal;
