export const formatPrice = (price: number | null | string): string => {
  if (price === null || price === undefined || price === "Gratis") {
    return "Gratis"
  }

  const priceString = typeof price === "number" ? price.toString() : price
  const priceNumber = parseFloat(priceString.replace(",", "."))

  if (isNaN(priceNumber) || priceNumber === 0) {
    return "Gratis"
  }

  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(priceNumber)
}
