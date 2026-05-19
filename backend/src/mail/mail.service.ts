import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger('MailEngine 📧');

  constructor(private readonly mailerService: MailerService) {}

  
  async sendPaymentSuccess(email: string, amount: number, orderId: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '🎉 Payment Successful - AgroChain',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f7f6;">
            <h2 style="color: #2e7d32;">Payment Received!</h2>
            <p>Dear User,</p>
            <p>Your payment of <strong>${amount} BDT</strong> for order <strong>#${orderId}</strong> has been successfully processed.</p>
            <p>The inventory lot has been locked and the seller will contact you shortly for delivery.</p>
            <br/>
            <p>Thank you for using AgroChain!</p>
          </div>
        `,
      });
      this.logger.log(`Payment success email sent strictly to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send payment email to ${email}`, error.stack);
      throw error; 
    }
  }

  async sendWeeklyDigest(email: string, campaignName: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `🌾 ${campaignName} - AgroChain`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #81c784;">
            <h2 style="color: #2e7d32;">Weekly Fresh Harvest!</h2>
            <p>Hello,</p>
            <p>Check out the latest fresh crop lots listed by our trusted farmers this week.</p>
            <a href="http://localhost:3000/market" style="background: #4caf50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Market Feed</a>
          </div>
        `,
      });
      this.logger.log(`Weekly digest email sent to: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send digest email to ${email}`, error.stack);
      throw error;
    }
  }
}