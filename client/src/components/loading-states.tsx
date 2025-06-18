"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  TransactionSkeleton,
  StatCardSkeleton,
  ChartSkeleton,
  BudgetProgressSkeleton,
  CategoryBreakdownSkeleton,
  BudgetCategorySkeleton,
  ProfileSkeleton,
  SettingsItemSkeleton,
  AchievementSkeleton,
  InsightCardSkeleton,
} from "./loading-skeleton"

export function DashboardLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Skeleton */}
        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Skeleton */}
        <Card className="lg:col-span-2 bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <TransactionSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <ChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <BudgetProgressSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function ExpensesLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <TransactionSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse mb-4"></div>
            <CategoryBreakdownSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function BudgetsLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Main Card */}
      <Card className="bg-white border border-[#e2e8f0] shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>

            {/* Budget Categories */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <BudgetCategorySkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-white border border-[#e2e8f0] shadow-md">
        <CardContent className="p-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AnalyticsLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-44 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <ChartSkeleton height={300} />
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <ChartSkeleton height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Insights Card */}
      <Card className="bg-white border border-[#e2e8f0] shadow-md">
        <CardContent className="p-6">
          <div className="h-6 w-44 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <InsightCardSkeleton key={index} />
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <InsightCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProfileLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-36 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileSkeleton />

        <Card className="lg:col-span-2 bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <SettingsItemSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats and Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex justify-between">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e2e8f0] shadow-md">
          <CardContent className="p-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <AchievementSkeleton key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card className="bg-white border border-[#e2e8f0] shadow-md">
        <CardContent className="p-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
