const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

class JsCss2JsonPlugin {
    constructor() {
        this.distPath = '';
        this.publicPath = '';
        this.assets = {
            js: [],
            css: []
        };
    }

    /**
     * 获取js和css文件路径
     * @param {*} compilation 
     * @param {*} entryNames 
     */
    JsCss2JsonPluginAssets(compilation, entryNames) {
        const compilationHash = compilation.hash;
        const webpackPublicPath = compilation.mainTemplate.getPublicPath({ hash: compilationHash });
        const isPublicPathDefined = webpackPublicPath.trim() !== '';
        this.publicPath = isPublicPathDefined
        // If a hard coded public path exists use it
            ? webpackPublicPath
        // If no public path was set get a relative url path
            : path.relative(path.resolve(compilation.options.output.path), compilation.options.output.path)
                .split(path.sep).join('/');

        if (this.publicPath.length && this.publicPath.substr(-1, 1) !== '/') {
            this.publicPath += '/';
        }

        // Extract paths to .js, .mjs and .css files from the current compilation
        const entryPointPublicPathMap = {};
        const extensionRegexp = /\.(css|js|mjs)(\?|$)/;
        for (let i = 0; i < entryNames.length; i++) {
            const entryName = entryNames[i];
            const entryPointFiles = compilation.entrypoints.get(entryName).getFiles();
            // Prepend the publicPath and append the hash depending on the
            // webpack.output.publicPath and hashOptions
            // E.g. bundle.js -> /bundle.js?hash
            const entryPointPublicPaths = entryPointFiles
                .map(chunkFile => this.publicPath + chunkFile);

            entryPointPublicPaths.forEach((entryPointPublicPath) => {
                const extMatch = extensionRegexp.exec(entryPointPublicPath);
                // Skip if the public path is not a .css, .mjs or .js file
                if (!extMatch) {
                    return;
                }
                // Skip if this file is already known
                // (e.g. because of common chunk optimizations)
                if (entryPointPublicPathMap[entryPointPublicPath]) {
                    return;
                }
                entryPointPublicPathMap[entryPointPublicPath] = true;
                // ext will contain .js or .css, because .mjs recognizes as .js
                const ext = extMatch[1] === 'mjs' ? 'js' : extMatch[1];
                this.assets[ext].push(entryPointPublicPath);
            });
        }
    }

    saveJson() {
        if (this.distPath.length && this.distPath.substr(-1, 1) !== '/') {
            this.distPath += '/';
        }
        fs.writeFileSync(`${this.distPath}index.json`, JSON.stringify(this.assets, null, 4));
        const templatePath = `${this.distPath}template.html`;
        if (fs.existsSync(templatePath)) {
            console.log('exist');
            fs.unlinkSync(templatePath);
        }
    }

    /**
     * 注入js
     * @param {*} distPath 
     * @param {*} assets 
     */
    injectJs() {
        if (this.distPath.length && this.distPath.substr(-1, 1) !== '/') {
            this.distPath += '/';
        }
        const htmlPath = this.distPath + 'index.html';
        let content = fs.readFileSync(htmlPath, 'utf-8');
        const scriptContent = `
        <script>
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '${this.publicPath}index.json?v=' + Math.random(), true);
            xhr.addEventListener("load", function () {
                var assets = JSON.parse(xhr.response);
                window.__loadAssetsList('css', assets.css, function () {
                    // 这里是css加载完，正常是不需要处理的
                });
                window.__loadAssetsList('script', assets.js, function () {
                    // 这里是js加载完
                });
            });
            xhr.send(null);
        </script>`;
        fs.writeFileSync(htmlPath, minify(
            content.replace('<noscript>jscss2jsonplugin inject js</noscript>', scriptContent),
            {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        ));
    }
    
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('JsCss2JsonPlugin', (compilation, callback)=> {
            const entryNames = Array.from(compilation.entrypoints.keys());
            this.JsCss2JsonPluginAssets(compilation, entryNames);
            this.distPath = compilation.mainTemplate.outputOptions.path;
            this.saveJson();
            this.injectJs();
            callback();
        });
    }
}

module.exports = JsCss2JsonPlugin;