/**
 * Derives the operational status of a driver based on their real-time state.
 * @param {Object} driver - The driver object containing state flags
 * @returns {string} - The computed status label (Suspended, Offline, On Delivery, Available)
 */
export const resolveDriverStatus = (driver) => {
  if (!driver) return "Unknown";

  if (driver.accountStatus === "Suspended") {
    return "Suspended";
  }

  if (!driver.isOnline) {
    return "Offline";
  }

  if (driver.activeOrderId) {
    return "On Delivery";
  }

  return "Available";
};
