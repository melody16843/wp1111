var num = 0;

const getNumber = () => {
	return num;
}

const genNumber = () => {
	num = Math.floor(Math.random() * 100) + 1;
}

export { genNumber, getNumber }