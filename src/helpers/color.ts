

export class RGB{
    r = 0;
    g = 0;
    b = 0;
    constructor(hex:string) {
        let alphaHex = 'FF';
        if (hex.length === 8) {
            alphaHex = hex.slice(6, 8);
            hex = hex.slice(0, 6);
        } else if (hex.length === 4) {
            alphaHex = hex[3];
            alphaHex += alphaHex;
            hex = hex.slice(0, 3);
        }
        const a = Math.round((parseInt(alphaHex, 16) / 255 + Number.EPSILON) * 100) / 100;

        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        const hexVal = parseInt(hex, 16);
        this.r = hexVal >> 16;
        this.g = (hexVal >> 8) & 255;
        this.b = hexVal & 255;
    }
    // ref: https://www.w3.org/TR/WCAG20/
    public getFrontColorW3c():string{
        const uiColors = [this.r / 255, this.g / 255, this.b / 255];
        const c = uiColors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? '#000' : '#fff';
    }

    public getFrontColor():string{
        return (((this.r * 0.299) + (this.g * 0.587) + (this.b * 0.114)) > 186) ?
            '#000' : '#fff';
    }
}