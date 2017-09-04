# Evo JS Benchmark

### Installation
```
npm install
```
or
```
yarn
```

### Development

```
npm run watch
```

### Production build
```
npm run build
```

File **lib/benchmark.js** is ready to use.

### Run plugin

```javascript
(function () {
    var script = document.createElement('script');
    script.src = '//rawgit.com/evolution-gaming/js-benchmark/master/lib/benchmark.js';
    document.head.appendChild(script);
})();
```

### Bookmarklet

```javascript
javascript:(function(){var a=document.createElement('script');a.src='//rawgit.com/evolution-gaming/js-benchmark/master/lib/benchmark.js',document.head.appendChild(a)})();
```
