/** @format */

/** this file handles the pageOrganization modal and all associated functions */
import { router, firstPaint, Progress } from './app_backend.js';
import { createSyncContent } from './createContent.mjs';

const organizer = {
	buttonOpen: document.querySelector('#dashboard-organizePage'),
	buttonClose: document.querySelector(
		'.pageOrganizer-Container .modal-close'
	),
	buttonSave: document.querySelector('#organizerSave'),
	modal: document.querySelector('.dashboard-pageOrganizer'),
	init() {
		this.buttonOpen.addEventListener('click', (ev) => {
			document.querySelector('body').style.overflowY = 'hidden';
			this.modal.style.display = 'flex';
			this.setupOrganizer();
		});
		this.buttonClose.addEventListener('click', (ev) => {
			document.querySelector('body').style.overflowY = 'auto';
			this.modal.style.display = 'none';
		});
		this.buttonSave.addEventListener('click', (ev) => {
			this.updateAll();
		});
	},
	async setupOrganizer() {
		const container = document.querySelector('.organizer-Container');

		while (container.firstElementChild) {
			container.firstElementChild.remove();
		}

		container.addEventListener('dragend', (ev) => {
			let dropTargets = container.querySelectorAll(
				'.organizer-dropTarget'
			);

			dropTargets.forEach((tar) => tar.classList.remove('dragReady'));
		});

		// get data
		let pageData = await fetch('/api', {
			method: 'GET',
		}).then((res) => res.json());

		// order the pages from pageIndex property
		pageData.sort((a, b) => a.pageIndex - b.pageIndex);

		this.pageData = pageData;
		console.log(pageData);

		const cleanUp = () => {
			let dropTargets = container.querySelectorAll(
				'.organizer-dropTarget'
			);

			// delete all dropTargets;

			dropTargets.forEach((tar) => tar.remove());

			let draggables = container.querySelectorAll('.organizer-item');

			draggables.forEach((drag) => {
				container.insertBefore(createDropTarget(), drag);
			});

			container.appendChild(createDropTarget());
		};

		const setTargets = () => {
			let dropTargets = container.querySelectorAll(
				'.organizer-dropTarget'
			);

			dropTargets.forEach((tar) => tar.classList.add('dragReady'));
		};

		const createOganizer = (data) => {
			let org = document.createElement('div');
			org.setAttribute('pageid', data.pageId);
			org.draggable = 'true';
			org.className = `organizer-item`;
			org.id = `drag-${data.title}`;

			org.addEventListener('dragstart', (ev) => {
				setTargets();
				ev.dataTransfer.setData('text/plain', ev.target.id);
				ev.dataTransfer.dropEffect = 'move';
			});

			// create icon
			org.innerHTML = feather.icons[data.icon].toSvg();

			// create the destination name label
			let span = document.createElement('span');
			span.className = 'organizer-label';
			span.textContent = data.dest;

			org.appendChild(span);

			// create the activ / inactive checkbox
			let con = document.createElement('div');
			let label = document.createElement('label');
			label.textContent = 'Aktiv';

			con.appendChild(label);
			let check = document.createElement('input');
			check.type = 'checkbox';
			check.setAttribute('target', 'active');
			data.pageActive ? (check.checked = true) : (check.checked = false);

			con.appendChild(check);

			org.appendChild(con);

			// create the activ / inactive checkbox
			let con2 = document.createElement('div');
			let label2 = document.createElement('label');
			label2.textContent = 'Löschen?';

			con2.appendChild(label2);
			let check2 = document.createElement('input');
			check2.type = 'checkbox';
			check2.setAttribute('target', 'delete');

			con2.appendChild(check2);

			org.appendChild(con2);

			return org;
		};

		const createDropTarget = () => {
			let dropTarget = document.createElement('div');
			dropTarget.className = 'organizer-dropTarget';
			dropTarget.addEventListener('dragover', (ev) => {
				ev.preventDefault();
				ev.target.classList.add('dragOver');
			});
			dropTarget.addEventListener('dragleave', (ev) => {
				ev.preventDefault();
				ev.target.classList.remove('dragOver');
			});
			dropTarget.addEventListener('drop', (ev) => {
				ev.preventDefault();

				ev.target.classList.remove('dragOver');

				const data = ev.dataTransfer.getData('text/plain');
				ev.target.parentElement.insertBefore(
					document.getElementById(data),
					ev.target
				);
				cleanUp();
			});

			return dropTarget;
		};

		pageData.forEach((page) => {
			container.appendChild(createDropTarget());
			container.appendChild(createOganizer(page));
		});

		container.appendChild(createDropTarget());
	},
	async updateAll() {
		// check for pages to delete
		let items = document.querySelectorAll('.organizer-item');

		let pagesToDelete = [];
		items.forEach((item) => {
			if (item.querySelector("[target='delete']").checked) {
				pagesToDelete.push(item.getAttribute('pageid'));
			}
		});

		// delete all marked pages
		pagesToDelete.forEach(async (elem) => {
			await fetch('/api/deletePage', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ pageId: elem }),
			});
		});

		let pagesToSubmit = this.pageData.filter(
			(elem) => !pagesToDelete.includes(elem.pageId)
		);

		// merge the updated data into the pagesToSubmit
		items.forEach((item) => {
			let update = pagesToSubmit.find(
				(elem) => item.getAttribute('pageid') == elem.pageId
			);

			if (update) {
				update.pageActive = item.querySelector(
					"[target='active']"
				).checked;

				update.pageIndex = Array.from(
					document.querySelectorAll('.organizer-item')
				).indexOf(item);
			}
		});

		pagesToSubmit.forEach(async (page) => {
			Progress.set();
			await fetch('/api/updatePage', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(page),
			})
				.then((res) => res.json())
				.then(async (data) => {
					let page = data.data;
					router.create(page.dest, {
						title: `JuZe Sauerlach | ${page.title}`,
						callback: createSyncContent,
						callbackArgs: [
							page.content,
							page.headerImage,
							page.title,
						],
					});
					await firstPaint();
					document.querySelector('body').style.overflowY = 'auto';
					this.modal.style.display = 'none';
					Progress.close();
				})
				.catch((err) => console.log(err));
		});
	},
};

organizer.init();
