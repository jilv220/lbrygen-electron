import { defineStore } from 'pinia'

let searchModel = {
    searchType: String,
    searchContent: String,
    streamType: String,
    currPage: Number,
    sourceData: Object
}

export const useSearchStore = defineStore (
    'search', 
    {
        state: () => ({
            search: searchModel
        }),
        getters: {
            getSearchType: (state) => state.search.searchType,
            getSearchContent: (state) => state.search.searchContent,
            getStreamType: (state) => state.search.streamType,
            getCurrPage: (state) => state.search.currPage,
            getSourceData: (state) => state.search.sourceData
        },
        actions: {
            init() {
                this.search.searchType = 'tag'
                this.search.searchContent = ''
                this.search.streamType = 'video'
                this.search.currPage = 1
            },
            initFilter() {
                this.search.searchType = 'tag'
                this.search.streamType = 'video'
            },
            resetPage() {
                this.search.currPage = 1   
            },
            storeAll(searchType, searchContent, streamType, currPage) {
                this.search.searchType = searchType
                this.search.searchContent = searchContent
                this.search.streamType = streamType
                this.search.currPage = currPage
            },
            storeSearchContent(searchContent) {
                this.search.searchContent = searchContent
            },
            storeCurrPage(currPage) {
              this.search.currPage = currPage  
            },
            storeFilterInfo(searchType, streamType) {
                this.search.searchType = searchType
                this.search.streamType = streamType
            },
            storeSourceData(sourceData) {
                this.search.sourceData = sourceData
            }
        }
        
    }
)