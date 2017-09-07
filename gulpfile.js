
var gulp = require( 'gulp' );
var named = require( 'vinyl-named' );
var webpack = require( 'webpack-stream' );
var ts = require( 'gulp-typescript' );

let outDir = 'extension/js';
let tsOptions = {
    resolve: {
        extensions: [ '.ts' ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
}

/* build popup */
gulp.task( 'build_popup', function(){
    return gulp.src( [ 'ts/popup/*.ts' ] )
        .pipe( named() )
        .pipe( webpack( tsOptions ) )
        .pipe( gulp.dest( outDir + '/popup' ) );
});

/* build background script */
gulp.task( 'build_background', function(){
    return gulp.src( [ 'ts/background/*.ts' ] )
        .pipe( named() )
        .pipe( webpack( tsOptions ) )
        .pipe( gulp.dest( outDir + '/background ' ) );
});

gulp.task( 'build_workers', function(){ 
    var tsProject = ts.createProject( 'tsconfig.json' );
    return gulp.src( 'ts/worker/*.worker.ts' )
        .pipe( tsProject() )
        .js.pipe( gulp.dest( outDir + '/worker' ) );
        
});

/* build all */
gulp.task( 'build', [ 'build_popup', 'build_background', 'build_workers' ] );