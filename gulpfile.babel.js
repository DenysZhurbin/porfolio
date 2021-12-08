import gulp from 'gulp';
import { build, buildMobile, buildPageSpeed } from './gulp/tasks/build';
import { zip } from './gulp/tasks/zip';
import { dev } from './gulp/tasks/dev';
import { handleImages } from './gulp/tasks/images';
import { resizeFunctionalityImages } from './gulp/tasks/resizeFunctionalityImages';

// Main tasks
gulp.task('build', build);
gulp.task('buildMobile', buildMobile);
gulp.task('buildPageSpeed', buildPageSpeed);
gulp.task('zip', zip);
gulp.task('dev', dev);
gulp.task('images', handleImages);
gulp.task('resizeFunctionalityImages', resizeFunctionalityImages);

// Default task
gulp.task('default', gulp.series('dev'));
