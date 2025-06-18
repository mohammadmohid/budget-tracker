"use client"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
}

export function LoadingSpinner({ size = "md", color = "#a78bfa", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className="animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: `${color}40`, borderTopColor: color }}
      ></div>
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-[#64748b] font-medium">Loading your dashboard...</p>
      </div>
    </div>
  )
}

export function ButtonLoadingSpinner({ children, isLoading, ...props }) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      <div className="flex items-center justify-center gap-2">
        {isLoading && <LoadingSpinner size="sm" color="currentColor" />}
        {children}
      </div>
    </button>
  )
}

export function InlineLoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <LoadingSpinner size="sm" />
      <span className="text-[#64748b]">{text}</span>
    </div>
  )
}
