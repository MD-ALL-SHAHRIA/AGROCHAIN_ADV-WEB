import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailService } from './mail.service';

@Processor('mail-queue')
export class MailWorker extends WorkerHost {
  private readonly logger = new Logger('MailWorker 👷‍♂️');

  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Picked up job [${job.name}] with ID: ${job.id}`);

    try {
      switch (job.name) {
        case 'payment-received':
          const userEmail = 'buyer@test.com';
          await this.mailService.sendPaymentSuccess(
            userEmail,
            job.data.amount,
            job.data.orderId,
          );
          break;

        case 'weekly-digest':
          await this.mailService.sendWeeklyDigest(
            'all_users@test.com',
            job.data.campaign,
          );
          break;

        default:
          this.logger.warn(`Unknown job type: ${job.name}`);
      }

      this.logger.debug(`Job [${job.name}] completed successfully!`);
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Job [${job.name}] failed. BullMQ will retry based on settings.`,
        error.stack,
      );
      throw error;
    }
  }
}
