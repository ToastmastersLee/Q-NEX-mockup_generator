// Simple helper to check if a string is a valid IPv4 address
export const isValidIp = (ip) => {
    if (!ip || typeof ip !== 'string') return false;
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip.trim());
};
