import express from 'express'
import { genNumber, getNumber } from '../core/getNumber'

const router = express.Router()

router.post('/start', (_, res) => {
	genNumber();
	res.json({ msg: 'The game has started.' });
})
router.get('/guess', (req, res) => {
	let guessNum = parseInt(req.query.num);
	if (guessNum > 100 || guessNum < 1 || isNaN(guessNum)) {
		res.status(406).send("BROKEN");
		// throw new Error('BROKEN');
	}
	else {
		let num = getNumber();
		if (guessNum === num)
			res.json({ msg: 'Equal' });
		else if (guessNum > num)
			res.json({ msg: 'Smaller' });
		else
			res.json({ msg: 'Bigger' });
	}
})
router.post('/restart', (_, res) => {
	genNumber();
	res.json({ msg: 'The game has restarted.' });
})

export default router;