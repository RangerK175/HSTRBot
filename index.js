const express = require('express');
const bodyParser = require('body-parser');
const hstr = require('./src/services/hstrService');
const charService = require('./src/services/characterService');

const app = express();
app.use(bodyParser.json());

// Load routes
app.post('/hstr-teams', hstr.getHstrTeam);
app.post('/character-abbr', charService.getCharacterByAbbr);
app.post('/errors', function (req, res) {
    res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
