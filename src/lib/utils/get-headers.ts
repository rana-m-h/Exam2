export const getLocaleHeader = (locale: string) => ({ "Accept-Language": locale });

export const getAuthHeader = (token?: string | null) => ({ Authorization: `Bearer ${token}` });
