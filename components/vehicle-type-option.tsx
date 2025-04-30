"use client"
import { cn } from "@/lib/utils"

interface VehicleTypeOptionProps {
  id: string
  icon: string
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

export function VehicleTypeOption({ id, icon, title, description, selected, onSelect }: VehicleTypeOptionProps) {
  return (
    <label
      className={cn(
        "relative border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        selected ? "border-primary" : "border-muted",
      )}
      htmlFor={id}
    >
      <input type="radio" id={id} className="absolute opacity-0 w-0 h-0" checked={selected} onChange={onSelect} />
      <div className="space-y-2 text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
          {icon === "car" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-yellow-600"
            >
              <rect width="13" height="8" x="3" y="6" rx="2" />
              <path d="M17 6h0" />
              <path d="M21 6h0" />
              <path d="M5 14v6" />
              <path d="M19 14v6" />
              <path d="M10 14h5" />
            </svg>
          ) : icon === "bike" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-yellow-600"
            >
              <circle cx="5" cy="18" r="3" />
              <circle cx="19" cy="18" r="3" />
              <path d="M6 18h12l-3-9h-6l-3 9z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-yellow-600"
            >
              <path d="M3 3v18h18" />
              <path d="M19 9h-4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4" />
              <path d="M5 9h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5" />
            </svg>
          )}
        </div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </label>
  )
}
