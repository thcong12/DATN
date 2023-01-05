export namespace Account{
    export interface Admin{
        userName: string,
        firstName: string,
        lastName: string,
        email:string,
        phoneNumber: string,
        typeAdmin: TypeAdmin,
        isActive: boolean,
    }
}
export interface TypeAdmin{
    adminType: string,
    isActive: boolean,
}