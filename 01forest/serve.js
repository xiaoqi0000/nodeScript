var AdmZip = require("adm-zip");
const fs = require("fs");

//森林之子的存档路径
let SonsPath = "C:\\Users\\孙学奇\\AppData\\LocalLow\\Endnight\\SonsOfTheForest\\Saves\\76561197960267366\\SinglePlayer\\0937744831\\SaveData.zip";

// reading archives（读取归档文件）
var zip = new AdmZip(SonsPath);
var password = "1234567890";
var zipEntries = zip.getEntries(); // an array of ZipEntry records - add password parameter if entries are password protected（这是一个 ZipEntry 记录的数组，如果条目受密码保护，则添加密码参数）
var myJson = {};

zipEntries.forEach(function (zipEntry) {
    //console.log(zipEntry.toString()); // outputs zip entries information（输出 ZIP 条目的信息）
    if (zipEntry.entryName === "PlayerInventorySaveData.json") {
        myJson = JSON.parse(zipEntry.getData().toString("utf8"));
    }
});


const jsonObject = JSON.parse(myJson.Data.PlayerInventory);
const itemInstanceManagerData = jsonObject.ItemInstanceManagerData.ItemBlocks;

itemInstanceManagerData.forEach(itemBlock => {
    if (itemBlock.ItemId === 362) {
        itemBlock.TotalCount = 1000;
    }
});

const updatedJsonString = JSON.stringify(jsonObject);
// console.log(updatedJsonString);
myJson.Data.PlayerInventory = updatedJsonString;

let myJsonString = JSON.stringify(myJson);
// console.log(myJsonString);

// 使用同一个 zip 对象添加文件并保存
zip.addFile("PlayerInventorySaveData.json", Buffer.from(myJsonString, "utf8"), "entry comment goes here");
zip.writeZip(SonsPath); // 覆盖原始压缩包或指定新的文件名保存