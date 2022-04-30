import { defineStore } from 'pinia'

let searchModel = {
    searchType: String,
    searchContent: String,
    streamType: String,
    currPage: '1',
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
                this.search.currPage = '1' 
            },
            nextPage() {
                let newPage = Number(this.search.currPage) + 1 
                this.search.currPage = newPage.toString()
            },
            prevPage() {
                if (Number(this.search.currPage) > 1) {
                    let newPage = Number(this.search.currPage) - 1 
                    this.search.currPage = newPage.toString()
                }
            },
            storeAll(searchType, streamType, currPage) {
                this.search.searchType = searchType
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