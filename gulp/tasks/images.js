import gulp from 'gulp';
import plumber from 'gulp-plumber';
import image from 'gulp-image';
import filter from 'gulp-filter';
import webp from 'gulp-webp';
import changed from 'gulp-changed';
import rename from 'gulp-rename';
import fileList from 'gulp-filelist';
import { plumberConfig, imageminConfig } from '../config';

const getPathsToConvertToWebp = filter(file => {
  if (!file.path.includes('pictures/')) return '';

  const splittedFilePath = file.path.split('pictures/');

  return splittedFilePath[splittedFilePath.length - 1];
});

const updateModuleImagePath = path => {
  const updatedPath = path.dirname
    .split('/')
    .slice(0, -1)
    .join('/');

  path.dirname = updatedPath;
};

export const moduleImages = () => gulp
  .src('**/*.{png,jpg,jpeg,gif,svg,webp}', {
    cwd: 'source/modules/**/images',
  })
  .pipe(plumber(plumberConfig))
  .pipe(rename(updateModuleImagePath))
  .pipe(changed('dest/images'))
  .pipe(gulp.dest('dest/images/_modules'));

const convertToWebp = () => gulp
  .src('**/*.{png,jpg,jpeg}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(getPathsToConvertToWebp)
  .pipe(webp())
  .pipe(gulp.dest('source/'));

const compressAddedImages = () => gulp
  .src('**/*.{png,jpg,jpeg,gif,svg}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(image(imageminConfig))
  .pipe(gulp.dest('source/'));

const saveCompressedImagesList = () => gulp
  .src('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: 'source' })
  .pipe(plumber(plumberConfig))
  .pipe(fileList('compressedImagesList.json', { relative: true }))
  .pipe(gulp.dest('source/assets/images/'));

const imgMin = gulp.series(
  compressAddedImages,
  convertToWebp,
  saveCompressedImagesList,
);

export const handleImages = gulp.series(
  imgMin,
  moduleImages,
);
