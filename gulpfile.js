//include gulp
var gulp = require('gulp');

//include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// Lint Task
gulp.task('lint', function(){
	return gulp.src('./public/app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Sass Compiler
gulp.task('sass', function(){
	return gulp.src('./public/stylesheets/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./public/dist'));
});


// Concatenate and Minify JS
gulp.task('scripts', function(){
	return gulp.src('./public/app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./public/dist'))
});

// Watch Files for changes
gulp.task('watch', function(){
	gulp.watch('./public/app/**/*.js', ['lint', 'scripts']);
	gulp.watch('./public/stylesheets/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);