<template>
    <div class="flex-x">

        <div class="avatar">
            <div id="thumbnail" class="rounded">
                <img v-if="thumbnail" :src="thumbnail.url">
            </div>
        </div>

        <label id="streaming-url" @click="getStream(streamUrl)">
            <slot name="center"></slot>
        </label>

        <div id="search-result-rear">
            <slot name="rear"></slot>
        </div>

    </div>
    <div class="divider"></div>
</template>

<script>
import EventService from "../services/EventService.js"
export default {
    props: {
        thumbnail: Object,
        streamUrl: String
    },
    methods: {
         async getStream(url) {
            EventService.getStreamByUrl(url).then((response) => {

                //console.log(response)
                this.$router.push({ 
                    name: 'stream', 
                    query: { url: response.streaming_url },
                    params: { 
                        description: response.metadata.description,
                        tags : response.metadata.tags
                    } 
                })

            })
        },
    }
}
</script>

<style scoped>
#search-result-rear {
    align-content: center;
}

#streaming-url {
    cursor: pointer;
}

#thumbnail {
    width: 200px;
    height: 100px;
}
</style>