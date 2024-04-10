const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
// Salva em uma pasta o token, pra caso reiniciar, tem como relogar sem scanear novamente.
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'data'
    })
});

// Cria um QR Code para você logar.
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Foi Recebido!');
});

// Caso essa mensagem foi enviada, parabens! agora você tem um bot de whatsapp.
client.on('ready', () => {
    console.log('Client está pronto!');
});

// Comandos
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

// Menciona todo mundo em um grupo, qualquer um mesmo kk
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
 
// Inicia o client
client.initialize();
