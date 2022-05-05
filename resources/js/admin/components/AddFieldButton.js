class AddFieldButton {
    getPlusButton(callback) {
        const plusButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        plusButton.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        plusButton.setAttribute('viewBox', '0 0 24 24');
        plusButton.innerHTML = '<path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>';
        plusButton.classList.add('plus__button');
        plusButton.addEventListener('click', callback.bind(this));

        return plusButton;
    }
}

export default AddFieldButton;
