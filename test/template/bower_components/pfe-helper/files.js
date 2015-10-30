// WARNING: main.js MUST be at first place
pfeHelperFiles = {
    src: [
        'src/main.js',
        'src/logger/logger.service.js',
        'src/exception/exception.service.js',
        'src/exception/exception-handler.provider.js',
        'src/router/router-helper.provider.js'
    ]
};

if (exports) {
    exports.files = pfeHelperFiles;
}