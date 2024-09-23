export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles?: Role[];
}

export interface Role {
    id?: number;
    name: string;
    permissions?: Permission[];
}

interface Permission {
    id?: number;
    name: string;
}

export type Flash = {
    message: string;
    error: string;
    success: string;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        permissions?: string[];
    };
    flash: Flash;
    query: Record<any, any>;
};
