




function Game(wordList, wordsHit, ctx){
    this.wordList = wordList;
    this.letterIndex = 0;
    this.score = 0;
    this.wordsHit = wordsHit;
    this.ctx = ctx;
    this.drawWords = function(){
        this.wordList.forEach((word) => {
            word.fall(this.ctx);
        });
    }
    this.letterClicked = function(letter){

        this.wordList.forEach((word) => {
        if(word.letterCheck(letter, letterIndex)){
            this.wordFinished();
        }
        })
        this.letterIndex++;
    }
    this.wordDone = function(){
        this.letterIndex = 0;
        this.wordList = this.wordList.filter((word) => {
            if(word.wordFilled !== word.word.length){
                return word;
            }
        }).map((word) => {
            return word.reset();
        });
    }
}


function Word(word, font, fontColor, x, y, accelaration){
    this.word = word;
    this.wordFilled = 0;
    this.font = font;
    this.fontColor = fontColor;
    this.x = x;
    this.y = y;
    this.accelaration = accelaration;
    this.fall = function(){
        this.y += this.accelaration;
    }
    this.reset = function(){
        this.wordFilled = 0;
        return this;
    }
    this.letterCheck = function(letter, letterIndex){
        let wordSplit = this.word.split('');
        if(letterIndex === this.wordFilled + 1 && wordSplit[letterIndex] === letter){
            this.wordFilled++;
            if(this.wordFilled === wordSplit.length){
                return true;
            }
        }
    return false;
    }
}


