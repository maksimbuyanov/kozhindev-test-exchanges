/** проверяет строку на наличие лишних символов */
const isStringTestFalse = (string: string): boolean => {
    if (!string) {
        return false;
    }
    if (string.match(/[^\d,.,,]/)) {
        return true;
    }
    const comma = string.indexOf(',');
    if (comma !== -1) {
        const lastComma = string.lastIndexOf(',');
        if (comma !== lastComma) {
            return true;
        }
        const indexOfDot = string.indexOf('.');
        if (indexOfDot !== -1) {
            return true;
        }
    }
    return false;
};
export default isStringTestFalse;
