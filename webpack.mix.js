const mix = require('laravel-mix');

if (mix.inProduction()) {
  mix.version();
}

mix.setPublicPath('./src/')
   .setResourceRoot('/src');

mix.autoload({
  jquery: ['$', 'jQuery'],
});

mix.js('assets/js/app.js', 'app.js')
   .less('assets/less/style.less', 'style.css');