export function stripEndWord(str: string, word: string): string {
	return str.endsWith(word) ? str.slice(0, -word.length) : str;
}
