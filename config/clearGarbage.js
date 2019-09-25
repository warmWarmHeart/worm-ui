// 清除因为提取css 而导致的垃圾文件
const fs = require('fs');
const path = require('path');
const clearPath = path.resolve('garbage');

function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
}

deleteFolder(clearPath);
