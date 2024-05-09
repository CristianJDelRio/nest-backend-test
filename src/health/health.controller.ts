import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private configService: ConfigService,
    private healthService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    const vendorDns: string = this.configService.get<string>('vendorDns');

    return this.healthService.check([
      async (): Promise<HealthIndicatorResult> =>
        this.httpHealthIndicator.pingCheck('users', `${vendorDns}/users`),

      async (): Promise<HealthIndicatorResult> =>
        this.httpHealthIndicator.pingCheck('posts', `${vendorDns}/posts`),

      async (): Promise<HealthIndicatorResult> =>
        this.httpHealthIndicator.pingCheck('comments', `${vendorDns}/comments`),
    ]);
  }
}
