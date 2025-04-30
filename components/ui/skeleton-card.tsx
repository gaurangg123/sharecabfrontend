import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface SkeletonCardProps {
  header?: boolean
  footer?: boolean
  lines?: number
}

export function SkeletonCard({ header = true, footer = false, lines = 3 }: SkeletonCardProps) {
  return (
    <Card className="w-full">
      {header && (
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-between border-t p-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </CardFooter>
      )}
    </Card>
  )
}
