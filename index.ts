import DiscordJS, {Client, Intents, Message, MessageEmbed, User } from 'discord.js';

//////////////////////////////////////////////////////////////////

// CONFIG VALUES
const Token = "";  // This is a super secret TOKEN or Password, do not show anyone this for any reason
const adminID = `169289644494684161` // This is the ID of the user it will DM, note: user has to be in the same serer as the bot to work
const adminReaction = '🎈'; // The bot will run when this emoji as been placed
const emojiToCheck = '👍';  // The bot will check who has reacted to this specific emoji


//////////////////////////////////////////////////////////////////


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

client.on('ready', () => {
    console.log('The bot is running')
})


client.on('messageCreate', async (message) => {
    if(message.content === '/test/bot'){
        message.reply({
            content: 'working',
        })
    }
    if(message.content === '/test/bot/inbox'){
        message.reply({
            content: 'Sending test DM',
        })
        const userToSendInfoTo = client?.users?.cache?.get(adminID);
        userToSendInfoTo?.send(`If you are receiving this message, the bot is working correctly`);
    }
})


client.on('messageReactionAdd', async (reaction: any, user: any) => {
    if(reaction._emoji.name != adminReaction) return;
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
    
    console.log('--------------------------------------------');
	console.log(`reading from emoji  ${emojiToCheck}`);
	console.log(`Post made by: ${reaction.message.author.username} #${reaction.message.author.discriminator}`);
    console.log(`Post reads: ${reaction.message.content}`);

    const messageReaction = reaction.message?.reactions.cache.get(emojiToCheck);
    
    const users = await messageReaction?.users.fetch();
    if(users == undefined){
        console.error("Emoji with users does not match provided emojiToCheck in CONFIG or there are no users that have reacted to emojiToCheck");
        console.log('--------------------------------------------');
        return;
    }
    const userMap = users.map(((user: any) => "  " + user.username + " #" + user.discriminator));
    
    console.log("");
    console.log("Number of users that reacted: ", userMap.length);
    console.log("Users that reacted")
    for(let i = 0; i < userMap.length; i++){
        console.log(`${userMap[i]}`);
    }

    //DM admin the results
    const userToSendInfoTo = client?.users?.cache?.get(adminID);
    userToSendInfoTo?.send(`reading from emoji  ${emojiToCheck}`);
    userToSendInfoTo?.send(`Post made by: ${reaction.message.author.username} #${reaction.message.author.discriminator}`);
    userToSendInfoTo?.send(`Post reads: ${reaction.message.content}`);
    userToSendInfoTo?.send(`Number of users that reacted: ${userMap.length}`);
    userToSendInfoTo?.send(`Users that reacted: ${userMap}`);
    console.log(`Sent DM to admin's inbox containing the bot's response`);
    console.log('--------------------------------------------');
});


client.login(Token)



