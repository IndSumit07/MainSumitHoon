# Google Sheets Integration Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Portfolio Contact Form"
4. In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Subject`
   - E1: `Message`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click on `Extensions` → `Apps Script`
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data
    var timestamp = e.parameter.timestamp || new Date().toLocaleString();
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var subject = e.parameter.subject || '';
    var message = e.parameter.message || '';
    
    // Append data to sheet
    sheet.appendRow([timestamp, name, email, subject, message]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the disk icon or press `Ctrl+S` to save
5. Name your project (e.g., "Contact Form Handler")

## Step 3: Deploy as Web App

1. Click on `Deploy` → `New deployment`
2. Click the gear icon next to "Select type" and choose `Web app`
3. Fill in the details:
   - **Description**: Contact Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click `Deploy`
5. **Grant permissions**:
   - Click `Authorize access`
   - Choose your Google account
   - Click `Advanced` → `Go to [Project Name] (unsafe)`
   - Click `Allow`
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXX/exec
   ```

## Step 4: Update Your React Code

1. Open `src/pages/GetInTouch.jsx`
2. Find line 40 where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL from Step 3

## Step 5: Test Your Form

1. Go to your portfolio website
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your Google Sheet - you should see a new row with the form data!

## Troubleshooting

### Form not submitting?
- Check the browser console for errors
- Make sure the Web App URL is correct
- Verify that "Who has access" is set to "Anyone"

### Data not appearing in sheet?
- Check that your sheet headers match exactly: Timestamp, Name, Email, Subject, Message
- Make sure you deployed the script as a web app
- Try redeploying the script

### CORS errors?
- This is normal with Google Apps Script
- The form should still work despite CORS warnings in the console

## Optional: Email Notifications

To receive email notifications when someone submits the form, add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var timestamp = e.parameter.timestamp || new Date().toLocaleString();
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var subject = e.parameter.subject || '';
    var message = e.parameter.message || '';
    
    sheet.appendRow([timestamp, name, email, subject, message]);
    
    // Send email notification
    var emailBody = `
      New contact form submission:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      
      Timestamp: ${timestamp}
    `;
    
    MailApp.sendEmail({
      to: 'your.email@example.com', // Replace with your email
      subject: `New Contact Form: ${subject}`,
      body: emailBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Don't forget to replace `'your.email@example.com'` with your actual email address!
