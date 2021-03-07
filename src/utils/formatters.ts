export const formatProductId = (productIds: string[]): string => {
  const productId = productIds[0]
  if (!productId || productId.length !== 9) {
    return ''
  }

  return `${productId.substring(3, 6)}/${productId.substring(6, 9)}`
}

export const formatPrice = (price: number): string => {
  // TODO: internationalization
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 8 // 1 satoshi is 8 decimal places
  }).format(price)
}
