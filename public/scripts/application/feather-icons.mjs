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

	// custom icons added on customer request

	feather.icons.aktuelles = {
		name: 'aktuelles',
		toSvg() {
			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.48,14.51l-5.88.68a13.08,13.08,0,0,0-4.07,1.15L5.69,18.12h0A8.56,8.56,0,0,1,3,12.35H3l3.71-1.73a14.07,14.07,0,0,0,3.72-2.53l4.2-4" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round"/><path d="M19,14.74c-1.19,0-3.09-1.47-4.4-4.29a9.74,9.74,0,0,1-1-4.26c0-1.13.38-1.93,1-2.2a1.27,1.27,0,0,1,.52-.11c1.19,0,3.08,1.48,4.4,4.3a10,10,0,0,1,1,4.25c0,1.13-.38,1.93-1,2.2a1.09,1.09,0,0,1-.51.11Z" style="fill:#fff"/><path d="M15.09,4.38c1,0,2.77,1.5,3.94,4,1.39,3,1.1,5.41.29,5.79a.73.73,0,0,1-.3.06c-1,0-2.78-1.5-3.95-4a9.3,9.3,0,0,1-1-4c0-.91.28-1.58.67-1.77a.75.75,0,0,1,.31-.06m0-1a1.66,1.66,0,0,0-.73.16c-1.6.74-1.68,3.93-.2,7.12,1.28,2.74,3.3,4.58,4.86,4.58a1.75,1.75,0,0,0,.72-.15c1.6-.75,1.69-3.93.2-7.12-1.28-2.74-3.3-4.59-4.85-4.59Z"/><rect x="9.05" y="15.74" width="1.64" height="4.75" transform="translate(-6.73 5.87) rotate(-25)" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round"/></svg>`;
		},
	};

	feather.icons.angebot = {
		name: 'angebot',
		toSvg() {
			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.62,16.05v3.72A1.24,1.24,0,0,0,9.86,21h7.43a1.24,1.24,0,0,0,1.23-1.23V4.23A1.24,1.24,0,0,0,17.29,3H9.86A1.24,1.24,0,0,0,8.62,4.23V8" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><rect x="5.48" y="11.28" width="6.85" height="1.43" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><polygon points="15.24 12 11.6 9.9 11.6 14.1 15.24 12" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>`;
		},
	};

	feather.icons.ferien = {
		name: 'ferien',
		toSvg() {
			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="6.65" y="14.32" width="0.71" height="6.36" transform="translate(-0.42 34.82) rotate(-135)" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><path d="M16,4.07h0a3.38,3.38,0,0,1,4,4h0l-8,8L8,12Z" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/><polygon points="7.93 12.09 13.56 6.45 15.01 7 17 7 16 8 16 9.99 17 8.99 17.99 9.99 11.91 16.07 7.93 12.09" style="fill:#fff"/></svg>`;
		},
	};

	feather.icons.standort = {
		name: 'standort',
		toSvg() {
			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,3.51A5.65,5.65,0,0,0,6.34,9.17C6.34,12.3,11.53,21,12,20.49s5.66-8.19,5.66-11.32A5.65,5.65,0,0,0,12,3.51Zm0,9.43a3.77,3.77,0,1,1,3.77-3.77A3.77,3.77,0,0,1,12,12.94Z" style="stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px"/></svg>`;
		},
	};

	feather.icons.kontakt = {
		name: 'kontakt',
		toSvg() {
			return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><polygon points="3 8.57 10.14 14.12 15.36 9.94 10 14 15.36 18.18 21 5.82 3 8.57" style="stroke:#fff;stroke-miterlimit:10;stroke-width:0.25px"/><polygon points="10 16 11 14.78 10 14 10 16" style="stroke:#000;stroke-miterlimit:10;stroke-width:0.25px"/></svg>`;
		},
	};

	for (const icon in feather.icons) {
		if (feather.icons.hasOwnProperty(icon)) {
			const currItt = feather.icons[icon];
			element.appendChild(createIconHolder(currItt));
		}
	}
};
