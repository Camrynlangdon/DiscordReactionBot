Basic Commands:
    cd filename | Go forward a folder
    cd ..       | Go back a folder
    dir         | See what files are in current folder
    You shouldn't need to use any others but if you do: https://www.thomas-krenn.com/en/wiki/Cmd_commands_under_Windows



To start the bot: 

1. Navigate to the correct file
    open 'command prompt' from start-menu
    cd desktop
    cd ReactionBot

2. Make sure you have the correct dependencies installed, Note: you only have to do this once
    Install Node.js : https://nodejs.org/en/download/
    Install the code dependencies by running command: npm install  //Note: must be within the bots directory > see #1

3. Start the bot 
    run command: ts-node index.ts

4. To stop the bot or to reset the bot:
    focus the command prompt window and 'ctl-c' then 'Y'
    see #3 to start the bot back up

5. To Edit Config, open index.tx in any text editor and change values under 'CONFIG VALUES'
    Token: This is a super secret TOKEN or Password, do not show anyone this for any reason.  See below on how to get Token
    adminID: This is the ID of the user it will DM, note: user has to be in the same serer as the bot to work
    adminReaction: The bot will run when this emoji as been placed.
    emojiToCheck: The bot will check who has reacted to this specific emoji
    
    How to get TOKEN:  The token is both the user and password of your bot.  With this token, your code knows where to login and to which account.
    Visit: https://discord.com/developers/applications To make your bot and get a token
    Youtube follow along: https://youtu.be/j_sD9udZnCk?t=528



NOTE: I suggest limiting the reaction emojis to a single emoji so the bot will be able to read from a single reference point and users won't be able to trigger the bot using the trigger emoji.