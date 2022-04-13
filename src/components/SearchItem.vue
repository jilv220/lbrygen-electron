<template>
    <div class="flex-x">

        <div class="avatar">
            <div id="thumbnail" class="rounded">
                <img v-if="thumbnail" :src="thumbnail.url">
            </div>
        </div>

        <div id="streaming-url-wrapper" class="flex-1">
            <label id="streaming-url" @click="getStream(streamUrl)">
                <slot name="center"></slot>
            </label>
        </div>

        <div id="search-result-rear" class="grid grid-rows-6">
            <slot name="rear"></slot>
        </div>

    </div>
    <div class="divider h-0 pb-4"></div>
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
        return { stream }
    },
    methods: {
         async getStream(url) {
            window.scrollTo(0,0)
            this.stream.requestStream(url).then (() => {

                this.$router.push({ 
                    name: 'stream', 
                    query: { url:  url}
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

#streaming-url-wrapper {
    padding: 0 0 0 100px;
    width: 300px;
    text-align: start;
}

#thumbnail {
    width: 200px;
    height: 100px;
}
</style>