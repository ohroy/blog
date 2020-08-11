export default class Render {
    static general_ids(): void {
        for (let i = 1; i <= 6; i++) {
            const headers = document.querySelectorAll('h' + i);
            headers.forEach((v, index, obj) => {
                v.id = 'h_' + i + '_' + index;
            })
        }
    }

    static loading_start(): void {
        const html = document.querySelector('html');
        if (html) {
            html.className = "mask";
        }
    }

    static loading_end(): void {
        const html = document.querySelector('html');
        if (html) {
            html.className = "";
        }
    }
}