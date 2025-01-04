import * as React from 'react'
import PropTypes from 'prop-types'
import { Button } from './button'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    const [pressed, setPressed] = React.useState(props.defaultPressed ?? false)

    React.useEffect(() => {
        if (typeof props.pressed !== 'undefined') {
            setPressed(props.pressed)
        }
    }, [props.pressed])

    const handleToggleChange = () => {
        setPressed(!pressed)
        props.onPressedChange?.(!pressed)
    }

    return (
        <Button
            ref={ref}
            className={cn(toggleVariants({ variant, size, className }))}
            aria-pressed={pressed}
            variant={variant}
            disabled={props.disabled}
            onClick={handleToggleChange}
            size={size}
        >
            {props.children}
        </Button>
    )
})

Toggle.displayName = 'Toggle'
Toggle.propTypes = {
    ...Button.propTypes,
    defaultPressed: PropTypes.bool,
    pressed: PropTypes.bool,
    onPressedChange: PropTypes.func,
    size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
    variant: PropTypes.oneOf(['default', 'outline', 'secondary', 'ghost'])
}

export { Toggle, toggleVariants }