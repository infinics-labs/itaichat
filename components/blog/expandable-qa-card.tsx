"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface QAItem {
  question: string
  answer: string
}

interface ExpandableQACardProps {
  items: QAItem[]
}

export function ExpandableQACard({ items }: ExpandableQACardProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])) // First question expanded by default

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {item.question}
              </h3>
              {expandedItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {expandedItems.has(index) && (
              <div className="px-4 pb-4 pt-0">
                <div className="border-t border-gray-100 pt-3">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-0 text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
