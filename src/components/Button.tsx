import classNames from 'classnames'
import React from 'react'

type buttonType = {
  leftIcon?: any
  title: string
  rightIcon?: any
  className?: string
  color?: string
  onClick?: any
}
const Button = ({
  leftIcon,
  title,
  rightIcon,
  className,
  onClick,
  color = 'primary',
}: buttonType) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'focus:ring-4 focus:outline-none font-bold  rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center gap-1.5 mr-3 ',
        {
          'text-white bg-rose hover:bg-rose/80 focus:ring-rose/50':
            color === 'primary',
        },
        {
          'text-gray-900 hover:text-white bg-rose/10 border border-rose hover:bg-rose/90 focus:ring-rose/50':
            color === 'secondary',
        },
        className
      )}
    >
      {leftIcon}
      {title}
      {rightIcon}
    </button>
  )
}

export default Button
