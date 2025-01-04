import * as React from 'react'
import PropTypes from 'prop-types'
import { Popper } from '@mui/base/Popper'
import { Button } from './button'
import { cn } from '@/lib/utils'

const DropdownMenuContext = React.createContext({})

const DropdownMenu = React.forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trigger, setTrigger] = React.useState(null)

    const handleClose = React.useCallback(() => {
        setOpen(false)
        setAnchorEl(null)
    }, [])

    React.useEffect(() => {
        if (!open) return

        function handleClickOutside(event) {
            if (trigger && !trigger.contains(event.target) && anchorEl && !anchorEl.contains(event.target)) {
                handleClose()
            }
        }

        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [open, anchorEl, trigger, handleClose])

    return (
        <DropdownMenuContext.Provider
            value={{
                open,
                setOpen,
                anchorEl,
                setAnchorEl,
                trigger,
                setTrigger,
                onClose: handleClose
            }}
        >
            <div ref={ref}>{children}</div>
        </DropdownMenuContext.Provider>
    )
})
DropdownMenu.displayName = 'DropdownMenu'
DropdownMenu.propTypes = {
    children: PropTypes.node
}

const DropdownMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { setOpen, setAnchorEl, setTrigger } = React.useContext(DropdownMenuContext)
    const triggerRef = React.useRef(null)

    React.useEffect(() => {
        setTrigger(triggerRef.current)
    }, [setTrigger])

    const handleClick = (event) => {
        setAnchorEl((prev) => (prev ? null : event.currentTarget))
        setOpen((prev) => !prev)
        if (props.onClick) {
            props.onClick(event)
        }
    }

    return (
        <Button ref={triggerRef} type='button' className={className} onClick={handleClick} {...props}>
            {children}
        </Button>
    )
})
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'
DropdownMenuTrigger.propTypes = {
    ...Button.propTypes
}

const DropdownMenuContent = React.forwardRef(
    ({ className, children, side = 'bottom', sideOffset = 4, align = 'start', alignOffset = 0, ...props }, ref) => {
        const { open, anchorEl } = React.useContext(DropdownMenuContext)

        return (
            <Popper
                ref={ref}
                open={open}
                anchorEl={anchorEl}
                placement={`${side}-${align}`}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [alignOffset, sideOffset]
                        }
                    }
                ]}
                className={cn(
                    'z-50 min-w-[8rem] max-w-[16rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    className
                )}
            >
                <div className={cn('w-full')} {...props}>
                    {children}
                </div>
            </Popper>
        )
    }
)
DropdownMenuContent.displayName = 'DropdownMenuContent'
DropdownMenuContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    sideOffset: PropTypes.number,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    alignOffset: PropTypes.number
}

const DropdownMenuItem = React.forwardRef(({ className, inset, children, ...props }, ref) => {
    const { onClose } = React.useContext(DropdownMenuContext)

    return (
        <button
            ref={ref}
            className={cn(
                'relative w-full h-10 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none gap-2',
                'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
                'transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                inset && 'pl-8',
                className
            )}
            onClick={(event) => {
                onClose()
                if (props.onClick) {
                    props.onClick(event)
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
})
DropdownMenuItem.displayName = 'DropdownMenuItem'
DropdownMenuItem.propTypes = {
    ...Button.propTypes,
    inset: PropTypes.bool
}

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
    <div ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'
DropdownMenuLabel.propTypes = {
    className: PropTypes.string,
    inset: PropTypes.bool
}

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
DropdownMenuSeparator.propTypes = {
    className: PropTypes.string
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger }