const inquirer = require('inquirer');
const BasicCard = require('./basic-card');
const ClozeCard = require('./cloze-card');

var basicQuestions = [];
var question1 = new BasicCard("... was a free web-based music application that enabled internet users listen to music on-demand.", "Grooveshark");
var question2 = new BasicCard("... was a digital music service provider that tried to reinvent the way people discover, listen to and share music.", "Rdio");
var question3 = new BasicCard("... offered an online platform that enabled users to share their personal secrets with other users anonymously.", "Secret");
var question4 = new BasicCard("... was a virtual closet that allowed users to trade fashion items with other users.", "99dresses");
var question5 = new BasicCard("... was a company that put on flash sales for toddlers and young mothers.", "Totsy");
var questions = [question1, question2, question3, question4, question5];

// var basicQuestions = [
//     new basicCards("... was a free web-based music application that enabled internet users listen to music on-demand.", "Grooveshark"),
//     new basicCards("... was a digital music service provider that tried to reinvent the way people discover, listen to and share music.", "Rdio"),
//     new basicCards("... offered an online platform that enabled users to share their personal secrets with other users anonymously.", "Secret"),
//     new basicCards("... was a virtual closet that allowed users to trade fashion items with other users.", "99dresses"),
//     new basicCards("... was a company that put on flash sales for toddlers and young mothers.", "Totsy")
// ];

var clozeInquirer = [];
var clozeQ1 = new ClozeCard("Grooveshark was a free web-based music application that enabled internet users listen to music on-demand.", "Grooveshark");
var clozeQ2 = new ClozeCard("Rdio was a digital music service provider that tried to reinvent the way people discover, listen to and share music.", "Rdio");
var clozeQ3 = new ClozeCard("Secret offered an online platform that enabled users to share their personal secrets with other users anonymously.", "Secret");
var clozeQ4 = new ClozeCard("99dresses was a virtual closet that allowed users to trade fashion items with other users.", "99dresses");
var clozeQ5 = new ClozeCard("Totsy was a company that put on flash sales for toddlers and young mothers.", "Totsy");
var clozeQuestions = [clozeQ1, clozeQ2, clozeQ3, clozeQ4, clozeQ5];

var InquireBuilder = function (questions) {
    this.type = 'input',
    this.name = questions.back,
    this.message = questions.front
}

var clozeInquireBuilder = function (questions) {
    this.type = 'input',
    this.name = questions.cloze,
    this.message = questions.clozed
}

inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Please sleect type.',
    choices: ["Basic", "Cloze"]
}]).then(function (answer) {
    console.log(answer);
    if (answer.type == "Basic") {
        console.log("Basic it is... First Question:");
        questions.forEach(function (item) {
            basicQuestions.push(new InquireBuilder(item))
        });
        basicAsk(basicQuestions);
    } else if (answer.type == "Cloze") {
        console.log("You're a clozer. First question:");
        clozeQuestions.forEach(function (item) {
            clozeInquirer.push(new clozeInquireBuilder(item))
            console.log(clozeInquirer);
        });
        clozeAsk(clozeInquirer);
    }
});

// console.log(inqQuestions);

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
                console.log("hit");
            }
        }
        
        console.log("You answered", score, "questions correctly.")
    });
}