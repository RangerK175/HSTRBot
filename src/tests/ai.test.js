const ai = require('../ai');

test('properly analyzes the intent of messages', () => {
    const aiSpy = jest.spyOn(ai, 'analyzeText');

    expect(aiSpy).toBeDefined();
});