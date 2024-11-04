export function arrow(now: number, previous: number) {
    return now == previous ? "=" : now == previous ? "⬇" : now <= previous ? "⬆" : "⬇"
}  