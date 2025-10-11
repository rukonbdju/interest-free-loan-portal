export const formatDate = (date: string, format?: string) => {
    if (!date) {
        return "--"
    }
    const newDate = new Date(date);
    const d = String(newDate.getUTCDate()).padStart(2, '0');
    const m = String(newDate.getUTCMonth() + 1).padStart(2, '0');
    const y = newDate.getUTCFullYear();
    switch (format) {
        case "FM D, YYYY":
            date = newDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            break;
        case ('MM/DD/YYYY'):
            date = `${m}/${d}/${y}`;
            break
        case ('DD/MM/YYYY'):
            date = `${d}/${m}/${y}`;
            break
        case ('DD-MM-YYYY'):
            date = `${d}-${m}-${y}`;
            break
        case ('MM-DD-YYYY'):
            date = `${m}-${d}-${y}`;
            break
        case ('YYYY-MM-DD'):
            date = `${y}-${m}-${d}`;
            break
        case ('YYYY-DD-MM'):
            date = `${y}-${d}-${m}`;
            break
        default:
            date = newDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            break;
    }
    return date;
}