import React from 'react'

const Badge = ({ children }: { children: any }) => {
  return (
    <div className="font-semibold text-sm text-rose border p-1 px-3 rounded-full border-rose/20 max-w-max text-center">
      {children}
    </div>
  )
}

export default Badge
