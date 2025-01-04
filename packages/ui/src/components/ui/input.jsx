import * as React from 'react'
import PropTypes from 'prop-types'
import { Input as BaseInput } from '@mui/base'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    {
        variants: {
            // variant: {
            //     default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            //     destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            //     outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            //     secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            //     ghost: 'hover:bg-accent hover:text-accent-foreground',
            //     link: 'text-primary underline-offset-4 hover:underline'
            // },
            size: {
                default: 'h-10',
                sm: 'h-9',
                lg: 'h-11'
            }
        },
        defaultVariants: {
            // variant: 'default',
            size: 'default'
        }
    }
)
const Input = React.forwardRef(({ className, size, type, ...props }, ref) => {
    return (
        <BaseInput
            className='flex items-center relative'
            endAdornment={
                props.shortcut ? (
                    <kbd className='pointer-events-none absolute right-[0.5rem] top-[50%] translate-y-[-50%] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100'>
                        {props.shortcut}
                    </kbd>
                ) : null
            }
            type={type}
            ref={ref}
            {...props}
            slotProps={{
                input: {
                    className: cn(inputVariants({ size, className }))
                }
            }}
        />
    )
})
Input.displayName = 'Input'
Input.propTypes = {
    ...BaseInput.propTypes,
    shortcut: PropTypes.string,
    size: PropTypes.oneOf(['default', 'sm', 'lg'])
}

export { Input }