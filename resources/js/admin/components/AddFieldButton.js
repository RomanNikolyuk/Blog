class AddFieldButton {
    getPlusButton(callback) {
        const plusButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        plusButton.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        plusButton.setAttribute('viewBox', '0 0 24 24');
        plusButton.innerHTML = '<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>';
        plusButton.classList.add('plus__button');
        plusButton.addEventListener('click', callback.bind(this));

        return plusButton;
    }
}

export default AddFieldButton;
