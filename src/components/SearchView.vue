<template>
    <div id="content" class="mx-10">
        <div id="search-bar" ref="search-bar" class="flex-x-center fit-content pt-6 pb-3">
            <input id="input-bar" class="input w-full flex-1 mr-3 focus:outline-green" type="text" v-model="search"
                placeholder="Search some contents..."
                @keyup.enter="resetPage(); searchContent(searchType, search, streamType, currPage);">

            <button class="btn bg-green text-white hover:bg-green"
                @click="resetPage(); searchContent(searchType, search, streamType, currPage);">
                Search
            </button>
        </div>

        <div id="filter-area" class="pb-6 flex-x-center">

            <form id="stream-filter" autocomplete="off">
                <label class="pl-02 pr-06">Filter by : </label>

                <input type="radio" id="video" value="video" v-model="streamType">
                <label class="pl-02 pr-06" for="video">Video</label>

                <input type="radio" id="image" value="image" v-model="streamType">
                <label class="pl-02 pr-06" for="image">Image</label>

                <input type="radio" id="document" value="document" v-model="streamType">
                <label class="pl-02" for="document">Document</label>
            </form>

            <form id="search-filter" autocomplete="off">
                <label class="pl-02 pr-06">Search by : </label>

                <input type="radio" id="tag" value="tag" v-model="searchType">
                <label class="pl-02 pr-06" for="tag">Tag</label>

                <input type="radio" id="text" value="text" v-model="searchType">
                <label class="pl-02 pr-06" for="text">Text</label>

                <input type="radio" id="channel" value="channel" v-model="searchType">
                <label class="pl-02" for="channel">Channel</label>
            </form>

        </div>

        <div v-if="sourceData != ''">
            <li v-for="item in sourceData.result.items" :key="item">
                <SearchItem :thumbnail="item.value.thumbnail" 
                            :streamUrl="item.short_url">
                    <template v-slot:center>

                        <div v-if="item.value.title">
                        {{ item.value.title }}
                        </div>

                        <div v-else>
                        {{ item.name }}
                        </div>

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
        <div v-if="sourceData != ''">
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
import SearchItem from '@/components/SearchItem.vue'

export default {
    components: {
        SearchItem
    },
    data() {
        return {
            search: "",
            sourceData: "",
            searchType: "tag",
            streamType: "video",
            currPage: 1,
        };
    },
    mounted() {

    },
    methods: {
        async searchContent(searchType, searchContent, streamType, pageNum) {

            let normalizedSearch = Normalizer.run(searchContent, searchType)

            EventService.getContent(searchType, streamType, normalizedSearch, pageNum).then((response) => {

                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    this.sourceData = response
                }
            })
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
                this.search = tag
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

#input-bar {
    @apply bg-white;
    @apply input-bordered;
    @apply border-black
}

.badge {
    @apply bg-white-sub;
    @apply text-black;
    @apply hover:bg-green;
    @apply border-0;
    cursor: pointer;
}

[data-theme="dark"] #input-bar {
    @apply bg-gray-white;
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

.input,
.btn {
    height: 2.5rem !important;
    min-height: auto !important;
}

.tag-spacing {
    margin: 0 6.4px 0 0;
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

@media (max-width: 900px) {
    #content {
        margin-right: 4rem;
        margin-left: 4rem;
    }
}
</style>