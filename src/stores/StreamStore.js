import { defineStore } from 'pinia'
import EventService from "../services/EventService.js"

let streamModel = {
    url: '',
    desc: '',
    tags: ['']
}

export const useStreamStore = defineStore (
    'stream', 
    {
        state: () => ({
            stream : streamModel
        }),
        getters: {
            getStreamUrl: (state) => state.stream.url,
            getStreamDesc: (state) => state.stream.desc,
            getStreamTags: (state) => state.stream.tags 
        },
        actions: {
            async requestStream(url) {
                EventService.getStreamByUrl(url).then((response) => {
                    this.stream.url = response.streaming_url
                    this.stream.desc = response.metadata.description
                    this.stream.tags = Object.values(response.metadata.tags)
                })
            },
        }
        
    }
)
