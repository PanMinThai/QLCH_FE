export interface MembershipCard {
    id: string;
    cardTypeId: string;
    customerName:string;
    phone: string;
    accumulatedPoints:number;
    usedPoints:number;
    accumulatedAmount:number;
    usedAmount:number;
    cardTypeName:string;
}
export interface CreateMembershipCard {
    id: string;
    cardTypeId: string;
    customerName:string;
    phone: string;
}