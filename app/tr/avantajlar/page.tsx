"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TurkishAdvantagesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Turkish /kullanim-alanlari
    router.replace("/tr/kullanim-alanlari")
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Kullanım Alanlarına yönlendiriliyor...</p>
      </div>
    </div>
  )
}
