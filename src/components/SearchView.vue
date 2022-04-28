<template>
    <div id="content" class="mx-10 pt-20">
        <div v-if="sourceData && sourceData.result">
            <li v-for="item in sourceData.result.items" :key="item">
                <SearchItem :thumbnail="item.value.thumbnail" 
                            :streamUrl="item.short_url"
                            :avatar="item.signing_channel">
                    <template v-slot:center>

                        <div v-if="item.value.title">
                        {{ item.value.title }}
                        </div>

                        <div v-else>
                        {{ item.name }}
                        </div>

                    </template>
                    <template v-slot:center-sub>

                        <div v-if="item.signing_channel
                                && item.signing_channel.value">
                        {{ item.signing_channel.value.title }}
                        </div>
                        <div v-else> Anonymous </div>

                    </template>
                    <template v-slot:rear>

                        <div v-if="item.value.tags" id="tag-group" class="flex-x row-start-6">
                            <div v-if="item.value.tags[0]" class="badge tag-spacing rounded-md"
                                @click="queryTag(item.value.tags[0])"> 
                                 {{ item.value.tags[0] }}
                            </div>

                            <div v-if="item.value.tags[1]" class="badge tag-spacing rounded-md"
                                @click="queryTag(item.value.tags[1])"> 
                                {{ item.value.tags[1] }} 
                            </div>

                            <div v-if="item.value.tags[2]" class="badge rounded-md"
                                @click="queryTag(item.value.tags[2])"> 
                                {{ item.value.tags[2] }} 
                            </div>

                        </div>
                        
                    </template>
                </SearchItem>
            </li>
        </div>

        <!-- pagination -->
        <div v-if="sourceData && sourceData.result">
            <p> {{ this.currPage }} </p>
            <p class="flex-x-center">
                <button class="btn bg-green hover:bg-green"
                    @click="resetPage(); searchContent(searchType, search, streamType, currPage);">First</button>
                <button class="btn bg-green hover:bg-green" @click="prevPage()">Prev</button>
                <button class="btn bg-green hover:bg-green" @click="nextPage()">Next</button>
            </p>
        </div>
  </div>
</template>

<script>
import EventService from "../services/EventService.js"
import Normalizer from '../utils/Normalizer.js'
import { useSearchStore } from "@/stores/SearchStore.js"

import SearchItem from '@/components/SearchItem.vue'

export default {
    components: {
        SearchItem
    },
    setup() {
        const search = useSearchStore()
        return { search }
    },
    data() {
        return {
            // search: "",
            sourceData: '',
            searchType: "tag",
            streamType: "video",
            currPage: 1,
        };
    },
    mounted() {
        this.search.$subscribe((mutation, state) => {
            
            // Make sure only request once
            if (mutation.storeId == 'search') {
                this.sourceData = state.search.sourceData
            }
        })
    },
    methods: {
        async searchContent(searchType, searchContent, streamType, pageNum) {

            window.scrollTo(0,0)
            let normalizedSearch = Normalizer.run(searchContent, searchType)
            document.activeElement.blur()

            EventService.getContent(searchType, streamType, normalizedSearch, pageNum).then((response) => {

                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    this.sourceData = response
                }
            })
        },
        setSearchContent() {
            this.search = 'Placeholder'
            document.activeElement.blur()
        },
        prevPage() {
            if (this.currPage > 1) {
                this.currPage -= 1
                this.searchContent(this.searchType, this.search, this.streamType, this.currPage)
            }
        },
        nextPage() {
            this.currPage += 1
            this.searchContent(this.searchType, this.search, this.streamType, this.currPage)
        },
        resetPage() {
            this.currPage = 1
        },
        queryTag(tag) {
            this.resetPage()
            this.searchContent('tag', tag, 'video', this.currPage)
            .then(() => {
                this.searchType = "tag"
                this.search = tag
                this.streamType = "video"
            })
        }
    },
};
</script>

<style>
li {
    list-style-type: none;
}

button {
    cursor: pointer;
}

.badge {
    @apply bg-white-sub;
    @apply text-black;
    @apply hover:bg-green;
    @apply border-0;
    cursor: pointer;
}

[data-theme="dark"] .badge {
    @apply bg-gray-white;
    @apply text-white;
    @apply hover:bg-green;
}

.avatar {
    float: left;
    object-fit: cover;
}

.tag-spacing {
    margin: 0 6.4px 0 0;
}

#search-history {
    margin: 0.5rem 0 0 0;
    width: 100%;
    text-align: start;
    @apply bg-gray-white;
    @apply rounded-md
}

#search-filter {
    margin-right: auto;
}

#stream-filter {
    margin-right: auto;
}

#search-result-item {
    align-content: center;
}

#text-unknown {
    padding-right: 10px;
}

@media (max-width: 960px) {
    #content {
        margin-right: 1rem;
        margin-left: 1rem;
    }
}
</style>