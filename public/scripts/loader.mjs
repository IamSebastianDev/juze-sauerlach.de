/** @format */

export default (loader) => {
	loader.firstElementChild.style.transform = 'scale(2)';
	loader.style.opacity = '0';
	setTimeout(() => {
		loader.style.display = 'none';
	}, 300);
};
