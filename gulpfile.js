var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
	srcPath : 'src/',
	devPath : 'build/',
	prdPath : 'dist/'
};

//copy the library to the build and production folder
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'vendor'))
	.pipe($.connect.reload());
});

//copy the html files
gulp.task('html',function(){
	gulp.src( app.srcPath +  '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

//copy the json data file
gulp.task('json', function(){
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload());
});

//compile and minify the less file
gulp.task('less',function(){
	gulp.src(app.srcPath + 'style/index.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload());
});

//merge js and minify files
gulp.task('js', function(){
	gulp.src(app.srcPath + 'script/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

//compress the image
gulp.task('image',function(){
	gulp.src( app.srcPath + 'image/**/*')
	.pipe(gulp.dest(app.devPath + 'image'))
	.pipe($.imagemin({progressive: true}))
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
});

//clean the folder 
gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean());
});

//reload all task
gulp.task('build',['image','js','less','lib','html','json']);

//auto update
gulp.task('serve',function(){
	$.connect.server({
		root: [app.devPath],
		livereload: true,
		port: 1234
	});
	//open('http://localhost:1234');
	
	
	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'data/**/*.json',['json']);
	gulp.watch(app.srcPath + 'style/**/*.less',['less']);
	gulp.watch(app.srcPath + 'script/**/*.js',['js']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
})

//default task 
gulp.task('default', ['serve']);
