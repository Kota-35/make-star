import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  type SignupFormFields,
  signupFormFieldsSchema,
} from "@/app/auth/shared/libs/zod/schemas";

export const useSignupForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitPending, setIsSubmitPending] = useState(false);

  const handleToSigninFormOnClick = (() => {
    router.push("/auth/signin");
  }) satisfies React.ComponentProps<"button">["onClick"];

  const { handleSubmit, register, formState } = useForm<SignupFormFields>({
    resolver: zodResolver(signupFormFieldsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormOnSubmit = handleSubmit(async (data) => {
    setIsSubmitPending(true);
    try {
      console.info("登録!", data);
    } finally {
      setIsSubmitPending(false);
    }
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    handleFormOnSubmit,
    register,
    isSubmitPending,
    showPassword,
    toggleShowPassword,
    agreedToTerms,
    setAgreedToTerms,
    handleToSigninFormOnClick,
    errors: formState.errors,
  };
};
