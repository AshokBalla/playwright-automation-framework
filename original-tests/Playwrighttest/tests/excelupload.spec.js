import ExcelJs from 'exceljs';
import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    if (output.row === -1 || output.column === -1) {
        throw new Error(`Text "${searchText}" not found in the Excel sheet.`);
    }

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

test('Upload download excel validation', async ({ page }) => {
    // Set longer timeout for this test
    test.setTimeout(60000);

    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // Take a screenshot of the page
    await page.screenshot({ path: 'initial-page.png' });
    console.log('Page loaded. Screenshot saved as initial-page.png');

    // Download the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    // Wait for download to complete
    const downloadedFilePath = await download.path();
    console.log('Downloaded file to:', downloadedFilePath);

    // Ensure the downloaded file path is correct
    if (!downloadedFilePath) {
        throw new Error("Failed to download the file.");
    }

    // Update the Excel file
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, downloadedFilePath);
    console.log('Excel file updated successfully');

    // Upload the updated file
    await page.locator("#fileinput").setInputFiles(downloadedFilePath);
    console.log('File uploaded successfully');

    // Wait for the upload to process and contents to appear
    await page.waitForTimeout(5000);

    // Take screenshot after upload
    await page.screenshot({ path: 'after-upload.png' });
    console.log('After upload. Screenshot saved as after-upload.png');

    // Check for any content with our search text
    const pageContent = await page.textContent('body');
    console.log('Page contains Mango:', pageContent.includes(textSearch));
    console.log('Page contains updated value:', pageContent.includes(updateValue));

    // Verify our test values appear in the page content
    expect(pageContent).toContain(textSearch);
    expect(pageContent).toContain(updateValue);

    console.log('Test completed successfully!');
});