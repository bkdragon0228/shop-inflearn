if (process.env.NODE_ENV === 'production') {
    // 배포 후엔 prod에서 가져오기
    module.exports = require('./prod');
} else {
    // 로컬 환경에선 dev에서 가져오기
    module.exports = require('./dev');
}
