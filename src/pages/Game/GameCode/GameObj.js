
function getRand(upperRange){
    return  Math.floor((Math.random() * upperRange) + 1);
}




function Game(wordsPerCall, canvasWidth, canvasHeight, getRandomWords, ctx){
    this.paused = false;
    this.bufferWordList = [];
    this.wordList = [];
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.callFlag = false;
    this.processWordList = function(newList){
        let nextWords = newList.map((word) => {
            return new Word(word, `${getRand(25)}px Arial`, "white", getRand(this.width - 100), 0, 0, Math.random(), ctx);
        });
        this.wordList = [...this.wordList, ...nextWords];
    }
    this.nextWordList = async function(){
        if(this.bufferWordList.length < 1 && !this.callFlag){
            this.callFlag = true;
            this.bufferWordList = await getRandomWords(2);
            this.callFlag = false;
        }
         this.processWordList(this.bufferWordList);
         this.bufferWordList = [];
    }
    this.letterIndex = 0;
    this.score = 0;
    this.wordsHit = 0;
    this.ctx = ctx;
    this.drawWords = function(){
        this.wordDone();
        if(this.wordList.length <= wordsPerCall / 2){
            this.nextWordList();
        }
        this.wordList.forEach((word) => {
            word.fall();
        });
    }
    this.letterClicked = function(e, game){
        let letter = e.key;
        if(letter === '1'){
            this.paused = !this.paused;
        }
        let num = 0;
        game.wordList.forEach((word) => {
        if(word.letterCheck(letter, game.letterIndex)){
            word.wordFilled++;
            num++;
            game.score += game.letterIndex;
        }
        });
        game.letterIndex = num > 0 ? game.letterIndex + 1 : game.letterIndex;
    }
    this.resetWordFill = function(){
        this.wordList.forEach((word) => {
            word.resetWordFill();
        });
    },

    this.wordDone = function(){
        this.wordList = this.wordList.filter((word) => {
            let {wordCompleted, pastHeight, slightFilledButPassed} = word.isWordDone(this.height)
            if(wordCompleted || slightFilledButPassed){
                this.letterIndex = 0;
                this.resetWordFill();
            }else if(!pastHeight){
                return word;
            }
        }).map((word) => {
            return word.reset();
        });
    }
}


function Word(word, font, fontColor, x, y, wordFilled, accelaration, ctx){
    const smallLetters = ['r', 't', 'i', 'l', 'j', 'f'];
    const bigLetters = ['w', 'm'];
    this.ctx = ctx;
    this.word = word;
    this.wordFilled = wordFilled;
    this.font = font;
    this.fontColor = fontColor;
    this.x = x;
    this.y = y;
    this.accelaration = accelaration;
    this.isWordDone = function(height){
        let wordCompleted = this.wordFilled === this.word.length;
        let pastHeight = this.y > height;
        let slightFilledButPassed = this.y > height && this.wordFilled > 0;
        return {'wordCompleted': wordCompleted, 'pastHeight': pastHeight, 'slightFilledButPassed': slightFilledButPassed };
    }
    this.resetWordFill = function(){
        this.wordFilled = 0;
    }
    this.draw = function(){
        let prevLetter = "";
        let offset = 0;
        let fillPos = 20;
        this.word.split('').forEach((letter, index) => {
            this.ctx.font = "30px Arial";
            if(index < this.wordFilled){
                this.ctx.fillStyle= "red";
            }else{
                this.ctx.fillStyle= "white";
            }
            if(smallLetters.includes(prevLetter)){
                offset -= 10;
            }else if(bigLetters.includes(prevLetter)){
                offset += 10;
            }
            this.ctx.fillText(letter, this.x + (fillPos * index) + offset, this.y);
            prevLetter = letter;
        });
    }
    this.fall = function(){
        this.y += this.accelaration;
        this.draw();
    }
    this.reset = function(){
        return this;
    }
    this.letterCheck = function(letter, letterIndex){
        let wordSplit = this.word.split('');
        if(letterIndex === this.wordFilled && wordSplit[letterIndex] === letter){
            return true;
        }
    return false;
    }
}


export {Game, Word};