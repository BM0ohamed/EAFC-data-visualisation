export function doRatingOverral(rating: TPlayerRating): number {
  const sum = Object.values(rating).reduce((acc, curr) => acc + curr, 0)
  return Number((sum / Object.values(rating).length).toFixed(0))
}
