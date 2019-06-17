export const randInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const appendNew = (
	elementType: string,
	parent: HTMLElement,
	classList: string[] = [],
	dataAttributes: { [key: string]: string } = {},
): HTMLElement => {
	const newEl = document.createElement(elementType);
	for (const className of classList) {
		newEl.classList.add(className);
	}
	for (const attribute of Object.keys(dataAttributes)) {
		newEl.setAttribute(`data-${attribute}`, dataAttributes[attribute]);
	}
	parent.appendChild(newEl);
	return newEl;
};

export const setRandomColor = (el: HTMLElement): string => {
	const r = randInt(0, 255);
	const b = randInt(0, 255);
	const g = randInt(0, 255);
	const colorStr = `rgb(${r}, ${g}, ${b})`;
	el.style.backgroundColor = colorStr;
	return colorStr;
};

export const setColorFromArray = (el: HTMLElement, n: number): string => {
	el.style.backgroundColor = squareColors[n];
	return squareColors[n];
};

export const squareColors = [
	'#c00',
	'#c60',
	'#cc0',
	'#c0c',
	'#ccc',
	'#0c0',
	'#60c',
	'#00c',
	'#0cc',
];

export const delay = (ms: number): Promise<void> =>
	new Promise(
		(r: (value?: void | PromiseLike<void> | undefined) => void): number =>
			setTimeout(r, ms),
	);
