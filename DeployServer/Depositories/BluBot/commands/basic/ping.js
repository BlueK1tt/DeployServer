module.exports = {
    id: 1,
    MODcommand: true,
    name: 'ping',
    description: "this is is a ping command!",
	data: this.execute,
	async execute(interaction) {
		await interaction.reply('Pong!');
		message.channel.send('Pong!');

		console.log(`${message}`,message.author.username)
	},
}