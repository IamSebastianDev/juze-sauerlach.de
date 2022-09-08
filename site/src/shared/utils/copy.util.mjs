/** @format */

export const copyToClipboard = async (string) => navigator.clipboard && (await navigator.clipboard.writeText(string));
