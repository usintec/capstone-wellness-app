import axios from "axios";
import { BrevoApiKey, BrevoBaseUrl, BrevoSenderEmail, BrevoSenderName } from "../../config";

export interface EmailOptions {
  email: string;
  subject: string;
  data?: any;
  templateId?: number;
  emailBody?: string;
  params?: any;
}

export class BrevoService {
  private readonly apiKey: string;
  private readonly senderName: string;
  private readonly senderEmail: string;
  constructor() {
    this.apiKey = BrevoApiKey;
    this.senderEmail = BrevoSenderEmail;
    this.senderName = BrevoSenderName;
    
  }
  public async sendEmail(options: EmailOptions) {
    const data = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [
        {
          email: options.email,
        },
      ],
      templateId: options.templateId,
      params: options.params,
    };

    const result = await axios
      .post(`${BrevoBaseUrl}`, data, {
        headers: {
          accept: "application/json",
          "api-key": this.apiKey,
          "content-type": "application/json",
        },
      })
      .then(
        (response) => response.data,
        (err) => err.response.data
      );
    console.log(result);

    console.log(data);

    return result;
  }
}
