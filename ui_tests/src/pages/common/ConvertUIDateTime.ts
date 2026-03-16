export function formatUiDate(uiDate: string) {
    const dateObj = new Date(uiDate);

    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // convert 0 → 12
    const hourStr = String(hours).padStart(2, '0');

    return `${month}/${day}/${year} ${hourStr}:${minutes} ${ampm}`;
}

export function getDateOnly(uiDate: string): string {
    const dateObj = new Date(uiDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
}
