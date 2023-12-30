export function useDateFormatter(date: Date): string {
    return new Date(date).toLocaleString('en-029')
}