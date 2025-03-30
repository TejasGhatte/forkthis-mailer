import { promises as fs } from 'fs';
import path from 'path';

export const loadTemplate = async (templateName: string): Promise<string> => {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
    
    try {
        const template = await fs.readFile(templatePath, 'utf-8');
        return template;
    } catch (error) {
        throw new Error(`Template ${templateName} not found: ${error}`);
    }
};