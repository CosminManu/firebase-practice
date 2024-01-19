const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',        //where we want webapck initially look for our js file
    output: {
        path: path.resolve(__dirname, 'dist'),     // __dirname = gets current directory
        filename: 'bundle.js'
    },
    watch: true
}

//webapack will take the src file and any imports
//will bundle them together and put them in dist/bundle.js
//will watch at every change 