export const formatProductId = (productIds: string[]): string => {
  const productId = productIds[0]
  if (!productId || productId.length !== 9) {
    return ''
  }

  return `${productId.substring(3, 6)}/${productId.substring(6, 9)}`
}
