import gulp from 'gulp';
import plumber from 'gulp-plumber';
import image from 'gulp-image';
import filter from 'gulp-filter';
import webp from 'gulp-webp';
import fileList from 'gulp-filelist';
import imgCache from '../../source/assets/images/compressedImagesList.json';
import { plumberConfig, imageminConfig } from '../config';

const getUnCompressedImagesPaths = filter(
  file => !imgCache.some(cachedPath => {
    const splittedFilePath = file.path.replace(/\\/g, '/').split('source/');

    return cachedPath === splittedFilePath[splittedFilePath.length - 1];
  }),
);

const getPathsToConvertToWebp = filter(file => {
  if (!file.path.includes('pictures/')) return '';

  const splittedFilePath = file.path.split('pictures/');

  return splittedFilePath[splittedFilePath.length - 1];
});

const convertToWebp = () => gulp
  .src('**/*.{png,jpg,jpeg}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(getPathsToConvertToWebp)
  .pipe(webp())
  .pipe(gulp.dest('source/'));

const compressAddedImages = () => gulp
  .src('**/*.{png,jpg,jpeg,gif,svg}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(getUnCompressedImagesPaths)
  .pipe(image(imageminConfig))
  .pipe(gulp.dest('source/'));

const saveCompressedImagesList = () => gulp
  .src('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(fileList('compressedImagesList.json', { relative: true }))
  .pipe(gulp.dest('source/assets/images/'));

export const imgMin = gulp.series(
  compressAddedImages,
  convertToWebp,
  saveCompressedImagesList,
);
