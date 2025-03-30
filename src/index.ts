import { readEmailsFromFile } from './services/read_xlsx';
import { sendEmail } from './services/email';
import path from 'path';

const filePath = path.resolve(__dirname, '../test-emails.xlsx');
const sendBulkEmails = async () => {
    const emails = await readEmailsFromFile(filePath);

    const batchSize = 14; 
    const delayBetweenBatches = 1500;

    const sendEmailBatch = async (emailBatch: string[]) => {
        const promises = emailBatch.map(email => {
            const templateName = 'riddler-v3';
            const subject = 'Riddler is ready to go';

            return sendEmail(email, templateName, subject)
                .then(() => console.log(`Email sent to: ${email}`))
                .catch(err => console.error(`Error sending email to ${email}: ${err.message}`));
        });

        await Promise.all(promises); 
    };

    let currentIndex = 0;
    while (currentIndex < emails.length) {
        const emailBatch = emails.slice(currentIndex, currentIndex + batchSize);
        await sendEmailBatch(emailBatch);

        currentIndex += batchSize;

        if (currentIndex < emails.length) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
    }

    console.log('All emails sent successfully');
};

sendBulkEmails()
    .catch(err => console.error('Error sending bulk emails:', err));
