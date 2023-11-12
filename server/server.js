// node apis to be used
const dotenv = require('dotenv')
const app = require('./app');

// create server
dotenv.config()
const PORT = process.env.PORT || 4000;

// put server in listening mode
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
app.on('error', (e) => log.error(`Error opening listener on port ${port}`, e));