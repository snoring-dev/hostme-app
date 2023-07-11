"use client";
import axios from "axios";
import { GrFacebook } from "react-icons/gr";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const defaultValues = { name: "", email: "", password: "" };

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
      await axios.post("/api/register", data);
      registerModal.onClose();
      loginModal.onOpen();
      toast.success("Great! Welcome to our community.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create account"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-4">
          <Heading
            title="Welcome to HostMe"
            subtitle="Create your account and join our community!"
          />
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
            id="name"
            label="Name"
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
            onClick={() => signIn("google")}
          />
          <Button
            outline
            label="Sign-up using Github"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
          />
          <Button
            outline
            label="Sign-up using Facebook"
            icon={GrFacebook}
            onClick={() => signIn("facebook")}
          />
          <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center justify-center gap-2">
              <div>Already have an account?</div>
              <div
                className="text-neutral-800 cursor-pointer hover:underline"
                onClick={toggleModal}
              >
                Sign-in
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default RegisterModal;
