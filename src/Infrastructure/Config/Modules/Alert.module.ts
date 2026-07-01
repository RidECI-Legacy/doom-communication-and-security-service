import { Module } from "@nestjs/common";

import { ReportController } from "src/Infrastructure/Inbound/Report/ReportController";
import { RouteDeviationListener } from "src/Infrastructure/Outbound/Rabbit/Alert/RouterDeviationListener";


@Module({
    controllers: [
      ReportController
    ],
    providers: [
        RouteDeviationListener  
    ],
    
})
export class ReportModule {}
