const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "/";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.channel.id === "753923793025761352") { //This will make the bot work only in that channel
        if (message.author.bot) return;
            var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

    if (command === "test") {
        message.channel.send("finished the test, the bot's working!");
        }

    if (command === "gen") {
        if (generated.has(message.author.id)) {
            message.channel.send(
            "Wait 15 minute before generating another account!. - " +
            message.author
            );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please, specify the service you want!");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: ".",
                                    description: "Please check your DMs for the account.",
                                    color: 8519796,
                                    timestamp: "2019-04-04T14:16:26.398Z",
                                    footer: {
                                        icon_url:
                                            "https://i.pinimg.com/originals/cb/c3/1b/cbc31bce72395ef15d499c784447d0a1.png",
                                        text: "If the specified account does not work, reroll."
                                    },
                                    thumbnail: {
                                        url:
                                            "https://pbs.twimg.com/media/DK4RDCNVYAEo-B2.png"
                                    },
                                    author: {
                                        name: "The account has been generated.",
                                        url: "https://discordapp.com",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    // Removes the user from the set after a minute
                                    generated.delete(message.author.id);
                                }, 150000);
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send(
                                "Sorry, there isn't any account available for that service!"
                            );
                        }
                    } else {
                        message.channel.send(
                            "We've either ran out of the service specified or we're just broke. Sorry!"
                        );
                    }
                });
            }
        }
        else
            if (command === "stats") {
                message.channel.send(`Total users: ${bot.users.size}`)
            }

     if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                message.channel.send("Done!")
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'first:first', function (err) {
                if (err) throw err;
                message.channel.send("Done!")
            });
        }
       if (command === "restock") {
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            if (!args[0])
                return message.reply(
                    "Please, specify the service you want to restock!"
                );
            message.channel.send(
                "@everyone " +
                "**" +
                args[0] +
                "**" +
                " has been restocked by " +
                "<@" +
                message.author.id +
                ">"
            );
        }
    }
});

bot.login("NzU0MDA0ODQzNTUwNzM2NTY4.X1ubuw.oGtmN-tnYId8t2gLhyBbR11zBuA");
