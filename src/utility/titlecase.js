export default function titlecase(string) {
    const words = string.toLowerCase().split(' ', '-');
    words.map(word => word[0].toUpperCase() + word.slice(1));
    const titleString = words.join(' ');
    return titleString;
}