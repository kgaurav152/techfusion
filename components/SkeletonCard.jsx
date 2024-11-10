import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-8 lg:w-[300px] w-[225px]" />
      <Skeleton className="h-[175px] lg:w-[350px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 lg:w-[250px] w-[200px]" />
        <Skeleton className="h-4 lg:w-[200px] w-[200px]" />
      </div>
    </div>
  )
}
