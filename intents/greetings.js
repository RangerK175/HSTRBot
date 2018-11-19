const random = array => { return array[Math.floor(Math.random() * array.length)] };

const getGreetings = () => {
    const answers = [
        'Hello',
        'Yo! Good to see you',
        'Hey, nice to see you',
        'Welcome back',
        'Hola',
        'Hey, what\'s up',
    ];
    return random(answers)
};

module.exports = getGreetings;