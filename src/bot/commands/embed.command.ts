import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    TextChannel,
  } from 'discord.js';
  
  export const embedCommand = new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Créer un embed personnalisé')
    .addStringOption(option =>
      option.setName('titre')
        .setDescription('Titre de l\'embed')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('image')
        .setDescription('URL de l\'image à afficher à côté du titre')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('texte')
        .setDescription('Contenu du message')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('footer')
        .setDescription('Texte du footer')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('thumbnail')
        .setDescription('URL du thumbnail en bas à gauche')
        .setRequired(false));
  
  export class EmbedCommand {
    static async execute(interaction: ChatInputCommandInteraction) {
      await interaction.deferReply({ ephemeral: true }); // Cache l'exécution de la commande
  
      const titre = interaction.options.getString('titre');
      const image = interaction.options.getString('image');
      const texte = interaction.options.getString('texte');
      const footer = interaction.options.getString('footer');
      const thumbnail = interaction.options.getString('thumbnail');
  
      const embed = new EmbedBuilder().setColor(0x0099ff);
  
      if (titre) embed.setTitle(titre);
      if (image) embed.setImage(image);
      if (texte) embed.setDescription(texte);
      if (footer) embed.setFooter({ text: footer });
      if (thumbnail) embed.setThumbnail(thumbnail);
  
      // Vérifie si le canal est un TextChannel avant d'envoyer l'embed
      if (interaction.channel && interaction.channel.isTextBased()) {
        await (interaction.channel as TextChannel).send({ embeds: [embed] });
      }
  
      // Supprime immédiatement la réponse pour éviter tout affichage
      await interaction.deleteReply();
    }
  }
  