const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const { series, parallel } = require('gulp');

function html(cb) {
	gulp.src('./src/**.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./dist/'));
	cb();
}

function css(cb) {
	gulp.src('./src/css/**.css')
		.pipe(gulp.dest('./dist/css/'));
	cb();
}

function js(cb) {
	gulp.src('./src/js/**.js')
		.pipe(gulp.dest('./dist/js/'));
	cb();
}

function meta(cb) {
	gulp.src('./src/meta/**')
		.pipe(gulp.dest('./dist/meta/'));
	cb();
}

function images(cb) {
	gulp.src('./src/images/**')
		.pipe(gulp.dest('./dist/images/'));
	cb();
}

exports.default = parallel(html, css, js, meta, images);


// const fileinclude = require('gulp-file-include');
// const gulp = require('gulp');

// function defaultTask(cb) {
// 	gulp.src('./src/**')
// 		.pipe(fileinclude({
// 			prefix: '@@',
// 			basepath: '@file'
// 		}))
// 		.pipe(gulp.dest('./dist/'));
// 	cb();
// }

// exports.default = defaultTask;
