define([], function() {
    return {
        get(key) {
            if (document.cookie) { // 判断是否有cookie
                let arr = document.cookie.split('; '); // 拆分所有cookie 
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i].split('='); // 将cookie数据拆分成 key value
                    // 通过key  查找value
                    if (item[0] === key) return item[1]; // 找到key  返回value
                }
                return ''; // 如果循环结束 都没有 则返回空字符串
            }
        },

        set(key, value, day) {
            if (typeof day === 'number') {
                let d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = `${key}=${value};expires=${d};path=/`;
            } else {
                document.cookie = `${key}=${value};path=/`;
            }
        },

        remove(key) {
            this.set(key, '', -1);
        }
    }
});