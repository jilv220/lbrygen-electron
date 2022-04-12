import axios from "axios"
var qs = require('qs');

const base_api = 'http://localhost:5000/api'
export default {

  async getStreamByUrl(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`);
    return res.data;
  },

  async downloadFromStream(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`, { params: { d: "y" } });
    return res.data;
  },

  async getContent(type, streamType, content, pageNum = 1, pageSize = 20) {

    let queryType = ''

    //console.log(content)

    let params = { 
      p: pageNum, 
      ps: pageSize, 
      st: streamType,
    }

    if (Array.isArray(content)) {
      params['t'] = content
    } else {

      switch (type) {
        case "tag":
          queryType = 't'
          break
        case "text":
          queryType = 'q'
          break
        case "channel":
          queryType = 'c'
          break
      }
      params[queryType] = content
    }

    // Insert some kind of trending algorithm

    let res = 
    await axios.get( `${base_api}/search`,
    { 
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
    })

    return res.data 
  },

  async getDaemonStatus() {
    let res = await axios.get(`${base_api}/status`)
    return res.data 
  }
  
}