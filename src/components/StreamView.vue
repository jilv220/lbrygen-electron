<template>
    <div>
        <div id="content-wrapper" class="">

            <div class="grid grid-cols-3 gap-8 mt-4 px-4">

                <div id="container" class="grid grid-rows-9 col-span-2 h-96">

                    <iframe allowfullscreen webkitallowfullscreen :src="this.streamUrl" frameborder="0">
                    </iframe>

                    <div>
                        {{ this.$route.params.description }}
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
import SearchItem from '@/components/SearchItem.vue'
export default {
    props: {
        streamUrl: String,
    },
    components: {
        SearchItem
    },
    data() {
        return {
            sourceData: "",
            tags: [""]
        }
    },
    mounted() {
        // console.log(this.streamUrl)
        // console.log (this.$route.params)

        this.tags = Object.values(this.$route.params.tags)
        this.searchContent('tag','video', 1, 20)
    },
    methods: {
        async searchContent(searchType, streamType, pageNum, pageSize) {

            EventService.getContent(searchType, streamType, this.tags, pageNum, pageSize).then((response) => {

                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    this.sourceData = response
                }
            })
        },
    }
}
</script>

<style>
iframe {
    width: 100%;
    height: 100%;
    padding: 0 0 0.75rem 0;
}

#content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>