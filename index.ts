import DiscordJS, {Client, Intents, Message, MessageEmbed, User } from 'discord.js';

//////////////////////////////////////////////////////////////////

// CONFIG VALUES
const Token = "";  // This is a super secret TOKEN or Password, do not show anyone this for any reason
const adminID = `169289644494684161` // This is the ID of the user it will DM, note: user has to be in the same serer as the bot to work
const adminReaction = '🎈'; // The bot will run when this emoji as been placed


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
    //console.log("TEST", reaction.message.reactions.cache);



	console.log(`Post made by: ${reaction.message.author.username} #${reaction.message.author.discriminator}`);
    console.log(`Post reads: ${reaction.message.content}`);
    const reactions = reaction.message.reactions.cache.map((messageReaction: any) => 
    messageReaction._emoji);
    //messageReaction._emoji.id || messageReaction._emoji.name);
    console.log("reactions on this post ", reactions.name);


    const userToSendInfoTo = client?.users?.cache?.get(adminID);
    userToSendInfoTo?.send(`--------------------------------------------`);
    await userToSendInfoTo?.send(`Post reads: ${reaction.message.content}`);
    await userToSendInfoTo?.send(`Post made by: ${reaction.message.author.username} #${reaction.message.author.discriminator}`);
    
    for(let i = 0; i < reactions.length; i++){
        const messageReaction = reaction.message?.reactions.cache.get(!undefined ? reactions[i].name : reactions[i].id);

        const users = await messageReaction?.users.fetch();
        if(users == undefined) {
            console.log('--------------------------------------------');
            console.error(`Reaction ${reactions[i].name} does not exist on this post or has 0 reactions`);
            console.log('--------------------------------------------');
            continue;
        }
        const userMap = users.map(((user: any) => "  " + user.username + " #" + user.discriminator));

        console.log("");
        console.log("emoji: ", !undefined ? reactions[i].name : reactions[i].id);
        console.log("Number of users that reacted: ", userMap.length);
        console.log("Users that reacted");

        for (let i = 0; i < userMap.length; i++) {
            console.log(`${userMap[i]}`);
        }


        //DM admin the results
        try {
            await userToSendInfoTo?.send(`reading from emoji  ${!undefined ? reactions[i].name : reactions[i].id}`);
            await userToSendInfoTo?.send(`Number of users that reacted: ${userMap.length}`);
            await userToSendInfoTo?.send(`Users that reacted: ${userMap}`);
        } catch (error) {
            console.log(`One of the messages was unable to send`, error);
        }
    }
    userToSendInfoTo?.send(`--------------------------------------------`);

    console.log(`Sent DM to admin's inbox containing the bot's response`);
    console.log('--------------------------------------------');
});


client.login(Token)



