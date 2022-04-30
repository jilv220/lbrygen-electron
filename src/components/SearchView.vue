<template>
    <div id="content" class="mx-10 pt-20 overflow-hidden">
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
            <p class="font-heavy"> {{ this.currPage }} </p>
            <div class="btn-group flex-x-center my-4">
                <button class="btn" @click="firstPage()">First</button>
                <button class="btn" @click="prevPage()">Prev</button>
                <button class="btn" @click="nextPage()">Next</button>
            </div>
        </div>
  </div>
</template>

<script>
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
    props: {
        searchContent: String,
        queryType: String,
        streamType: String,
        currPage: String
    },
    data() {
        return {
            sourceData: '',
        };
    },
    mounted() {
        this.sourceData = this.search.getSourceData
        this.search.$subscribe((mutation, state) => {
            
            // Make sure only request once
            if (mutation.storeId == 'search') {
                this.sourceData = state.search.sourceData
            }
        })
    },
    methods: {
        navigateToSearch() {
            this.$router.push({ 
                name: 'search',
                query: { 
                    q:  this.searchContent,
                    qt: this.search.getSearchType,
                    st: this.search.getStreamType,
                    p: this.search.getCurrPage
                }
            })
        },
        firstPage() {
            this.search.resetPage()
            this.navigateToSearch()
        },
        prevPage() {
            this.search.prevPage()
            this.navigateToSearch()
        },
        nextPage() {
            this.search.nextPage()
            this.navigateToSearch()
        },
        queryTag(searchContent) {
            this.$router.push({ 
                name: 'search',
                query: { 
                    q:  searchContent,
                    qt: 'tag',
                    st: 'video',
                    p: '1'
                }
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

.btn-group .btn {
  @apply bg-green !important;
  @apply hover:bg-green-800 !important;
  @apply text-white;
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