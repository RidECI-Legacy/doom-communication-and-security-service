import { Module } from "@nestjs/common";
import { ALERT_PORTS } from "src/Application/Ports/Out/AlertTokens";
import { ManageAlertImpl } from "src/Application/Service/Alert/ManageAlertImpl";
import { UsePanicButtonUseImpl } from "src/Application/Service/Alert/UsePanicButtonUseCaseImpl";
import { AlertController } from "src/Infrastructure/Inbound/Alert/AlertController";

import { RouteDeviationListener } from "src/Infrastructure/Outbound/Rabbit/Alert/RouterDeviationListener";
import { AlertRedisCache } from "src/Infrastructure/Outbound/Redis/AlertRedis";
import { ChatModule } from './Chat.module';
import { RabbitConfig } from '../Rabbit/Rabbit.Config';


@Module({
    controllers: [
      AlertController
    ],
    providers: [
        RabbitConfig,
        RouteDeviationListener,
        {
          provide: ALERT_PORTS.manageAlert, 
          useClass: ManageAlertImpl,
        },
        {
          provide: ALERT_PORTS.AlertRepository,
          useClass: AlertRedisCache
        },
        {
          provide: ALERT_PORTS.UsePanicButtonUseCase,
          useClass: UsePanicButtonUseImpl
        }
    ],
  imports: [ChatModule],
})
export class AlertModule {}
