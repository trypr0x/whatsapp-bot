const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'data'
    })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Foi Recebido!');
});

client.on('ready', () => {
    console.log('Client está pronto!');
});

client.on('message', async (message) => {
	if (message.body === '!teste') {
		await message.reply('testado com energia solar de 50k');
	}
});

client.on('message', async (message) => {
    if (message.body === '!criador') {
        await message.reply('Fui criado por TryPr0x');
    }
});

client.on('message', async (msg) => {
    if (msg.body === '!everyone') {
        const chat = await msg.getChat();
        
        let text = '';
        let mentions = [];

        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});
 
client.initialize();
