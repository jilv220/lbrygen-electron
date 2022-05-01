import axios from "axios"
import { IS_DEV, API_PROD } from '@/constants/env'
var qs = require('qs');

let base_api

if (IS_DEV) {
  base_api = `http://localhost:5000/api`
} else {
  base_api = API_PROD
}

export default {

  async getStreamByUrl(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`);
    return res.data;
  },

  async downloadFromStream(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`, { params: { d: 'y' } });
    return res.data;
  },

  async getContent(type, streamType, content, 
                        pageNum = 1, pageSize = 18, order = 'release_time') {

    let queryType = ''

    //console.log(content)

    let params = { 
      p: pageNum, 
      ps: pageSize, 
      st: streamType,
      o: order
    }

    if (Array.isArray(content)) {

      if (content.length > 5) {
        params['t'] = content.slice(0,6)
      } else {
        params['t'] = content
      }

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

  async resolveClaimSingle(curl) {
    let res = await axios.get(`${base_api}/resolveSingle?urls=${curl}`);
    return res.data;
  },

  async getDaemonStatus() {
    let res = await axios.get(`${base_api}/status`)
    return res.data 
  }
  
}