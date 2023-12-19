export const isRequired = (value) => {
    return value.trim() !== "";
}

export const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}