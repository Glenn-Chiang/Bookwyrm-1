export default function formatDate(timestamp) {
    // console.log(date.toDate())
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}