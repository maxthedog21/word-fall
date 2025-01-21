import { Game, Word } from "./GameObj";
import { fetchRandomWords } from "@/api/wikiPageFetch";

async function start(width, height, ctx){
    return new Game(10, width, height, getRandomWordList, ctx);
}
async function getRandomWordList(num){
    let page = await fetchRandomWords(num);
    return page;
}




export { start, getRandomWordList };



