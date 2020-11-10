const bs = require('browser-sync');
const server = bs.create();
server.init({
    watch: true,
    server: './src'
});
