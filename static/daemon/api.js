const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
const port = 5000;

const base = 'http://localhost'
const lbryPort = 5279
const lbryUrl = `${base}:${lbryPort}`
const pageSize = 20

function apiCall(params) {

    return new Promise ((resolve, reject) => {
        axios
        .post(lbryUrl, params)
        .then(res => {
            //console.log(res.data)
            resolve(res.data)
        })
        .catch(error => {
            //console.error(error)
            reject(error)
        })
    })
}

// Api route
app.get('/api/status', (req, res) => {

    req.setTimeout(200);

    let params = { method : 'status' }

    apiCall(params)
    .then((daemonRes) => {
        //console.log(daemonRes)
        res.send(daemonRes)
    })
    .catch((error) => {})

})

app.get('/api/search', (req, res) => {

    let tag = req.query.t 
    let text = req.query.q
    let pageNum = req.query.p
    let streamType = req.query.st
    let channel = req.query.c

    let params = { method : 'claim_search',
                   params : { any_tags : [ tag === undefined ? undefined : tag], 
                              text : text === undefined ? undefined : text,
                              page : pageNum === undefined ? 1 : Number(pageNum),
                              page_size : pageSize,
                              stream_type : [ streamType == undefined ? 'video' : streamType ],
                              order_by : 'release_time',
                              no_totals : true }}

    if ( channel !== undefined ) {
        params["params"]["channel"] = channel
    }

    apiCall(params)
    .then((daemonRes) => {
        res.send(daemonRes)
    })
})

app.get('/api/getStream', (req, res) => {

    let uri = req.query.url
    let download = req.query.d

    let isDownload = false
    if (download === 'y') {
        isDownload = True
    }

    let params = { method : 'get',
                   params : { uri : uri === undefined ? undefined : uri,
                              save_file : isDownload,
                              timeout : 10 }}

    if (isDownload) {
        params["params"]["file_name"] = uri.replace('lbry://', '') 
    }

    apiCall(params)
    .then((daemonRes) => {
        //console.log(daemonRes)
        res.send(daemonRes.result.streaming_url)
    })
})

// Api entry
app.listen(port);
console.log('API server started on: ' + port)