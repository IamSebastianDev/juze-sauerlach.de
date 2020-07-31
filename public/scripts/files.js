/** @format */

/** this file controls all methods for fileupload */

const uploader = {
	file: undefined,
	input: document.querySelector('#fileControl-inputFile'),
	submit: document.querySelector('.fileControl-submit'),
	label: document.querySelector('.fileControl-input'),
	status: document.querySelector('.fileControl-status'),
	loader: document.querySelector('.fileControl-loader'),
	init() {
		this.label.addEventListener('dragover', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();
			this.label.classList.add('label-dragOver');
		});
		this.label.addEventListener('dragleave', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();
			this.label.classList.remove('label-dragOver');
		});
		this.label.addEventListener('drop', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();

			let files = ev.dataTransfer.files;

			if (files.length != 0) {
				this.label.classList.remove('label-dragOver');
				this.status.textContent = files[0].name;
				this.label.querySelector('svg').outerHTML = `<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-check-circle">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>`;

				this.createFile(files[0]);
			}
		});
		this.input.addEventListener('change', (ev) => {
			this.createFile(ev.target.files[0]);
			this.status.textContent = ev.target.files[0].name;
		});
		this.submit.addEventListener('click', (ev) => {
			ev.preventDefault();
			ev.stopPropagation();
			this.sendFile();
		});
	},
	createFile(file) {
		this.file = new FormData();
		this.file.append('file', file);
	},
	async sendFile() {
		this.loader.style.display = 'flex';

		let response = await fetch('/api/upload', {
			method: 'POST',
			body: this.file,
		}).then((res) => res.json());

		if (response.success) {
			this.loader.style.display = 'none';

			this.status.textContent = `Link: ${response.path}`;
		} else {
			this.loader.style.display = 'none';
			this.label.querySelector(
				'svg'
			).outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`;
			this.status.textContent =
				'Oh nein, irgendwas hat nicht geklappt. Versuche es doch noch einmal.';
		}
	},
};

uploader.init();
