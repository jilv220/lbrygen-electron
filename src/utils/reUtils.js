exports.isHyperlink = (url) => {
    /* eslint-disable no-useless-escape */
    let re = /(?![^<]*>|[^<>]*<\/)((http|https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi
    let val = re.exec(url);
    let res = val ? true : false

    return res
}