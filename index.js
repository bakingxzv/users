const {
    Client,
    GatewayIntentBits,
    Partials,
    EmbedBuilder
} = require("discord.js");

// ========================
// CONFIG
// ========================

const TOKEN = "MTUyOTg1MDg1NjU0NTk4MDUyOA.G3u4te.73Uer_0wMJS4g17ZqH36DJFi9zkDgrx7snWZ68";
const OWNER_ID = "978896361191772200";
const ROLE_NAME = "Members";

// ========================
// CLIENT
// ========================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// ========================
// COMMANDS
// ========================

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (message.author.id !== OWNER_ID) return;

    // PAYMENT
    if (message.content === "!payment") {

        const embed = new EmbedBuilder()
            .setColor("#2B6EF3")
            .setTitle("💳 Payment Methods")
            .setDescription(
`> 💳 **PayPal** *(Friends & Family)*
> 💰 **Crypto**`
            );

        return message.channel.send({ embeds: [embed] });
    }

    // RULES
    if (message.content === "!rules") {

        const embed = new EmbedBuilder()
            .setColor("#2B6EF3")
            .setTitle("Server Rules")
            .setDescription(
`> ➤ Follow all Discord Terms of Service and Community Guidelines.
> ➤ No NSFW content, doxxing, harassment, or illegal content.
> ➤ No self-promotion, advertising, or unsolicited invites without staff approval.

> ➤ Failure to follow these rules may result in a permanent ban without warning.`
            );

        return message.channel.send({ embeds: [embed] });
    }

    // AIO
    if (message.content === "!aio") {

        const embed = new EmbedBuilder()
            .setColor("#2B6EF3")
            .setTitle("AIO")
            .setDescription(
`> ☑️ Automated **Roblox & Discord** checker, monitor & scraper.

> ➤ **High speed** multi threaded runtime execution.
> ➤ **Direct bypass** architecture built-in.
> ➤ **Real time** target monitor for live drop tracking.
> ➤ **High efficiency** scraper for rapid ID harvesting.
> ➤ **Auto updating** system modules.
> ➤ **Clean dark mode** user interface.

## 💎 Pricing

> ➤ Lifetime Access — **€25**`
            );

        return message.channel.send({ embeds: [embed] });
    }

    // CONNECTIONS
    if (message.content === "!connections") {

        const embed = new EmbedBuilder()
            .setColor("#2B6EF3")
            .setTitle("☑️ TikTok Connection's!")
            .setDescription(
`> ➤ @hy — €15
> ➤ @heroine — €10
> ➤ @soh — €10`
            );

        return message.channel.send({ embeds: [embed] });
    }

    // VERIFY
    if (message.content === "!verify") {

        const embed = new EmbedBuilder()
            .setColor("#2B6EF3")
            .setTitle("✅ Verification")
            .setDescription(
`React with ✅ below to verify.

After verifying you'll automatically receive the **${ROLE_NAME}** role.`
            );

        const verifyMessage = await message.channel.send({
            embeds: [embed]
        });

        await verifyMessage.react("✅");
    }

});

// ========================
// GIVE ROLE
// ========================

client.on("messageReactionAdd", async (reaction, user) => {

    if (user.bot) return;

    try {

        if (reaction.partial) await reaction.fetch();

        if (reaction.emoji.name !== "✅") return;

        if (!reaction.message.embeds.length) return;

        if (reaction.message.embeds[0].title !== "✅ Verification") return;

        const guild = reaction.message.guild;

        const member = await guild.members.fetch(user.id);

        const role = guild.roles.cache.find(r => r.name === ROLE_NAME);

        if (!role) return;

        await member.roles.add(role);

        console.log(`${user.tag} verified.`);

    } catch (err) {
        console.error(err);
    }

});

// ========================
// REMOVE ROLE
// ========================

client.on("messageReactionRemove", async (reaction, user) => {

    if (user.bot) return;

    try {

        if (reaction.partial) await reaction.fetch();

        if (reaction.emoji.name !== "✅") return;

        if (!reaction.message.embeds.length) return;

        if (reaction.message.embeds[0].title !== "✅ Verification") return;

        const guild = reaction.message.guild;

        const member = await guild.members.fetch(user.id);

        const role = guild.roles.cache.find(r => r.name === ROLE_NAME);

        if (!role) return;

        await member.roles.remove(role);

        console.log(`${user.tag} unverified.`);

    } catch (err) {
        console.error(err);
    }

});

// ========================
// LOGIN
// ========================

client.login(TOKEN);