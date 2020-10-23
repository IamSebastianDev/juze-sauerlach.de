/** @format */

/** this file controls all methods for fileupload */

const uploader = {
	file: undefined,
	input: document.querySelector('#fileControl-inputFile'),
	submit: document.querySelector('.fileControl-submit'),
	label: document.querySelector('.fileControl-input'),
	status: document.querySelector('.fileControl-status'),
	loader: document.querySelector('.fileControl-loader'),
	browser: document.querySelector('.fileControl-Browser'),
	containerImages: document.querySelector('#content-images'),
	switchImages: document.querySelector('#switch-images'),
	containerFiles: document.querySelector('#content-files'),
	switchFiles: document.querySelector('#switch-files'),
	enlarge: document.querySelector('.fileControl-enlarge'),
	fileModal: document.querySelector('.dashboard-fileModal'),
	modalClose: document.querySelector('.fileModal .modal-close'),
	init() {
		this.modalClose.addEventListener('click', (ev) => {
			this.fileModal.style.display = 'none';
			document.querySelector('body').style.overflow = '';
		});
		this.enlarge.addEventListener('click', (ev) => {
			this.browser.classList.toggle('modal');
			this.browser.classList.toggle('browser-enlarged');

			let dashboard = document.querySelector('.dashboard-container');
			let body = document.querySelector('body');

			dashboard.style.overflow =
				dashboard.style.overflow == '' ? 'visible' : '';
			body.style.overflow = body.style.overflow == '' ? '' : 'hidden';
		});
		this.switchFiles.addEventListener('click', (ev) => {
			this.containerImages.style.display = 'none';
			this.containerFiles.style.display = 'flex';
			this.switchImages.classList.remove('fileControl-active');
			this.switchFiles.classList.add('fileControl-active');
		});
		this.switchImages.addEventListener('click', (ev) => {
			this.containerImages.style.display = 'flex';
			this.containerFiles.style.display = 'none';
			this.switchImages.classList.add('fileControl-active');
			this.switchFiles.classList.remove('fileControl-active');
		});

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
				// check if the filetype is supported

				// get the file name
				let fileName = files[0].name;
				// get extensiton
				let fileNameSplit = fileName.split('.');
				let ext = fileNameSplit[fileNameSplit.length - 1];

				if (!ext.match(/jpg|jpeg|png|gif|pdf/gim)) {
					this.submit.disabled;
					this.label.classList.remove('label-dragOver');
					this.label.querySelector(
						'svg'
					).outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,50,100,1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
					this.status.textContent =
						'Dieser Datei typ wird leider nicht unterstüzt.';
					return;
				}
				this.label.classList.remove('label-dragOver');
				this.status.textContent = files[0].name;
				this.label.querySelector('svg').outerHTML = `<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="rgba(50,200,100,1)"
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
		this.submit.disabled = false;
	},
	async sendFile() {
		this.loader.style.display = 'flex';

		let response = await fetch('/api/upload', {
			method: 'POST',
			body: this.file,
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));

		if (response.success) {
			this.loader.style.display = 'none';

			this.status.textContent = `Link: ${response.path}`;
			await this.getFiles();
		} else {
			this.loader.style.display = 'none';
			this.label.querySelector(
				'svg'
			).outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,50,100)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
			this.status.textContent =
				'Oh nein, irgendwas hat nicht geklappt. Versuche es doch noch einmal.';
		}
	},
	async getFiles() {
		let files = await fetch('/api/upload').then((res) => res.json());

		console.log(files);

		const createCard = (item, type) => {
			let card = document.createElement('div');
			card.className = 'content-card';
			card.setAttribute('path', item.path);
			card.setAttribute('card-hover', item.name);

			let preview = document.createElement('img');
			preview.src =
				type == 'images' ? item.path : './assets/icons/file-text.svg';

			let name = document.createElement('span');
			name.textContent = item.name;

			let button = document.createElement('button');
			button.className = 'content-card-showLink';
			button.textContent = 'Zeige link.';

			button.addEventListener('click', (ev) =>
				this.handleLinkModal(ev, item)
			);

			card.appendChild(preview);
			card.appendChild(name);
			card.appendChild(button);

			return card;
		};

		for (const cat in files) {
			if (files.hasOwnProperty(cat)) {
				const category = files[cat];
				console.log(cat);

				let anchor = document.querySelector(`#content-${cat}`);

				while (anchor.firstElementChild) {
					anchor.firstElementChild.remove();
				}

				category.forEach((item) => {
					anchor.appendChild(createCard(item, cat));
				});
			}
		}
	},
	handleLinkModal(ev, item) {
		console.log(item.path);
		document.querySelector('body').style.overflow = 'hidden';
		this.fileModal.style.display = 'flex';

		let container = document.querySelector('.fileModal-content');
		while (container.firstElementChild) {
			container.firstElementChild.remove();
		}

		let image = document.createElement('img');
		image.src = !item.path.match(/\/files\//gim)
			? item.path
			: './assets/icons/file-text.svg';
		image.alt = item.name;

		let imageHolder = document.createElement('div');
		imageHolder.className = 'fileModal-imageContainer';

		imageHolder.appendChild(image);

		container.appendChild(imageHolder);

		let name = document.createElement('span');
		name.textContent = item.name;

		container.appendChild(name);

		let path = document.createElement('div');
		path.className = 'fileModal-pathContainer';

		let pathName = document.createElement('span');
		pathName.textContent = item.path;

		path.appendChild(pathName);

		let pathButton = document.createElement('button');
		pathButton.innerHTML = feather.icons.copy.toSvg();

		// helper function to copy somnething to the clipboard
		const copyToClipboard = (path) => {
			let src = path;

			if (navigator.clipboard) {
				let data = [
					new ClipboardItem({
						'text/plain': new Blob([src], {
							type: 'text/plain',
						}),
					}),
				];

				navigator.clipboard.write(data);
			} else {
				// fallback for Safari mostly, which doesn't support the clipboard api.
				// and obviouly IE, but who cares.

				let data = document.createElement('textarea');

				data.style =
					'display: hidden; position: fixed: top: 0; left: 0; z-index: -1000; visibilty: none;';
				document.querySelector('body').appendChild(data);
				data.value = src;

				data.focus();
				data.select();
				data.setSelectionRange(0, 99999); /*For mobile devices*/

				/* Copy the text inside the text field */
				document.execCommand('copy');

				data.remove();
			}
		};

		pathButton.addEventListener('click', (ev) => {
			copyToClipboard(item.path);
		});

		path.appendChild(pathButton);

		container.appendChild(path);

		let deleteButton = document.createElement('button');
		deleteButton.textContent = 'Datei löschen.';
		deleteButton.className = 'fileModal-deleteContent dashboard-button';
		deleteButton.addEventListener('click', async (ev) => {
			let result = await fetch('/api/deleteFile', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ path: item.path }),
			}).then((res) => res.json());

			if (result.success) {
				deleteButton.disabled = true;
				deleteButton.textContent = 'Datei gelöscht.';
				this.getFiles();

				window.setTimeout(() => {
					this.fileModal.style.display = 'none';
					document.querySelector('body').style.overflow = '';
				}, 1000);
			}
		});

		container.appendChild(deleteButton);
	},
};

uploader.init();
uploader.getFiles();
