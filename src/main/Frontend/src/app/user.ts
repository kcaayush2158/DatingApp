export class User {
    constructor(
        public username :string,
        public email:string,
        public password:string,
        public gender:string,
        public age:number,
    ){}
}

export class Usersearch {
    constructor(
        public usernamesearch :string,
        public genders:string,
        public genderTo :number,
        public genderFrom:number
    ){}
}

export class UserLogin {
    constructor(
        public username :string,
        public password:string,
    ){}
}


export class UserSignup {
    constructor(
        public firstname:string,
        public lastname:string,      
        public username :string,
        public password:string,
        public repassword:string,
        public email:string,
        public genders:string,
        public birthday:any
    ){}
}
