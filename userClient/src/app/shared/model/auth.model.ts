export namespace AuthModule {
  export interface Login {
    userName: string;
    password: string;
  }
  export interface Register {
    userName: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
  }
}
