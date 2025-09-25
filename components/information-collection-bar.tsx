"use client"

import { useEffect, useState } from "react"

interface InformationCollectionBarProps {
  // These props represent which information has been collected
  hasProduct?: boolean
  hasTargetMarket?: boolean
  hasGtipCode?: boolean
  hasSalesChannels?: boolean
  hasContactInfo?: boolean
  hasKeywords?: boolean
  hasCompetitors?: boolean
  hasCustomers?: boolean
}

export function InformationCollectionBar({
  hasProduct = false,
  hasTargetMarket = false,
  hasGtipCode = false,
  hasSalesChannels = false,
  hasContactInfo = false,
  hasKeywords = false,
  hasCompetitors = false,
  hasCustomers = false
}: InformationCollectionBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let percentage = 0

    // Product + Target Market = 20%
    if (hasProduct && hasTargetMarket) {
      percentage = 20
    }

    // GTIP + Sales Channels = 40%
    if (percentage >= 20 && hasGtipCode && hasSalesChannels) {
      percentage = 40
    }

    // Contact Info = 60%
    if (percentage >= 40 && hasContactInfo) {
      percentage = 60
    }

    // Keywords = 80%
    if (percentage >= 60 && hasKeywords) {
      percentage = 80
    }

    // Customers = 100%
    if (percentage >= 80 && hasCustomers) {
      percentage = 100
    }

    setProgress(percentage)
  }, [hasProduct, hasTargetMarket, hasGtipCode, hasSalesChannels, hasContactInfo, hasKeywords, hasCompetitors, hasCustomers])

  const getProgressColor = () => {
    if (progress >= 80) return "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"
    if (progress >= 60) return "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
    if (progress >= 40) return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
    if (progress >= 20) return "bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500"
    return "bg-gradient-to-r from-gray-300 to-gray-400"
  }

  const getProgressText = () => {
    if (progress === 0) return "Start collecting export information"
    if (progress === 20) return "Product and market information collected"
    if (progress === 40) return "Product details completed" 
    if (progress === 60) return "Contact information collected"
    if (progress === 80) return "Keywords defined"
    if (progress === 100) return "All information collected"
    return "Collecting information..."
  }

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-gray-50 border-t border-gray-200 shadow-inner">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Information Collection Progress
          </h3>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>

        {/* Progress Text */}
        <p className="text-xs text-gray-600 mb-4">
          {getProgressText()}
        </p>

        {/* Progress Bar */}
        <div className="relative">
          {/* Background bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            {/* Progress fill */}
            <div 
              className={`h-full transition-all duration-1000 ease-out ${getProgressColor()} shadow-lg`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
