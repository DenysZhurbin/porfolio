import gulp from "gulp";
import scaleImages from "gulp-scale-images";
import path from "path";

const flatMap = require('flat-map').default;

const computeFileName = (output, scale, cb) => {
  let fileName;

  if (scale.maxWidth === 533) {
    fileName = [
      path.basename(output.path, output.extname),
      scale.format || output.extname
    ].join('.');
   } else {
    fileName = [
      path.basename(output.path, output.extname) + "@2x",
      scale.format || output.extname
    ].join('.');
  }

  cb(null, fileName)
};

const twoVariantsPerFile = (file, cb) => {
  const webpFile = file.clone();
  const webpFile2x = file.clone();
  console.log(webpFile);
  webpFile.scale = { maxWidth: 533, format: 'webp' };
  webpFile2x.scale = { maxWidth: 1066, format: 'webp' };
  const jpegFile = file.clone();
  const jpegFile2x = file.clone();
  jpegFile.scale = { maxWidth: 533, format: 'jpeg' };
  jpegFile2x.scale = { maxWidth: 1066, format: 'jpeg' };
  cb(null, [webpFile, webpFile2x, jpegFile, jpegFile2x]);
};

export const resizeFunctionalityImages = () => {
  return gulp
    .src("**/*.{png,jpg,jpeg,gif,svg,webp}", {
      cwd: "source/assets/images/functionality/content"
    })
    .pipe(flatMap(twoVariantsPerFile))
    .pipe(scaleImages(computeFileName))
    .pipe(gulp.dest("dest/images/functionality/content"))
};
