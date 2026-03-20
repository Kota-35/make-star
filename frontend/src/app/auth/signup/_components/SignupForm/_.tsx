"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSignupForm } from "./_.hook";

export const SignupForm = () => {
  const {
    handleFormOnSubmit,
    register,
    errors,
    isSubmitPending,
    showPassword,
    toggleShowPassword,
    agreedToTerms,
    setAgreedToTerms,
    handleToSigninFormOnClick,
  } = useSignupForm();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6 px-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-1 font-bold text-3xl">アカウントを作成</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleFormOnSubmit} className="flex flex-col gap-4">
          {errors.root?.message && (
            <p className="text-destructive text-xs">{errors.root.message}</p>
          )}

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">姓</Label>
              <Input
                id="lastName"
                placeholder="山田"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-destructive text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">名</Label>
              <Input
                id="firstName"
                placeholder="太郎"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-destructive text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="taro@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="8文字以上"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                className="-translate-y-1/2 absolute top-1/2 right-2.5 text-muted-foreground hover:text-foreground"
                onClick={toggleShowPassword}
                tabIndex={-1}
                aria-label={
                  showPassword ? "パスワードを隠す" : "パスワードを表示"
                }
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              className="size-4 cursor-pointer rounded border-input accent-primary"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm leading-none">
              <a href="/t/terms" className="text-primary hover:underline">
                利用規約
              </a>
              と
              <a href="/t/privacy" className="text-primary hover:underline">
                プライバシーポリシー
              </a>
              に同意します
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitPending || !agreedToTerms}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                送信中
              </>
            ) : (
              "アカウントを作成"
            )}
          </button>

          <p className="text-center text-muted-foreground text-sm">
            すでにアカウントをお持ちですか？{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={handleToSigninFormOnClick}
            >
              ログイン
            </button>
          </p>
        </form>

        {/* Or separator */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">または</span>
          <Separator className="flex-1" />
        </div>

        {/* Google button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 font-medium text-sm transition-colors hover:bg-muted/50"
        >
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
            <title>Google</title>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Googleで登録
        </button>
      </div>
    </div>
  );
};
