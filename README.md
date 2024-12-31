To get the gtmId (Google Tag Manager ID), you'll need to follow these steps:

1. Create or Get Your Google Tag Manager Account
If you don’t already have a Google Tag Manager (GTM) account and container, here’s how to set one up:

Go to the Google Tag Manager website.
Sign in with your Google account, or create one if you don’t already have it.
Click "Create Account" and follow the setup steps:
Choose an account name.
Set the country.
Set up the container. A container is where you'll configure the tags.
Choose the platform (Web, iOS, Android, or AMP). For most websites, you'll choose Web.
After completing the setup, you’ll be given a container ID. This is your GTM ID, which looks something like GTM-XXXXXX.

Gmail App Password Setup
Log in to your Google Account at https://myaccount.google.com/.
Navigate to Security from the left sidebar.
Scroll down to the "Signing in to Google" section and make sure 2-Step Verification is turned ON.
Once 2-Step Verification is enabled, you'll see an option for App Passwords.
Click on App Passwords. You may need to enter your Google account password again.
In the Select app dropdown, choose "Mail", and for Select device, choose "Other (Custom name)" and name it appropriately (e.g., "Portfolio").
Click Generate. A 16-character app password will be displayed. Save this password for later use in your environment variables (e.g., GMAIL_PASSKEY).
Create a Telegram Bot
Open Telegram and search for the user @BotFather.
Start a chat with BotFather and use the /newbot command to create a new bot.
Choose a name for your bot.
Set a unique username for your bot (must end with bot, e.g., PortfolioAssistantBot).
Once your bot is created, BotFather will send you a Token. Save this token, as you will need it for your environment variables (e.g., TELEGRAM_BOT_TOKEN).
To get your chat ID:
Open your bot in Telegram and send it a message.
Visit the following URL in your browser, replacing BOT_TOKEN with your actual bot token:
https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
Look for the chat object in the response, which contains your chat ID (you can use this value for TELEGRAM_CHAT_ID).