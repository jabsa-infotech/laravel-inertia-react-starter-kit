export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type Flash = {
    message: string;
    error: string;
    success: string;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: Flash;
    query: Record<any, any>;
};
