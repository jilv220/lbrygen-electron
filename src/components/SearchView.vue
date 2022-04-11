<template>
  <div id="content" class="mx-10" >
    <div id="search-bar" class="pb-04 flex-x fit-content">
        <ion-toolbar class="mr-06 fit-content">
        <ion-input
            type="text" 
            v-model="search" 
            placeholder="Search some contents..." 
            @keyup.enter="resetPage(); searchContent(searchType, streamType, this.currPage);"
        >
        </ion-input>
        </ion-toolbar>

        <button class="btn bg-green text-white hover:bg-green" 
                @click="resetPage(); searchContent(searchType, streamType, this.currPage);">
                Search
        </button>
    </div>

    <div id="filter-area" class="pt-04 pb-06 flex-x ion-justify-content-center">

        <form id="stream-filter" autocomplete="off">
            <ion-label class="pl-02 pr-06">Filter by : </ion-label>

            <input type="radio" id="video" value="video" v-model="streamType">
            <label class="pl-02 pr-06" for="video">Video</label>

            <input type="radio" id="image" value="image" v-model="streamType">
            <label class="pl-02 pr-06" for="image">Image</label>

            <input type="radio" id="document" value="document" v-model="streamType">
            <label class="pl-02" for="document">Document</label>
        </form>

        <form id="search-filter" autocomplete="off">
            <ion-label class="pl-02 pr-06">Search by : </ion-label>

            <input type="radio" id="tag" value="tag" v-model="searchType">
            <label class="pl-02 pr-06" for="tag">Tag</label>

            <input type="radio" id="text" value="text" v-model="searchType">
            <label class="pl-02 pr-06" for="text">Text</label>

            <input type="radio" id="channel" value="channel" v-model="searchType">
            <label class="pl-02" for="channel">Channel</label>
        </form>

    </div>

    <div v-if="sourceData!=''">
        <ion-list v-for="item in sourceData.result.items" :key="item" lines="none">
            <ion-item id="search-result-item">

                <ion-thumbnail slot="start" @click="getStream(item.short_url)">
                    <ion-img v-if="item.value.thumbnail" :src="item.value.thumbnail.url"></ion-img>
                </ion-thumbnail>

                <ion-label id="streaming-url" @click="getStream(item.short_url)">
                    {{item.short_url.replace('lbry://','')}}
                </ion-label>

                <div id="search-result-rear">
                    <ion-label
                        v-if="item.value.source"
                        class="ion-text-right"
                    >   
                        {{item.value.source.media_type}}

                    </ion-label>
                    
                    <text v-else id="text-unknown"> 
                        unknown 
                    </text>
                </div>
                
            </ion-item>
            <hr>
        </ion-list>
    </div>

    <!-- pagination -->
    <div v-if="sourceData!=''">
        <p> {{ this.currPage }} </p>
        <p class="flex-x-center"> 
            <button class="btn bg-green hover:bg-green" @click="resetPage(); searchContent(searchType, streamType, this.currPage);">First</button>
            <button class="btn bg-green hover:bg-green" @click="prevPage()">Prev</button>
            <button class="btn bg-green hover:bg-green" @click="nextPage()">Next</button>
        </p>
    </div>

  </div>
</template>

<script>
import EventService from "../services/EventService.js"
import Normalizer from '../utils/Normalizer.js'
import { 
  IonImg,
  IonItem, 
  IonList,
  IonInput,
  IonLabel,
  IonToolbar,
  IonThumbnail
} from '@ionic/vue';

export default {
  components: {
      IonImg,
      IonItem, 
      IonList,
      IonInput,
      IonLabel,
      IonToolbar,
      IonThumbnail
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
    async getStream(url) {
        EventService.getStreamByUrl(url).then((response) => {
        
        this.$router.push({ path: '/stream', query: { st: response } })

      })
    },
    async download(url) {
        EventService.downloadFromStream(url).then(() => {
            
        let filename = url.replace('lbry://','')
        alert(`File ${filename} saved to Downloads folder !`)

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

hr {
    height: auto !important;
    border-width: thin !important;
}

button {
    cursor: pointer;
}

ion-toolbar {
    border: 1px solid black;
    border-radius: 4px;
    --min-height: 0px;
}

ion-thumbnail {
    float: left;
    width: 200px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
}

ion-input {
    text-align: start;
    border: transparent;
}

.list-md {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}

#download-button {
    margin-right: 12px;
    margin-bottom: 12px;
}

#streaming-url {
    cursor: pointer;
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

#search-result-rear {
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