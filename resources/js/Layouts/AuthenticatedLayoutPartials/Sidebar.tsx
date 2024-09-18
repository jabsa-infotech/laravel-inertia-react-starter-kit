import ApplicationLogo from "@/Components/ApplicationLogo";
import SidebarDropdown from "@/Components/SidebarDropdown";
import SidebarLink from "@/Components/SidebarLink";
import { Home, ShieldCheck, UserCircle } from "@/icons/HeroIcons";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

function Sidebar({ isOpen, user }: SidebarProps) {
    if (!isOpen) return null;
    return (
        <aside
            className={`flex flex-col justify-between h-full min-h-screen px-3 py-4 overflow-y-auto`}
        >
            <div className="px-4 py-6">
                <span className="flex items-center justify-start gap-3 text-gray-500 bg-white rounded-lg dark:bg-gray-800">
                    <ApplicationLogo className="w-8 h-8 text-gray-500 fill-current" />{" "}
                    <div className="font-bold">{import.meta.env.VITE_APP_NAME}</div>
                </span>

                <ul className="pt-4 mt-6 space-y-1 border-t border-gray-100 dark:border-gray-700">
                    <li>
                        <SidebarLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            icon={<Home />}
                        >
                            Dashboard
                        </SidebarLink>
                    </li>
                    <li>
                            <SidebarDropdown
                                title="Administration"
                                icon={<ShieldCheck />}
                            >
                                <SidebarLink
                                    href={route("admin.users.index")}
                                    active={route().current("admin.users.*")}
                                    canView={true}
                                >
                                    Users
                                </SidebarLink>
                                <SidebarLink
                                    href={route("admin.roles.index")}
                                    active={route().current("admin.roles.*")}
                                    canView={true}
                                >
                                    Roles
                                </SidebarLink>
                                <SidebarLink
                                    href={route("admin.permissions.index")}
                                    active={route().current(
                                        "admin.permissions.*"
                                    )}
                                    canView={true}
                                >
                                    Permissions
                                </SidebarLink>
                            </SidebarDropdown>
                        </li>
                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 pt-3 border-t border-gray-100 dark:border-gray-700">
                <Link
                    href={route("profile.edit")}
                    className="flex items-center gap-2 p-4 text-gray-800 bg-white rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <UserCircle />

                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">
                                {user.name}
                            </strong>
                        </p>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;
