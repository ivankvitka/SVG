var gulp = require('gulp');
var sass = require('gulp-sass');
var	browserSync = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task("sass", function () {
	gulp
		.src("app/scss/**/*.scss")
		.pipe(plumber())
		.pipe(sass({outputStyle: "expanded"}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
	gulp.watch('app/scss/*.+(sass|scss)', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', function () {
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('build/css'));
	gulp.src('app/*.html')
		.pipe(gulp.dest('build'));
});