export type Picture = {
    id: number;
    state: 'PENDING' | 'APPROVED' | 'DENIED';
    deniedReason?: string;
}