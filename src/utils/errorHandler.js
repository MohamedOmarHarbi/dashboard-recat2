export const parseError = (error) => {
  console.error("Original error:", error);
  if (error.message && error.message.includes("Network")) {
    return "Network error, please check your connection and try again.";
  }
  return "Something went wrong, please try again later.";
};
