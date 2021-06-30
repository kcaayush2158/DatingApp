import { User } from "src/app/user";

export class Topics{
    id:number;
    topicName:string;
    topicQuestion:string;
    topicAnswer:string;
    user: User;
}