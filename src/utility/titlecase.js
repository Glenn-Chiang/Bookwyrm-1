export default function titlecase(string) {
    const words = string.toLowerCase().split(/[\s-]+/);
    const titledChars = words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ').split('');
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '-') {
            titledChars[i] = '-';
        }
    }
    const titleString = titledChars.join('');
    return titleString;
}