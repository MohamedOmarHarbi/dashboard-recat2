/**
 * Calculates delivery fee based on distance.
 * Base: first 2 km = 10 EGP
 * Extra: each extra km = 5 EGP
 */
export const calculateDeliveryFee = (distanceKm) => {
  if (!distanceKm || distanceKm <= 0) return 0;
  
  const baseDistance = 2;
  const baseFee = 10;
  const extraKmFee = 5;

  if (distanceKm <= baseDistance) {
    return baseFee;
  }

  const extraDistance = Math.ceil(distanceKm - baseDistance);
  return baseFee + (extraDistance * extraKmFee);
};
