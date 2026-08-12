/** Shared date formatting so cards, detail pages and feeds all agree. */
const formatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'long',
	timeZone: 'UTC',
});

/** Format a date as e.g. "November 2, 2023". */
export function formatDate(date: Date): string {
	return formatter.format(date);
}
