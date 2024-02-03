const { REST, Routes } = require('discord.js'); //Importation de la librairie discord.js
const { clientId, token } = require('./config.json'); //Importation du token et du client id
const fs = require('node:fs'); //Importation de la librairie fs (file system)
const path = require('node:path'); //Importation de la librairie path
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); //Importation de la librairie discord.js


//------------------------------------------------ ETAPE 1 --------------------------------------------------
//-- chargement des commandes 

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Creation du client

client.commands = new Collection(); // Creation d'une collection pour les commandes
client.once(Events.ClientReady, c => { console.log(`Ready! Logged in as ${c.user.tag}`); }); //-------- Log in to Discord with your client's token
client.login(token); //-------- Log in to Discord with your client's token

const commands = []; //-- pour le déploiement

const commandsPath = path.join(__dirname, 'commands'); //Creation du chemin vers le dossier commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //Creation d'un tableau avec les fichiers .js du dossier commands

for (const file of commandFiles) { //Pour chaque fichier .js
	const filePath = path.join(commandsPath, file); //Creation du chemin vers le fichier
	const command = require(filePath); //Importation du fichier
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) { //Si le fichier contient les propriétés "data" et "execute"
		client.commands.set(command.data.name, command); //On ajoute la commande à la collection
		commands.push(command.data.toJSON()); //On ajoute la commande au tableau commands
	} else { //Si le fichier ne contient pas les propriétés "data" et "execute"
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


//------------------------------------------------ ETAPE 2 --------------------------------------------------
//-- dépoyment des commands

const rest = new REST().setToken(token); //-------- Log in to Discord with your client's token

(async () => {
	try {

		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(// The put method is used to fully refresh all commands in the guild with the current set
			Routes.applicationCommands(clientId), // The route to the commands endpoint
			{ body: commands }, // The JSON body of the request, containing the new commands
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {// Handle any errors that may have occurred
		console.error(error);// And of course, make sure you catch and log any errors!
	}
})();




//------------------------------------------------ ETAPE 3 --------------------------------------------------
//--  écoute des commandes
client.on(Events.InteractionCreate, async interaction => { //-------- Log in to Discord with your client's token
	if (!interaction.isChatInputCommand()) return; //Si l'interaction n'est pas une commande, on ne fait rien

	const command = interaction.client.commands.get(interaction.commandName); //On récupère la commande

	if (!command) { //Si la commande n'existe pas
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try { //On essaie d'exécuter la commande
		await command.execute(interaction); //On exécute la commande
	} catch (error) { //Si une erreur est survenue
		console.error(error); //On affiche l'erreur
		if (interaction.replied || interaction.deferred) { //Si l'interaction a déjà été répondu ou différé
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true }); //On envoie un message d'erreur
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); //On envoie un message d'erreur
		}
	}
});