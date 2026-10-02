import { Skeleton } from "@/components/ui/skeleton";
import { CARD_SURFACE_CLASSES } from "@/components/ui/surface";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6" aria-label="Loading dashboard" role="status">
      <div className="flex flex-wrap items-end justify-between gap-6 rounded-3xl border border-border-default bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={`flex flex-col gap-3 p-5 ${CARD_SURFACE_CLASSES}`}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className={`flex flex-col gap-4 p-6 ${CARD_SURFACE_CLASSES}`}>
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-14" />
            </div>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={`flex flex-col gap-4 p-6 ${CARD_SURFACE_CLASSES}`}>
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
