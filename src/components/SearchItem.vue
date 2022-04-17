<template>
    <div class="flex-x items-stretch">

        <div class="avatar">
            <div id="thumbnail" class="rounded">
                <img v-if="thumbnail" :src="thumbnail.url">
            </div>
        </div>

        <div id="streaming-url-wrapper" class="flex-1 grid">

            <label id="streaming-url" @click="getStream(streamUrl)">
                <slot name="center"></slot>
            </label>

            <div class="flex-x-start mt-2">

                <div v-if="showAvatar" id="channel-avatar-wrapper" class="avatar mr-2">
                    <div id="channel-avatar" class="rounded-full">
                        <img v-if="avatar 
                                && avatar.value 
                                && avatar.value.thumbnail" 
                            :src="avatar.value.thumbnail.url" loading="lazy">
                    </div>
                </div>
                <div v-else></div>

                <label id="channel-name">
                    <slot name="center-sub"></slot>
                </label>

            </div>

        </div>

        <div id="search-result-rear" class="grid grid-rows-6">
            <slot name="rear"></slot>
        </div>

    </div>
    <div class="divider h-0"></div>
</template>

<script>
import { useStreamStore } from "@/stores/StreamStore.js";
export default {
    props: {
        thumbnail: Object,
        streamUrl: String,
        avatar: Object,
        showAvatar: {
            default: true,
            type: Boolean
        },
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

<style>
#search-result-rear {
    align-content: center;
}

#streaming-url-wrapper {
    padding-left: calc(3rem/2);
    width: 300px;
    text-align: start;
    align-self: flex-start;
    font-size: 1rem;
    font-weight: 700;  
}

#streaming-url {
    cursor: pointer;

    /* Standard way to clamp */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

#channel-avatar {
    width: 2.1rem;
    height: 2.1rem;
}

#channel-name {
    font-size: 0.78rem;
    font-weight: 300;
}

#thumbnail {
    width: calc(12rem * 1.2);
    height: calc(12rem * 0.6);
}

/* md screen */
@media (max-width: 960px) {
    #search-result-rear {
        display: none;
    }
}

</style>