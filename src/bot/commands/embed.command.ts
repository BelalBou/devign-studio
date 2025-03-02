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
      .setRequired(false))
  .addStringOption(option =>
    option.setName('couleur')
      .setDescription('Couleur de l\'embed (format hex : #FF5733 ou FF5733)')
      .setRequired(false));

export class EmbedCommand {
  static async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true }); // Cache l'exécution de la commande

    const titre = interaction.options.getString('titre');
    const image = interaction.options.getString('image');
    const texte = interaction.options.getString('texte');
    const footer = interaction.options.getString('footer');
    const thumbnail = interaction.options.getString('thumbnail');
    let couleur = interaction.options.getString('couleur') || '0099ff'; // Par défaut bleu Discord

    // Vérifie et nettoie la couleur fournie
    if (couleur.startsWith('#')) {
      couleur = couleur.slice(1); // Enlève le #
    }
    
    // Vérifie si la couleur est un code hex valide
    if (!/^([0-9A-Fa-f]{6})$/.test(couleur)) {
      couleur = '0099ff'; // Remet une couleur par défaut si invalide
    }

    const embed = new EmbedBuilder().setColor(parseInt(couleur, 16)); // Convertir la couleur hex en décimal

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
