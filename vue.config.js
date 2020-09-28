module.exports = {
    pages: {
        index: {
            entry: './src/pages/Home/main.js',
            template: 'public/index.html',
            title: 'Home',
            chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
        },
        about: {
            entry: './src/pages/About/main.js',
            template: 'public/index.html',
            title: 'About',
            chunks: [ 'chunk-vendors', 'chunk-common', 'about' ]
        },
        projects: {
            entry: './src/pages/Projects/main.js',
            template: 'public/index.html',
            title: 'Projects',
            chunks: [ 'chunk-vendors', 'chunk-common', 'projects' ]
        },
        playlists: {
            entry: './src/pages/Playlists/main.js',
            template: 'public/index.html',
            title: 'Playlists',
            chunks: [ 'chunk-vendors', 'chunk-common', 'playlists' ]
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-crash-course/'
    : '/'
}