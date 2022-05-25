
export function isValidQQ(qq: string): boolean {
	return /^[1-9]\d{4,11}$/.test(qq);
}