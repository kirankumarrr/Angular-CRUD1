export class Employee {
    id: number;
    name: string;
    gender: string;
    // ? --> implies optional data type
    email?: string;
    phoneNumber?: number;
    contactPreference: string;
    dateOfBirth: Date;
    department: string;
    isActive: boolean;
    photoPath?: string;
    // password: any;
    // confirmPassword : any;
}