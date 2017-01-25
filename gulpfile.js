var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');

// SASS
gulp.task('sass-lib', function() {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/bulma/css/bulma.css',
			'node_modules/font-awesome/css/font-awesome.min.css'
		])
		.pipe(concat('lib.css'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(notify({message: 'sass-lib task complete!'}));
});

gulp.task('sass-app', function() {
	return gulp.src('app/**/*.scss')
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(notify({message: 'sass-app task complete!'}));
});


// CLEANING
gulp.task('clean-lib', function() {
	return del([
		'dist/assets/css/lib.css',
		'dist/assets/css/lib.min.css'
	]);
});

gulp.task('clean-app', function() {
	return del([
		'dist/assets/css/style.css',
		'dist/assets/css/style.min.css'
	]);
});

// BUILDS
gulp.task('default', ['clean-lib', 'clean-app'], function() {
	gulp.start('sass-lib', 'sass-app');
});

gulp.task('clean', function() {
	gulp.start('clean-lib', 'clean-app');
});