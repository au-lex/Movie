import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'

export const Container = (props: CustomComponentProps) => {
  return (
    <div
      className={mergeClassName(
        'px-4 py-3 lg:px-16 2xl:container mx-auto',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
