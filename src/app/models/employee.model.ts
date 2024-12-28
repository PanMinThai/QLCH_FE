export interface Employee {
    id: string;
    appUserId:string;
    userName:string;
    name:string;
    branchId:string;
    branchName:string;
    gender:boolean;
    position:string;
}
export interface EmployeeUpdate{
    id: string;
    appUserId:string;
    branchId:string;
    genderstring:string;
    position:string;
}