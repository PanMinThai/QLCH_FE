export interface UserRegister {
    userName: string;
    name: string;
    phone: string;
    email: string;
    password: string
}

export interface RegisterConfirm {
    userid: number;
    userName: string;
    otptext: string;
}

export interface UserCred {
    userName: string;
    password: string;
}

export interface LoginResp {
    token: string;
    refreshToken: string;
    userRole: string;
}

export interface Menu {
    menuCode: string;
    name: string;
    type:string;
}


export interface ResetPassword {
    userName: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePassword {
    userName: string
    password: string
    otpText: string
}

export interface MenuPermission {
    id:string;
    roleId: string;
    menuCode:string;
    haveView: boolean,
    haveAdd: boolean,
    haveEdit: boolean,
    haveDelete: boolean,
}



export interface Users {
    id:string;
    userName: string;
    name: string;
    email: string;
    phone: string;
    isactive: boolean;
    status: string;
    role: string;
}

export interface Roles {
    roleId: string
    roleName: string
}
export interface UpdateUser {
    userName: string
    role: string
    status: boolean
}

export interface Menus {
    menuCode: string
    name: string
    status: boolean
}