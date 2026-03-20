import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type SigninFormFields,
	signinFormFieldsSchema,
} from "@/app/auth/shared/libs/zod/schemas";

export const useSigninForm = () => {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitPending, setIsSubmitPending] = useState(false);

	const handleToSignupFormOnClick = (() => {
		router.push("/auth/signup");
	}) satisfies React.ComponentProps<"button">["onClick"];

	const { handleSubmit, register, formState } = useForm<SigninFormFields>({
		resolver: zodResolver(signinFormFieldsSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleFormOnSubmit = handleSubmit(async (data) => {
		setIsSubmitPending(true);
		try {
			console.info("ログイン!", data);
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
		handleToSignupFormOnClick,
		errors: formState.errors,
	};
};
