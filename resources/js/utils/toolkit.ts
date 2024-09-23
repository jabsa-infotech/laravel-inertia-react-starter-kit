import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export const can = (permission:string) => {
    const {auth} = usePage<PageProps>().props;
    return auth.permissions?.includes(permission);
}

export const canAny = (permissions:string[]) => {
    const {auth} = usePage<PageProps>().props;
    return auth.permissions?.some(permission => permissions.includes(permission));
}

export const canNot = (permission:string) => {
    return !can(permission);
}

export const canNotAny = (permissions:string[]) => {
    return !canAny(permissions);
}
