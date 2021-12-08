import path from 'path';

import posthtmlAttrsSorter from 'posthtml-attrs-sorter';
import rupture from 'rupture';

import errorHandler from './util/errorHandler';
import stylusFileExists from './util/stylusFileExists';

const CWD = process.cwd();

export const delConfig = ['dest', 'tmp'];

export const plumberConfig = {
  errorHandler,
};

export const browserSyncConfig = {
  server: './dest',
  notify: false,
  reloadOnRestart: true,
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
    },
  },
};

// https://github.com/jescalan/accord/blob/master/docs/stylus.md
export const stylusConfig = {
  use: [rupture(), stylusFileExists()],
  include: [path.join(CWD, 'node_modules')],
  'include css': true,
};

export const htmlPrettifyConfig = {
  unformatted: ['pre', 'code', 'textarea', 'script'],
  indent_char: ' ',
  indent_size: 2,
  preserve_newlines: true,
  brace_style: 'expand',
  end_with_newline: true,
};

export const imageminConfig = {
  pngquant: true,
  optipng: true,
  zopflipng: false,
  jpegRecompress: false,
  mozjpeg: true,
  guetzli: false,
  gifsicle: true,
  svgo: false,
  concurrent: 10,
  quiet: false, // defaults to false
};

export const posthtmlConfig = {
  plugins: [
    posthtmlAttrsSorter({
      order: [
        'class',
        'id',
        'name',
        'data',
        'ng',
        'src',
        'for',
        'type',
        'href',
        'values',
        'title',
        'alt',
        'role',
        'aria',
      ],
    }),
  ],
  options: {},
};
