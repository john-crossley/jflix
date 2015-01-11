mochaTest: {
    specs: {
        options: {
            ui: 'bdd',
            reporter: 'spec',
            require: './specs/helpers/chai'
        },
        src: ['specs/**/*.spec.js']
    }
}

/////////////////////////////////////////////

grunt.LoadNpmTasks('grunt-mocha-test');