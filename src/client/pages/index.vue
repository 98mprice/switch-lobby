<template>
  <v-layout row wrap>
    <v-flex xs5 >
        <v-container fluid grid-list-md style="margin-top: 90px">
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card>
                <div v-ripple class="card__media" style="height:200px;">
                  <div class="card__media__background" :style="'transform: scale(1.1); background:url(' + card.background_src + ') center center / cover no-repeat;'" v-blur="blurConfig">
                  </div>
                  <img :src="card.src" style="z-index: 0; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; width: auto; height:90%"/>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon >
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
    <v-flex  xs7  style="position:fixed; height:100%; z-index: 100; width:100%;"offset-xs5>
      <v-card class="pt-6" dark style="padding-top:96px;height:100%; background-color: #303030">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 lg5 mb-3>
              <v-expansion-panel popout>
                <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                  <div slot="header">Item</div>
                  <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex xs12 lg5 offset-lg2>
              <v-expansion-panel inset>
                <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                  <div slot="header">Item</div>
                  <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-container>
        <v-tabs>
    <v-tabs-bar dark >
      <v-tabs-slider ></v-tabs-slider>
      <v-tabs-item
        v-for="i in 15"
        :key="i"
        :href="'#tab-' + i"
      >
        Item {{ i }}
      </v-tabs-item>
      <v-menu>
        <v-tabs-item slot="activator">
          Menu
          <v-icon>arrow_drop_down</v-icon>
        </v-tabs-item>
        <v-list v-for="n in 4" v-bind:key="n">
          <v-list-tile @click="">Item {{ n }}</v-list-tile>
        </v-list>
      </v-menu>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 15"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>nkjnj</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import vueniverseLogo from '~/assets/img/vueniverse_logo.svg'
export default {
  data () {
    return {
      side: 'xs0',
      cards: [
        {
          title: 'Rocket League',
          src: 'http://gamingsnack.com/wp-content/uploads/2016/07/Rocket-League-PS3.jpg',
          background_src: 'https://apollo2.dl.playstation.net/cdn/UP2002/CUSA01163_00/FREE_CONTENTiPxbhwKK7WRaLUzFkflg/PREVIEW_SCREENSHOT4_86261.jpg',
          flex: 5
        },
        {
          title: 'Monopoly: Nintendo Switch edition',
          src: 'https://cdn02.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_MonopolyForNintendoSwitch_enGB.jpg',
          background_src: 'https://static1.squarespace.com/static/56d725b88a65e2c48c079abf/t/5a0d0593ec212d61eebdf3b7/1510802851041/Monopoly_Switch_Review5.jpg.jpg',
          flex: 7
        },
        {
          title: 'Stardew Valley',
          src: 'https://pbs.twimg.com/media/Czl7fuMXAAE1sp7.jpg',
          background_src: 'https://d24hkyf7t7q9y9.cloudfront.net/assets/article/2017/08/29/stardew-valley-nintendo-switch_feature.png',
          flex: 12
        },
        {
          title: 'Rocket League 2',
          src: 'http://gamingsnack.com/wp-content/uploads/2016/07/Rocket-League-PS3.jpg',
          background_src: 'https://apollo2.dl.playstation.net/cdn/UP2002/CUSA01163_00/FREE_CONTENTiPxbhwKK7WRaLUzFkflg/PREVIEW_SCREENSHOT4_86261.jpg',
          flex: 5
        },
        {
          title: 'Monopoly: Nintendo Switch edition 2',
          src: 'https://cdn02.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_MonopolyForNintendoSwitch_enGB.jpg',
          background_src: 'https://static1.squarespace.com/static/56d725b88a65e2c48c079abf/t/5a0d0593ec212d61eebdf3b7/1510802851041/Monopoly_Switch_Review5.jpg.jpg',
          flex: 7
        },
        {
          title: 'Stardew Valley 2',
          src: 'https://pbs.twimg.com/media/Czl7fuMXAAE1sp7.jpg',
          background_src: 'https://d24hkyf7t7q9y9.cloudfront.net/assets/article/2017/08/29/stardew-valley-nintendo-switch_feature.png',
          flex: 12
        }
      ],
      blurConfig: {
        isBlurred: true, // activate and deactivate blur directive example 2
        opacity: 1,
        filter: 'blur(5px)',
        transition: 'all .3s linear'
      }
    }
  }
}
</script>
