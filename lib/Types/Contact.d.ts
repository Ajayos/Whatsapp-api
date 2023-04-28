export interface Contact {
    id: string;
    number: number;
    name?: string;
    notify?: string;
    verifiedName?: string;
    imgUrl?: string | null | 'changed';
    status?: string;
}
