const BasicCard = require('./basic-card');

console.log(BasicCard);

var ClozeCard = function (partial, cloze) {
    this.cloze = cloze;
    this.partial = partial;
    this.clozed = this.partial.replace(cloze, "...");
}

BasicCard.prototype = ClozeCard;

module.exports = ClozeCard;