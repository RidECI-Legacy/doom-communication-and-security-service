import { Inject, Injectable } from "@nestjs/common";
import { ReportUserUseCase } from "src/Application/Ports/In/Report/ReportUserUseCase";
import type { ReportRepository } from "src/Domain/Repository/ReportRepository";
import { Report } from "src/Domain/Model/Report";
import { REPORT_PORTS } from "src/Application/Ports/Out/ReportTokens";
import { ReportUserDTO } from "src/Infrastructure/Inbound/Report/ReportDTOS";
import { ReportStatus } from "src/Domain/Model/Enum/ReportStatus";
import { randomUUID } from "crypto";


@Injectable()
export class ReportUserImpl implements ReportUserUseCase{
    constructor(
        @Inject(REPORT_PORTS.ReportRepository)
        private readonly reportRepository: ReportRepository) 
        {}

    async ReportUser(reportDTO: ReportUserDTO): Promise<Report> {
        const now = new Date();
        const report = new Report(
            randomUUID(),
            reportDTO.reportDescription,
            ReportStatus.PENDING,
            now,
            now,
            reportDTO.reportUserId,
            reportDTO.reportParticipantId,
            reportDTO.reportTravelId,
        );
        return await this.reportRepository.save(report);
    }
}