







export function cutText(text: string, size: number): string {
    return text.length >= size ? text.slice(0, size) + "..." : text
}