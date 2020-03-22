module.exports = {
    ...require('./webpack.config.prod'),
    ...{
        devtool: 'source-map'
    }
}
