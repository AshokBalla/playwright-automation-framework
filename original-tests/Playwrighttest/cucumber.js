export default {
    default: {
        paths: ['features/**/*.feature'],
        require: ['features/setp_def/**/*.js'],
        requireModule: [],
        format: ['html:cucumber-report.html', 'summary'],
        formatOptions: {},
        publishQuiet: true
    }
}; 