<template>
  <v-layout row wrap>
    <!--<v-flex v-if="!mini_cards"
      v-for="(card, index) in cards"
      :class="calculateClass(index)"
      :key="card.title"
    >
      <v-card>
        <div v-if="card.flash" v-ripple style="height:200px;" @click="click_game(card)" class="card__media flash ">
          <div class="card__media__background" :style="'transform: scale(1.1); background:url(' + card.background_src + ') center center / cover no-repeat;'" v-blur="blurConfig">
          </div>
          <img :src="card.src" style="z-index: 0; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; width: auto; height:90%"/>
        </div>
        <div v-else v-ripple style="height:200px;" @click="click_game(card)" class="card__media ">
          <div class="card__media__background" :style="'transform: scale(1.1); background:url(' + card.background_src + ') center center / cover no-repeat;'" v-blur="blurConfig">
          </div>
          <img :src="card.src" style="z-index: 0; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; width: auto; height:90%"/>
        </div>
        <v-card-actions>
          <span  style="color: #696969">{{index}}27 Online</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="add_bookmark(card)">
            <v-icon v-if="(bookmarks) && (bookmarks.indexOf(card._id) > -1)" color="yellow" >bookmark</v-icon>
            <v-icon v-else color="grey" >bookmark</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>-->
    <template v-if="mini_cards">
      <v-flex row wrap v-for="(card, index) in cards" xs4 sm3>
        <v-card class="ma-1" style="width: 100%"  >
          <v-card-media style="width: 100%; " @click="click_game(card)"
        ><img style="width: 100%; height: 100%"
            :src="card.src"
          >
        </img>
        </v-card-media>
          <v-card-actions v-ripple @click="add_bookmark(card)">
            <v-icon color="yellow" v-if="(bookmarks) && (bookmarks.indexOf(card._id) > -1)" style="margin:0 auto;">bookmark</v-icon>
            <v-icon v-else style="margin:0 auto;">bookmark</v-icon>
          </v-card-actions>
        </v-card>
      </v-flex>
    </template>
    <template v-else>
      <v-flex
        v-for="(card, index) in cards"
        :class="calculateClass(index)"
        :key="card.title"
      >
        <v-card>
          <div v-if="card.flash" v-ripple style="height:200px;" @click="click_game(card)" class="card__media flash ">
            <div class="card__media__background" :style="'transform: scale(1.1); background:url(' + card.background_src + ') center center / cover no-repeat;'" v-blur="blurConfig">
            </div>
            <img :src="card.src" style="z-index: 0; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; width: auto; height:90%"/>
          </div>
          <div v-else v-ripple style="height:200px;" @click="click_game(card)" class="card__media ">
            <div class="card__media__background" :style="'transform: scale(1.1); background:url(' + card.background_src + ') center center / cover no-repeat;'" v-blur="blurConfig">
            </div>
            <img :src="card.src" style="z-index: 0; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; width: auto; height:90%"/>
          </div>
          <v-card-actions>
            <span  style="color: #696969">{{index}}27 Online</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="add_bookmark(card)">
              <v-icon v-if="(bookmarks) && (bookmarks.indexOf(card._id) > -1)" color="yellow" >bookmark</v-icon>
              <v-icon v-else color="grey" >bookmark</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'
// search icons: https://material.io/icons/ asd
export default {
  props: ["add_bookmark", "mini_cards", "bookmarks", 'method', 'sidebar', 'cards'],
  /*async mounted() {
    console.log("searching for games")
    let gameRes = await axios.get(`/games/`)
    if (!gameRes) error({ statusCode: 404, message: 'Game not found' })
    this.cards = gameRes.data

  },*/
  data () {
    return {
      blurConfig: {
        isBlurred: true, // activate and deactivate blur directive example 2
        opacity: 1,
        filter: 'blur(5px)',
        transition: 'all .3s linear'
      }
    }
  },
  methods: {
    click_game: function(card) {
      this.method(card)
    },
    calculateClass: function(index) {
      if(this.sidebar) {
        var new_index  = index % 3
        if (new_index <= 1) {
          return 'xs6'
        } else {
          return 'xs12'
        }
      } else {
        if (index == 0) {
          return 'xs12 sm6 md7'
        } else if (index == 1) {
          return 'xs12 sm6 md5'
        } else if (index <= 4) {
          return 'xs12 sm6 md4'
        } else if (index == 5) {
          return 'xs12 sm6 md5'
        }  else if (index == 6) {
          return 'xs12 md6 md7'
        }else if (index == 7) {
          return 'xs12'
        //}
        }else if (index == 8) {
          return 'xs6'
        }else if (index == 9) {
          return 'xs6'
        }
      }
    }
  }
}
</script>
