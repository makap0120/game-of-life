const browserSync = require("browser-sync");

try {
    console.log(1);
    // var livereload = require('livereload');
    // var server = livereload.createServer();
    // console.log(server);
    // server.watch(__dirname + "/public");
    const bs = require('browser-sync');
    const server = bs.create();
    server.init({
        watch: true,
        server: './src'
    });
    console.log(2);
    
} catch(e) {
    console.log(e.message);
}