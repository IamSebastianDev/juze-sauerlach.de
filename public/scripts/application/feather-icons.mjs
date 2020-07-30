/** @format */

/** This file handles all functions associated with feather icons */

export default (element, active = null) => {
	// function to create a icon as a display button
	const createIconHolder = (icon) => {
		let span = document.createElement('span');
		span.className = `feather-IconContainer ${
			active ? 'feather-IconActive' : ''
		}`;
		span.setAttribute('iconName', icon.name);

		span.innerHTML = icon.toSvg();

		return span;
	};

	for (const icon in feather.icons) {
		if (feather.icons.hasOwnProperty(icon)) {
			const currItt = feather.icons[icon];
			element.appendChild(createIconHolder(currItt));
		}
	}
};
