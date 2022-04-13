<template>
    <div>
        <div id="content-wrapper" class="">

            <div class="grid grid-cols-3 gap-8 mt-4 px-4">

                <div id="container" class="grid grid-rows-9 col-span-2">

                    <iframe allowfullscreen webkitallowfullscreen :src="stream.getStreamUrl" frameborder="0">
                    </iframe>

                    <div>
                        {{ stream.getStreamDesc }}
                    </div>

                </div>

                <div v-if="sourceData!=''" id="related-videos"  class="card flex-1">
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
            sourceData: "",
        }
    },
    mounted() {

        this.stream.$subscribe((mutation, state) => {

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
iframe {
    width: 100%;
    height: 100%;
    padding: 0 0 0.75rem 0;
}

#container {
    height: 72rem;
}

#content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>