Bot discord.... Qui n'est pas publique pour l'instant, je manque de compétence pour le rendre publique.
Mais je partage mon code quand même


Pour l'utiliser, vous aurez besoins d'installer ces modules:

discord.js
@discordjs/builders
@discordjs/rest
discord-api-type/v9
moment
node-kitsu


Ensuite, crée un fichier `config.json` avec comme contenu:

```json
{
   "clientId": "",
   "guildId": ""
}
```

Pour `clientId` il faut mettre l'identifiant de votre bot
Pour `guildId` il faut mettre l'identifiant de votre serveur de développement (de test)

Ensuite, pour le jeton(token) de votre bot, il vous faut un autre module: `dotenv`

Une fois le module installé, créé un fichier nommé `.env` avec comme contenu:
```
DISCORD_TOKEN=token-du-bot
```


Si vous avez un problème dans le code, contactez moi avec Issues
C'est tout pour l'instant...
