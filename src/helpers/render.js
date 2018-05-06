const Render= {
    general_ids() {
        for (let i = 1; i <= 6; i++) {
            let headers = document.querySelectorAll('h' + i);
            headers.forEach((v, index, obj) => {
                v.id = 'h_' + i + '_' + index;
            })
        }
    }
}
export default Render