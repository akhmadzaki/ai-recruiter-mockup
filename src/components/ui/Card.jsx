import { cn } from '../../lib/utils.js'

export function Card({ as: Component = 'div', interactive = false, className, children, ...props }) {
  return (
    <Component
      className={cn(
        'surface',
        interactive &&
          'group cursor-pointer transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-brand-300/70 hover:shadow-card-hover dark:hover:border-brand-500/40',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
