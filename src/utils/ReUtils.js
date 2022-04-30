exports.linkify = (str) => {
    /* eslint-disable no-useless-escape */
    let re = /(?![^<]*>|[^<>]*<\/)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi
    let res = str.replace(re, '<a href="$1" target="_blank">$1</a>')

    return res
}