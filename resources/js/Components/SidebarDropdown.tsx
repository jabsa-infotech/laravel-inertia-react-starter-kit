import { ChevronDown } from "@/icons/HeroIcons";
interface SidebarDropdownProps {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
}
export default function SidebarDropdown({
    active = false,
    className = "",
    title = "",
    children,
    icon
}: SidebarDropdownProps) {
    return (
        <>
            <details
                className={
                    "group [&_summary::-webkit-details-marker]:hidden " +
                    className
                }
                {...(active ? { open: true } : { open: false })}
            >
                <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">

                    <span className="flex items-center gap-2 text-sm font-medium">{icon} {title} </span>

                    <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                        <ChevronDown />
                    </span>
                </summary>

                <ul className="px-4 mt-2 space-y-1 overflow-y-auto">
                    {children}
                </ul>
            </details>
        </>
    );
}
