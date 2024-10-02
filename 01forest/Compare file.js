const fs = require('fs');

const file1 = fs.readFileSync('./a.json', 'utf8');
const file2 = fs.readFileSync('./PlayerInventorySaveData - 副本.json', 'utf8');

if (file1 === file2) {
    console.log('文件内容相同');
} else {
    console.log('文件内容不同');

    //显示哪里不同，详细到每一个字符，显示他之后的几个字符
    for (let i = 0; i < file1.length; i++) {
        if (file1[i] !== file2[i]) {
            console.log('文件1第' + i + '个字符不同，文件1的字符为' + file1[i] + '，文件2的字符为' + file2[i]);
        }
    }


}