import browserSync from 'browser-sync';

// Configuração do Browsersync
const bs = browserSync.create();

// Inicia o servidor
bs.init({
    server: {
        baseDir: './output',
        index: 'index.html'
    },
    files: [
        './output/**/*.html',
        './output/**/*.css',
        './output/**/*.js'
    ],
    port: 3000,
    open: true,
    notify: true,
    ui: {
        port: 3001
    }
}); 
