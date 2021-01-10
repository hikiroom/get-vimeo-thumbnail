(async () => {
    const fs = require('fs-extra');
    const request = require('sync-request');
    const IMG_DIR = './img/';
    const config = await fs.readJson('./config.json');
    const emptyImgDir = (err) => {
        if (err) {
            throw err;
        }

        console.log(`clean up ${IMG_DIR} directory`);
    };
    const getThumbnailBinary = (videoId, width, height) => {
        const videoDetail = JSON.parse(request('GET', `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`).body);
        const {thumbnail_url} = videoDetail;
        const thumbnail_size = thumbnail_url.match(/_(?<size>\d*x\d*)\./).groups.size.split('x');
        const thumbnail_width = thumbnail_size[0];
        const thumbnail_height = thumbnail_size[1];
        const preThumbnailUrl = thumbnail_url.replace(thumbnail_width, width).replace(thumbnail_height, height);
        const thumbnailBinary = request('GET', preThumbnailUrl, {encoding: null}).body;

        return thumbnailBinary;
    };
    const outputThumbnail = (configObj) => {
        const imgWidth = configObj.bigThumbnail || 1280;
        const imgHeight = configObj.bigThumbnail || 720;
        const imgBinary = getThumbnailBinary(configObj.id, imgWidth, imgHeight);
        const imgFileName = `${configObj.name}.jpg`;

        fs.writeFileSync(IMG_DIR + imgFileName, imgBinary, 'binary');
    };
    const init = () => {
        fs.emptyDirSync(IMG_DIR, emptyImgDir);
        config.forEach(outputThumbnail);
    };

    init();
})();