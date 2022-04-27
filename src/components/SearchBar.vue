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
    mounted() {
        this.search.init()
    },
    methods: {
        async performSearch(searchType, searchContent, streamType) {

            window.scrollTo(0,0)
            let normalizedSearch = Normalizer.run(searchContent, searchType)
            document.activeElement.blur()

            EventService.getContent(searchType, streamType, normalizedSearch).then((response) => {

                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    this.search.storeSourceData(response)
                }
            })
        },
        resetSearch() {
            this.search.init()
        },
    }
}
</script>

<style>
</style>