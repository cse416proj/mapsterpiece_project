module.exports = {
    client_base_url: (process.env.NODE_ENV === 'production') ? 'https://mapsterpiece.online' : 'http://localhost:3000',
    server_base_url: (process.env.NODE_ENV === 'production') ? 'https://mapsterpiece.online' : 'http://localhost:4000'
}