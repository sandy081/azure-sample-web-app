'use strict';

const gulp = require('gulp');
const tsb = require('gulp-tsb');
const tslint = require('gulp-tslint');
const filter = require('gulp-filter');

const serverOptions = require('./tsconfig.json').compilerOptions;
const lintOptions = require('./tslint.json');
const serverCompilation = tsb.create(serverOptions);

gulp.task('compile-server', () => {
	const tsdFilter = filter(['**/*.{ts,tsx}', '!**/*.d.ts'], { restore: true });

	return gulp.src('src/**/*.{ts,tsx}', { base: 'src' })
		.pipe(tsdFilter)
		.pipe(tslint({ configuration: lintOptions }))
		.pipe(tslint.report({ emitError: false }))
		.pipe(tsdFilter.restore)
		.pipe(serverCompilation())
		.pipe(gulp.dest('out'));
});

gulp.task('watch-server', ['compile-server'], () => {
	return gulp.watch('src/**/*.{ts,tsx}', ['compile-server']);
});
gulp.task('compile', ['compile-server']);
gulp.task('watch', ['watch-server']);

gulp.task('default', ['compile']);