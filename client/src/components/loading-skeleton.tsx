"use client"

import { Card, CardContent } from "@/components/ui/card"

export function TransactionSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e2e8f0]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <Card className="border border-[#e2e8f0] shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ChartSkeleton({ height = 250 }) {
  return (
    <div className="space-y-4">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="bg-gray-200 rounded animate-pulse" style={{ height: `${height}px` }}></div>
    </div>
  )
}

export function BudgetProgressSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
    </div>
  )
}

export function CategoryBreakdownSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

export function BudgetCategorySkeleton() {
  return (
    <Card className="border border-[#e2e8f0] shadow-md">
      <CardContent className="p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full mx-auto bg-gray-200 animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
          <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto"></div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfileSkeleton() {
  return (
    <Card className="bg-white border border-[#e2e8f0] shadow-md">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full mx-auto bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mx-auto"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SettingsItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
}

export function AchievementSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg">
      <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export function InsightCardSkeleton() {
  return (
    <div className="p-4 bg-[#f0fdf4] rounded-lg border-l-4 border-[#22c55e]">
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
