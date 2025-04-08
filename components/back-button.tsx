"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-transparent p-0 h-8"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  )
}
