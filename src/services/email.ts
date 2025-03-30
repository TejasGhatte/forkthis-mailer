import ses from '../config';
import { loadTemplate } from '../utils/load_template';

export const sendEmail = async (to: string, templateName: string, subject: string) => {
    try {
        const htmlBody = await loadTemplate(templateName);

        const params = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: htmlBody,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: 'Team CSI <askcsivit@gmail.com>',
        };

        const result = await ses.sendEmail(params).promise();
        console.log(`Email sent to ${to}`, result);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
    }
};