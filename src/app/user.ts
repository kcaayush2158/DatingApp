
export class Chatroom{
         public id:number;
        public chatRoomName:string;
        public chatRoomId:string;
        public chatRoomDescription:string;
        public roomType:string;
        public password:string;
        public createdTime:Date;
        public createdBy:User;
}
export class User {

   constructor(
    public id:number,
    public firstname:string,
    public lastName:string,
    public email:string,
    public password:string,
    public aboutMe:AboutMe,
    public username :string,
    public createdDate: Date,
    public lastConnection:Date,
    public roles:any=[],
    public active:boolean,
    public profilePhoto:string,
   ){}
}

export class AboutMe{
    constructor(
        public id:number,
        public liveIn:string,
        public workAs:string,
        public education:string,
        public haveKids:string,
        public known:string,
        public lookingFor:string,
        public smoke:string,
        public drink:string,
        public height:string,
        public bodyType:string,
        public eyes:string,
        public hair:string,
        public relationship:string,
        public languages:string,
        public gender:string,
        public age:number,
        public bio:string,
        public interests:string,
        public country:string,

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

export class Notification{
    constructor(
        public id:number,
        public userSender:string,
        public userReceiver:string,
        public datetimeAdded:Date,
        public message:string,
        public status:boolean,
        public user:User
    ){}
}
