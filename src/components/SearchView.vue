<template>
    <div id="content" class="mx-10">
        <div id="search-bar" ref="search-bar" class="flex-x-center fit-content pt-6 pb-3">
            <input id="input-bar" class="input w-full flex-1 mr-3 focus:outline-green" type="text" v-model="search"
                placeholder="Search some contents..."
                @keyup.enter="resetPage(); searchContent(searchType, streamType, this.currPage);">

            <button class="btn bg-green text-white hover:bg-green"
                @click="resetPage(); searchContent(searchType, streamType, this.currPage);">
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
                        {{ item.name }}
                    </template>
                    <template v-slot:rear>

                        <label v-if="item.value.source">
                            {{ item.value.source.media_type }}
                        </label>

                        <text v-else id="text-unknown">
                            unknown
                        </text>
                        
                    </template>
                </SearchItem>
            </li>
        </div>

        <!-- pagination -->
        <div v-if="sourceData != ''">
            <p> {{ this.currPage }} </p>
            <p class="flex-x-center">
                <button class="btn bg-green hover:bg-green"
                    @click="resetPage(); searchContent(searchType, streamType, this.currPage);">First</button>
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
        async searchContent(searchType, streamType, pageNum) {

            let normalizedSearch = Normalizer.run(this.search, searchType)

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
                this.searchContent(this.searchType, this.streamType, this.currPage)
            }
        },
        nextPage() {
            this.currPage += 1
            this.searchContent(this.searchType, this.streamType, this.currPage)
        },
        resetPage() {
            this.currPage = 1
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

[data-theme="dark"] #input-bar {
    @apply bg-gray-white;
}

.avatar {
    float: left;
    object-fit: cover;
    cursor: pointer;
}

.list-md {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}

.input,
.btn {
    height: 2.5rem !important;
    min-height: auto !important;
}

#download-button {
    margin-right: 12px;
    margin-bottom: 12px;
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