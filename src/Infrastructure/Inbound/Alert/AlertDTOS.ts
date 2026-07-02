import { Location } from "src/Domain/Model/Location";

export class AlertButtonDTO{
    constructor(
        public travelId: string,
        public location: Location,
        public contact? : string
    ){}
}


export class PanicButtonResponse{
    constructor(
        public content : string
    ){}
}

