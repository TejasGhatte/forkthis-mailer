import * as XLSX from 'xlsx';

export const readEmailsFromFile = (filePath: string): string[] => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const emails: string[] = [];
    const users = XLSX.utils.sheet_to_json(sheet);
    users.forEach((row: any) => {
        if (row.Email) {
            console.log(row.Email)
            emails.push(row.Email);
        }
    });

    return emails;
};
