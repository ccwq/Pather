import Pather from "../src/Pather";

describe("测试Patcher.js",  function () {
    describe("测试带协议路径", function(){
        const pather = new Pather("https://juejin.im/entry/5a9f9d6af265da23a0491a2a.json?who=administrator&name=dave#anchor");
        it("测试属性:dirPath", function() {
            if (pather.dirPath !== "https://juejin.im/entry/") {
                throw new Error("dirPath和预期结果不符合")
            }
        });

        it("测试属性:dirName", function() {
            if (pather.dirName !== "entry") {
                throw new Error("dirName和预期结果不符合")
            }
        });
        it("测试属性:name", function() {
            if (pather.name !== "5a9f9d6af265da23a0491a2a.json") {
                throw new Error("name和预期结果不符合")
            }
        });
        it("测试属性:nameWithoutExt", function() {
            if (pather.nameWithoutExt !== "5a9f9d6af265da23a0491a2a") {
                throw new Error("nameWithoutExt和预期结果不符合")
            }
        });
        it("测试属性:protocol", function() {
            if (pather.protocol !== "https") {
                throw new Error("protocol和预期结果不符合")
            }
        });
        it("测试属性:host", function() {
            if (pather.host !== "juejin.im") {
                throw new Error("host和预期结果不符合")
            }
        });
        it("测试属性:hash", function() {
            if (pather.hash !== "anchor") {
                throw new Error("hash和预期结果不符合")
            }
        });
        it("测试属性:queryString", function() {
            if (pather.queryString !== "who=administrator&name=dave") {
                throw new Error("queryString和预期结果不符合")
            }
        });
        it("测试属性:queryObject", function() {
            const queryObject = pather.queryObject;
            if(queryObject.who  !== "administrator" || queryObject.name !== "dave"){
                throw new Error("queryObject和预期不符");
            }
        });
    });

    describe("测试不带协议路径", function(){
        const pather = new Pather("/home/foo/pathto/super.png.zip");
        it("测试属性:dirPath", function() {
            if (pather.dirPath !== "/home/foo/pathto/") {
                throw new Error("dirPath和预期结果不符合")
            }
        });

        it("测试属性:dirName", function() {
            if (pather.dirName !== "pathto") {
                throw new Error("dirName和预期结果不符合")
            }
        });
        it("测试属性:name", function() {
            if (pather.name !== "super.png.zip") {
                throw new Error("name和预期结果不符合")
            }
        });
        it("测试属性:nameWithoutExt", function() {
            if (pather.nameWithoutExt !== "super.png") {
                throw new Error("nameWithoutExt和预期结果不符合")
            }
        });
        it("测试属性:protocol", function() {
            if (pather.protocol !== "") {
                throw new Error("protocol和预期结果不符合")
            }
        });
        it("测试属性:host", function() {
            if (pather.host !== "") {
                throw new Error("host和预期结果不符合")
            }
        });
        it("测试属性:hash", function() {
            if (pather.hash !== "") {
                throw new Error("hash和预期结果不符合")
            }
        });
        it("测试属性:queryString", function() {
            if (pather.queryString !== "") {
                throw new Error("queryString和预期结果不符合")
            }
        });
        it("测试属性:queryObject", function() {
            if(pather.queryObject){
                throw new Error("queryObject和预期不符");
            }
        });
    })

})