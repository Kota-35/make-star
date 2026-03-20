"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      戻る
    </button>
  );
}
