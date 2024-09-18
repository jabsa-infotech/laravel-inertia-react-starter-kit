import { Link, InertiaLinkProps } from '@inertiajs/react';
interface SidebarLinkProps extends InertiaLinkProps {
    active?: boolean
    className?: string
    children: React.ReactNode
    canView?: boolean
    icon?: React.ReactNode
}
export default function SidebarLink({ active = false, className = '', children, icon, canView = true, ...props }: SidebarLinkProps) {
    if (!canView) {
        return null;
    }

    return (
        <Link
            {...props}
            className={
                'flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 ' +
                (active ? 'sidebar-active' : '') +
                className
            }
        >
            {icon}
            {children}
        </Link>
    );
}
