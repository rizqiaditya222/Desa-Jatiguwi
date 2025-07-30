import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0E4D45]"></div>
    </div>
  )
}