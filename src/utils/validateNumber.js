export const validateNumber = (e) => {
  const key = e.key;

  // Allow backspace, delete, and arrow keys
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    return;
  }

  // Prevent input if the value is not a number from 0 to 9
  if (!/^[0-9]$/.test(key)) {
    e.preventDefault();
  }
};
