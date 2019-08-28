// vue.config.js
module.exports = {
    css: { extract: false },
    chainWebpack(config) {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    }
}