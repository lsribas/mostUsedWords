const fs = require("fs");

function getAndFormatText(path) {
	const originalText = fs.readFileSync(path, "utf8");
	const lowerCaseText = originalText.toLowerCase();
	return lowerCaseText;
}

function getWordsArray(text) {
	const wordsArray = text.replace(/[^0-9A-Za-z' ]|\n|\r/g, " ").split(" ");
	return wordsArray;
}

function removeEmptyFromArray(wordsArray) {
	const filteredArray = wordsArray.filter((word) => word != "");
	return filteredArray;
}

function getMostUsedWords(wordsArray) {
	let wordsObj = {};
	wordsArray.forEach((word) => {
		wordsObj[word] = wordsObj[word] ? wordsObj[word] + 1 : 1;
	});

	return Object.keys(wordsObj)
		.sort((a, b) => wordsObj[b] - wordsObj[a])
		.map((word) => ({ word, usedTimes: wordsObj[word] }));
}

const text = getAndFormatText("text.txt");
const wordsArray = getWordsArray(text);
const filteredWordsArray = removeEmptyFromArray(wordsArray);
console.log(filteredWordsArray);
const mostUsedWords = getMostUsedWords(filteredWordsArray);

console.log(
	mostUsedWords
		.map(
			(wordObj) => `Palavra: ${wordObj.word} - Usada ${wordObj.usedTimes} vezes`
		)
		.join("\n")
);