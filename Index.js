const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Gérer les backups')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Crée une sauvegarde du serveur (rôles uniquement)')
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: "Tu n'as pas la permission d'utiliser cette commande.", ephemeral: true });
        }
        const guild = interaction.guild;
        let backupData = {
            name: guild.name,
            roles: []
        };
        guild.roles.cache.forEach(role => {
            if (!role.managed) {
                backupData.roles.push({
                    name: role.name,
                    color: role.color,
                    permissions: role.permissions.bitfield
                });
            }
        });
        await interaction.reply({ 
            content: "Backup (rôles uniquement) créé avec succès !\n" + JSON.stringify(backupData, null, 4), 
            ephemeral: true 
        });
    }
};