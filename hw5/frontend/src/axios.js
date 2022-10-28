import axios from 'axios'
const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'});

const startGame = async () => {
    try{
    const {data: {msg}} =
    await instance.post('/start');
    return msg
    }
    catch(error) {
        console.log(error);
    }
};

const guess = async (number) => {
    try {
        const {data: {msg}} = await instance.get('/guess', {params: {number}});
        
        return msg
        
    }
    catch(error) {
        return 'Not legal'
    }
};

const restart = async () => {
    try {
        const {data: {msg}} = await instance.post('/restart');

        return msg
    }
    catch (error){
        console.log(error);
    }

}

export {startGame, guess, restart}