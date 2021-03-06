const reserve_dirPath = [/[^\/]+\/?$/, ""];
const reserve_dirName = [/[\s\S]+?([^/]+)\/$/,"$1"];
const reserve_host = [/^[\s\S]+\/\/([^\/]+)[\s\S]+$/,"$1"];
const reserve_name_from_nameWithExt = [/\.[^.]*$/,""];
const protocolSpliter = "://";

function normalize(path, stripTrailing) {
    if (typeof path !== 'string') {
        throw new TypeError('expected path to be a string');
    }

    if (path === '\\' || path === '/') return '/';

    var len = path.length;
    if (len <= 1) return path;

    // ensure that win32 namespaces has two leading slashes, so that the path is
    // handled properly by the win32 version of path.parse() after being normalized
    // https://msdn.microsoft.com/library/windows/desktop/aa365247(v=vs.85).aspx#namespaces
    var prefix = '';
    if (len > 4 && path[3] === '\\') {
        var ch = path[2];
        if ((ch === '?' || ch === '.') && path.slice(0, 2) === '\\\\') {
            path = path.slice(2);
            prefix = '//';
        }
    }

    var segs = path.split(/[/\\]+/);
    if (stripTrailing !== false && segs[segs.length - 1] === '') {
        segs.pop();
    }
    return prefix + segs.join('/');
};


/**
 * Pather类
 * @class Pather
 */
export default class Pather{
    /**
     * 连接并格式化path
     * @memberOf Pather
     * @static
     * @param path1
     * @param path2
     * @return {string|*}
     */
    static join(path1, path2){
        return normalize(path1 + path2)
    }

    /**
     * 构造Patcher
     * @constructor Pather
     * @param {string} path - 路径
     */
    constructor(path){
        const m = this;
        if (!path) {
            throw Error("path不能为空");
        }
        // m._path = normalize(path);
        m._path = path;
    }


    /**
     * 去除Query和hash部分
     * @return {string}
     * @private
     */
    get _pathWithoutQueryAndHash(){
        return this._path.split("?").shift();
    }


    /**
     * 目录路径
     * @type {string}
     * @public
     * @readonly
     */
    get dirPath(){
        return this._pathWithoutQueryAndHash.replace(...reserve_dirPath);
    }

    /**
     * 目录名
     * @type {string}
     * @public
     * @readonly
     */
    get dirName(){
        return this.dirPath.replace(...reserve_dirName);
    }

    /**
     * 文件名
     * @type {string}
     * @public
     * @readonly
     */
    get name(){
        return this._pathWithoutQueryAndHash.split("/").pop();
    }

    /**
     * 不包含后缀的文件名
     * @type {string}
     * @public
     * @readonly
     */
    get nameWithoutExt(){
        return this.name.replace(...reserve_name_from_nameWithExt);
    }

    /**
     * 后缀名
     * @type {string}
     * @public
     * @readonly
     */
    get ext(){
        return this.name.split(this.nameWithoutExt, "");
    }


    /**
     * 协议
     * @type {string}
     * @public
     * @readonly
     */
    get protocol(){
        if(this._path.indexOf(protocolSpliter) === -1){
            return "";
        }
        return this._path.split("://").shift();
    }

    /**
     * 主机名
     * @type {string}
     * @public
     * @readonly
     */
    get host(){
        if(this._path.indexOf(protocolSpliter) === -1){
            return "";
        }
        return this._path.replace(...reserve_host);
    }

    /**
     * hash
     * @type {string}
     * @public
     * @readonly
     */
    get hash(){
        if(this._path.indexOf("#") === -1){
            return "";
        }
        return this._path.split("#").pop();
    }

    /**
     * 查询字符串
     * @type {string}
     * @public
     * @readonly
     */
    get queryString(){
        if(this._path.indexOf("?") === -1){
            return "";
        }
        let query = this._path;
        query = query.split("?").pop();
        query = query.split("#").shift();
        return query;
    }

    /**
     * 查询字符串对象,如果查询字符串为空,该函数返回值为空
     * @type {string}
     * @public
     * @readonly
     */
    get queryObject(){
        const m = this;
        if(!m._queryObject){
            m._queryObject = {};
            if (m.queryString) {
                m.queryString.split("&").forEach(keyValue=>{
                    const [key, value] = keyValue.split("=");
                    m._queryObject[key] = value || ""
                });
            }else{
                m.queryString = "";
            }
        }
        return m._queryObject;
    }
}

Object.assign(Pather, {
    /**
     * @memberOf Pather
     * @member {Function} normalize 解析路径
     * @static
     */
    normalize,
})