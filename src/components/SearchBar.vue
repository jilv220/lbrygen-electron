<template>
    <div class="dropdown flex-1 mr-3">
        <input
            tabindex="0"
            id="input-bar"
            class="input w-full focus:outline-green"
            type="text"
            v-model="searchContent"
            placeholder="Search some contents..."
            autocomplete="off"
            @keyup.enter="resetSearch(); performSearch(search.getSearchType, searchContent, search.getStreamType);"
        />
    </div>
</template>

<script>
import EventService from "../services/EventService.js"
import { useSearchStore } from "@/stores/SearchStore.js"
import Normalizer from '../utils/Normalizer.js'

export default {
    setup() {
        const search = useSearchStore()
        return { search }
    },
    data() {
        return {
            searchContent: '',
        }
    },
    watch:{
        $route(to, from) {
            // clear searchbar when leave searchView
            if (from.name == 'search') {
                this.searchContent = ''
            }
            if (to.name == 'search') {
                this.searchContent = this.$route.query.q
                this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
                this.performSearch(this.search.getSearchType, this.searchContent, this.search.getStreamType)
            }
        }
    },
    mounted() {
        if(this.$route.query.q) {
            this.searchContent = this.$route.query.q
            this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
            this.performSearch(this.search.getSearchType, this.searchContent, this.search.getStreamType)
        }
    },
    methods: {
        async performSearch(searchType, searchContent, streamType) {
            
            let normalizedSearch = Normalizer.run(searchContent, searchType)

            EventService.getContent(searchType, streamType, normalizedSearch).then((response) => {

                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    this.search.storeSourceData(response)
                }
            }).then(() => {
                this.$router.push({ 
                    name: 'search',
                    query: { 
                        q:  searchContent,
                        qt: searchType,
                        st: streamType
                    }
                })
            })
        },
        resetSearch() {
            this.search.resetPage()
        },
    }
}
</script>

<style>
.input {
    height: 2.5rem !important;
    min-height: auto !important;
}

#input-bar {
    @apply bg-white;
    @apply input-bordered;
    @apply border-black
}

[data-theme="dark"] #input-bar {
    @apply bg-gray-white;
}

</style>