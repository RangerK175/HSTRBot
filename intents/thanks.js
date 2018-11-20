const random = array => { return array[Math.floor(Math.random() * array.length)]; };

const getThanks = () => {
    const thanks = [
        `You're welcome`,
        'Not a problem',
        'Just being helpful :smiley:',
        'Anytime!',
    ];
    return random(thanks);
};

module.exports = getThanks;
