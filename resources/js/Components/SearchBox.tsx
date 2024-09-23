import { router } from "@inertiajs/react";
import { ChangeEvent, InputHTMLAttributes } from "react";

export default function SearchBox({
    className = "",
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
        router.get(
            route(route().current() as string),
            { search: event.target.value },
            { preserveState: true, replace: true }
        );
    }

    return (
        <input
            {...props}
            className={
                "border-gray-300 mt-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                className
            }
            type="search"
            placeholder="Search"
            onChange={handleSearch}
        />
    );
}
