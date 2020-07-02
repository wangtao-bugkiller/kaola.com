const http = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

http.get('https://www.kaola.com/', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^text\/html/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected text/html but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
        // console.log(chunk);
    });
    res.on('end', () => {
        fs.writeFile(path.join(__dirname, 'src', 'html', 'index.html'), rawData, 'utf8', (err) => {
            if (err) throw err;
            console.log('下载 成功');
        });
        // const $ = cheerio.load(rawData);
        // const reg = /^(\/\/)|^http:\/\//; // 正则 用于统一协议
        // $('img').each(function(i, elm) {
        //     // console.log($(elm).attr('data-src'));

        //     if ($(elm).attr('src')) {
        //         let url = $(elm).attr('src').replace(reg, 'https://');

        //         let filename = url.split('/').pop();

        //         http.get(url, (res) => {
        //             let imgData = '';
        //             // 图片的传输方式 是二进制传输
        //             res.setEncoding('binary'); // 设置传输格式
        //             res.on('data', chunk => { imgData += chunk });
        //             res.on('end', () => {
        //                 fs.writeFile(path.join(__dirname, 'src', 'img', filename), imgData, 'binary', err => {
        //                     if (err) console.log(err);
        //                     console.log('文件下载成功');
        //                 });
        //             });
        //         });
        //     }

        // });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});