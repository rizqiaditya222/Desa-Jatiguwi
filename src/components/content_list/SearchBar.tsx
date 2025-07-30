import React from 'react'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="🔍   Baca apa hari ini?"
        className="w-full md:w-1/2 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0E4D45] focus:border-transparent"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  )
}