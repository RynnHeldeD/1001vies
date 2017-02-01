var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');

// SASS
gulp.task('sass-lib', function() {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/bulma/css/bulma.css',
			'node_modules/font-awesome/css/font-awesome.css',
			'node_modules/slick-carousel/slick/slick.scss',
			'node_modules/slick-carousel/slick/slick-theme.scss'
		])
		.pipe(sass())
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

// SCRIPTS
gulp.task('js-lib', function() {
	return gulp.src([
			'node_modules/slick-carousel/slick/slick.js'
		])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('dist/app'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/app'))
		.pipe(notify({message: 'js-lib task complete!'}));
});

gulp.task('js-app', function() {
	return gulp.src([
			'app/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/app'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/app'))
		.pipe(notify({message: 'js-app task complete!'}));
});

// FONTS
gulp.task('font-awesome', function() {
	return gulp.src([
			'node_modules/font-awesome/fonts/*',
			'node_modules/slick-carousel/slick/fonts/*'
		])
		.pipe(gulp.dest('dist/assets/fonts/'));
});


// CLEANING
gulp.task('clean-lib', function() {
	return del([
		'dist/assets/css/lib.css',
		'dist/assets/css/lib.min.css',
		'dist/app/lib.js',
		'dist/app/lib.min.js'
	]);
});

gulp.task('clean-app', function() {
	return del([
		'dist/assets/css/style.css',
		'dist/assets/css/style.min.css',
		'dist/app/app.js',
		'dist/app/app.min.js'
	]);
});

// BUILDS
gulp.task('default', ['clean-app'], function() {
	gulp.start('sass-app', 'js-app');
});

gulp.task('build', ['clean-lib', 'clean-app'], function() {
	gulp.start('sass-lib', 'sass-app', 'font-awesome', 'js-lib', 'js-app');
});

gulp.task('clean', function() {
	gulp.start('clean-lib', 'clean-app');
});