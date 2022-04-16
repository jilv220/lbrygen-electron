<template>
    <div>
        <div id="content-wrapper" class="">

            <div v-if="sourceData!=''" id="layout" class="grid grid-cols-3 gap-8 mt-4 px-4">

                <div id="container" class="grid grid-rows-9 col-span-2">
                    <iframe width="1280" height="630"
                    allowfullscreen webkitallowfullscreen :src="stream.getStreamUrl" frameborder="0">
                    </iframe>

                    <div id="stream-info" class="mt-6">

                        <h1 id="stream-title">
                            {{ title }}
                        </h1>

                        <div id="stream-info-divider" class="divider h-0"></div>

                        <div id="stream-desc">
                            <li v-for="(line, index) in descList" :key="index">
                                <p> {{ line }} </p>
                            </li>
                        </div>

                    </div>
                </div>

                <div id="related-videos"  class="card flex-1">
                    <li v-for="item in sourceData.result.items" :key="item">
                        <SearchItem 
                            :thumbnail="item.value.thumbnail" 
                            :streamUrl="item.short_url">
                            <template v-slot:center>
                                {{ item.name }}
                            </template>
                        </SearchItem>
                    </li>
                </div>

            </div>

            <div v-else id="stream-loading"  class="flex-y-center">
                <div class="fancy-spinner">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="dot"></div>
                </div>  
            </div>

        </div>

    </div>
</template>

<script>
import EventService from "../services/EventService.js"
import { useStreamStore } from "@/stores/StreamStore.js"
import SearchItem from '@/components/SearchItem.vue'

export default {
    props: {
        streamUrl: String,
    },
    components: {
        SearchItem
    },
    setup() {
        const stream = useStreamStore()
        return { stream }
    },
    data() {
        return {
            sourceData: '',
            title: '',
            descList: ['']
        }
    },
    mounted() {

        // Only load to template when mutation happens
        this.stream.$subscribe((mutation, state) => {

            this.title = this.stream.getStreamTitle
            this.descList = this.stream.getStreamDesc.split('\n')

            // Make sure only request once
            if (mutation.storeId == 'stream' && this.sourceData == '') {

                EventService.getContent('tag', 'video', state.stream.tags).then((response) => {

                    //console.log(response)
                    if (response.error !== undefined) {
                        console.error(response)
                    } else {
                        this.sourceData = response
                    }
                })
            }
        })
    }
}
</script>

<style>
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
}

iframe {
    top: 0;
    left: 0;
    width: 100%;
}

#container {
    position: relative;
    padding-bottom: 200%;
    overflow: hidden;
}

/* md screen */
@media (max-width: 1200px) {

    #layout {
        display: unset;
    }

    #container {
        padding-bottom: 1rem;
    }

    #stream-info {
        @apply px-4;
    }
}

#content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 4rem;
}

#stream-loading {
    padding-top: 17.5%;
}

#stream-loading .fancy-spinner div.ring {
    border-width: 2rem;
    width: 20rem;
    height: 20rem;
    box-shadow: none;
}

#stream-info {
    text-align: start;
}

#stream-info-divider {
    @apply my-3
}

#stream-title {
    display: block;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 700;
}

#stream-desc {
    max-width: 50em;
}
</style>