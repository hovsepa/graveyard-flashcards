const inquirer = require('inquirer');
const BasicCard = require('./basic-card');
const ClozeCard = require('./cloze-card');

let basicQuestions = [];
let clozeInquirer = [];

let questions = [
    new BasicCard("... was a free web-based music application that enabled internet users listen to music on-demand.", "Grooveshark"),
    new BasicCard("... was a digital music service provider that tried to reinvent the way people discover, listen to and share music.", "Rdio"),
    new BasicCard("... offered an online platform that enabled users to share their personal secrets with other users anonymously.", "Secret"),
    new BasicCard("... was a virtual closet that allowed users to trade fashion items with other users.", "99dresses"),
    new BasicCard("... was a company that put on flash sales for toddlers and young mothers.", "Totsy")
];

let clozeQuestions = [
    new ClozeCard("Grooveshark was a free web-based music application that enabled internet users listen to music on-demand.", "Grooveshark"),
    new ClozeCard("Rdio was a digital music service provider that tried to reinvent the way people discover, listen to and share music.", "Rdio"),
    new ClozeCard("Secret offered an online platform that enabled users to share their personal secrets with other users anonymously.", "Secret"),
    new ClozeCard("99dresses was a virtual closet that allowed users to trade fashion items with other users.", "99dresses"),
    new ClozeCard("Totsy was a company that put on flash sales for toddlers and young mothers.", "Totsy")
];

var InquireBuilder = function (questions) {
    this.type = 'input',
        this.name = questions.back,
        this.message = questions.front
}

var ClozeInquireBuilder = function (questions) {
    this.type = 'input',
        this.name = questions.cloze,
        this.message = questions.clozed
}

var start = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'Please sleect type.',
        choices: ["Basic", "Cloze", "Create Your Own"]
    }]).then(function (answer) {
        if (answer.type == "Basic") {
            console.log("Basic it is... First Question:");
            questions.forEach(function (item) {
                basicQuestions.push(new InquireBuilder(item))
            });
            basicAsk(basicQuestions);
        } else if (answer.type == "Cloze") {
            console.log("You're a clozer. First question:");
            clozeQuestions.forEach(function (item) {
                clozeInquirer.push(new ClozeInquireBuilder(item))
            });
            clozeAsk(clozeInquirer);
        } else if (answer.type == "Create Your Own") {
            console.log("Feature coming soon!");
            start();
        }
    });
}

var basicAsk = function (questions) {
    var score = 0;
    inquirer.prompt(questions).then(function (answers) {
        for (i in answers) {
            if (i.toUpperCase() === answers[i].toUpperCase()) {
                score++;
            }
        }
        console.log("You answered", score, "questions correctly.")
    });
}

var clozeAsk = function (clozeInquirer) {
    var score = 0;
    inquirer.prompt(clozeInquirer).then(function (res) {
        // console.log(JSON.stringify(answers, null, '  '));
        for (i in res) {
            if (i.toUpperCase() === res[i].toUpperCase()) {
                score++;
            }
        }
        console.log("You answered", score, "questions correctly.")
    });
}

start();