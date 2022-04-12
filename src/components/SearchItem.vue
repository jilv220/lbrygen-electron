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
import { useStreamStore } from "@/stores/StreamStore.js";
export default {
    props: {
        thumbnail: Object,
        streamUrl: String
    },
    setup() {
        const stream = useStreamStore()
        return { getStreamUrl: stream.getStreamUrl, requestStream : stream.requestStream}
    },
    methods: {
         async getStream(url) {

            this.requestStream(url).then (() => {

                this.$router.push({ 
                    name: 'stream', 
                    query: { url:  this.getStreamUrl}
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