function formatDate(objDate, fmt) {
    const o = {
        'M+': objDate.getMonth() + 1, // 月份
        'd+': objDate.getDate(), // 日
        'h+': objDate.getHours() % 12 === 0 ? 12 : objDate.getHours() % 12, // 小时
        'H+': objDate.getHours(), // 小时
        'm+': objDate.getMinutes(), // 分
        's+': objDate.getSeconds(), // 秒
        'q+': Math.floor((objDate.getMonth() + 3) / 3), // 季度
        S: objDate.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${objDate.getFullYear()}`.substr(4 - RegExp.$1.length));
    // eslint-disable-next-line no-restricted-syntax
    for (const k in o)
        if (new RegExp(`(${k})`).test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    return fmt;
}

export default formatDate;
