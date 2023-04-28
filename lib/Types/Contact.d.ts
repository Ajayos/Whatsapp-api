export interface Contact {
    id: string;
    name?: string;
    notify?: string;
    verifiedName?: string;
    imgUrl?: string | null | 'changed';
    status?: string;
}
