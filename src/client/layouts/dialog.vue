<template>
  <v-dialog
    v-model="dialog3"
    fullscreen
    hide-overlay
    transition="fade-transition"
    scrollable
  >
    <v-card flat style="height: 100%" tile color="red" class="ma-0">
      {{bookmarks}}
      <v-card-text style="position: relative;
     top: 50%;
     transform: perspective(1px) translateY(-50%);" class="ma-0 pa-0">
        <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
          <v-flex style=" text-align: center;" xs10>
            <h3 class="display-1 text-xs-center">Welcome to SwitchLobby! :)</h3>
            <div class="pb-2 pt-2 text-xs-center">I made this site to make it easier to find and communicate with new people on switch to play games with, and to keep the communities of older and less popular games alive</div>
            <span style="margin: auto;">
              <span style="font-size: 35px;">FC: <b>SW - </b></span>
              <input  style="-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);padding-left: 5px; width: 100px;font-size: 38px; color: #F44336; border-radius: 4px; background-color: white" v-model="section1" type="tel" maxlength="4" color="red" >
                <span style="font-size: 35px;"><b> - </b></span>
                <input  style="-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);padding-left: 5px; width: 100px;font-size: 38px; color: #F44336; border-radius: 4px; background-color: white" v-model="section2" type="tel" maxlength="4" color="red" >
                  <span style="font-size: 35px;"><b> - </b></span>
                  <input  style="-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);padding-left: 5px; width: 100px;font-size: 38px; color: #F44336; border-radius: 4px; background-color: white" v-model="section3" type="tel" maxlength="4" color="red" ><br>
            </span>
            <div style="height: 10px"></div>
            <v-slide-y-transition>
              <span  v-show="friendcode.length >= 12" style="margin: auto;">
                <span style="font-size: 35px;">Username: </span>
                <input  style="-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
      box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);padding-left: 5px; width: 350px;font-size: 38px; color: #F44336; border-radius: 4px; background-color: white" v-model="username" type="text"  >
              </span>
            </v-slide-y-transition>
            <div v-if="friendcode.length >= 12" style="height: 10px"></div>

            <!--<v-card >
              <v-card-text class="pa-3">
                <v-text-field
                  v-model="username"
                  :rules="username_rules"
                  label="username"
                ></v-text-field>
                <v-text-field
                  v-model="friendcode"
                  :rules="friendcode_rules"
                  :counter="10"
                  label="friend-code"
                  mask="aaaa-aaaa"
                ></v-text-field>
              </v-card-text>
            </v-card>-->
            <v-slide-y-transition>
              <div v-if="username.length >= 4">
                <span style="font-size: 25px;">Do you own any of the following popular games? </span>
                <v-layout
                    row
                    align-center
                    justify-center
                    class="white--text"
                  >
                  <v-card class="ma-1" style="width: 150px" v-for="(card, index) in popular_cards(0)">
                    <v-card-media
                      :src="card.src"
                      height="150px"
                    >
                    </v-card-media>
                    <v-card-actions v-ripple @click="add_bookmark_internal(card)">
                      <v-icon color="yellow" v-if="bookmarks && bookmarks.indexOf(card._id) > -1" style="margin:0 auto;">bookmark</v-icon>
                      <v-icon v-else style="margin:0 auto;">bookmark</v-icon>
                    </v-card-actions>
                  </v-card>
                </v-layout>
              </div>
            </v-slide-y-transition>
            <v-slide-y-transition>
              <div v-if="bookmarks && bookmarks.length >= 1">
                <span style="font-size: 25px;">How about any of these lesser-known games?</span>
                <v-layout
                    row
                    align-center
                    justify-center
                    class="white--text"
                  >
                  <v-card class="ma-1" style="width: 150px" v-for="(card, index) in popular_cards(1)" >
                    <v-card-media
                      :src="card.src"
                      height="150px"
                    >
                    </v-card-media>
                    <v-card-actions v-ripple @click="add_bookmark_internal(card)">
                      <v-icon color="yellow" v-if="bookmarks.indexOf(card._id) > -1" style="margin:0 auto;">bookmark</v-icon>
                      <v-icon v-else style="margin:0 auto;">bookmark</v-icon>
                    </v-card-actions>
                  </v-card>
                </v-layout>
                <span style="font-size: 15px;">(More games avaliable on the next screen)</span>
              </div>
            </v-slide-y-transition>
          <v-btn
          class="mb-5"
          color="white"
            large
            @click.stop="add_user()"
          >
            Get Started
          </v-btn>
          </v-flex>
            <!--<v-card xs8 offset-xs1>
              <v-card-title primary-title>
                <div>
                  <h3 class="display-1 text-xs-center">Welcome to SwitchLobby! :)</h3>
                  <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                </div>
              </v-card-title>
            </v-card>
            <h1 class="white--text mb-2 display-1 text-xs-center">Welcome to SwitchLobby! :)</h1>
            <div class="pl-5 pr-5 subheading mb-3 text-xs-center">I made this site to make it easier to find and communicate with new people on switch to play games with, and to keep the communities of older and less popular games alive</div>
            <div class="subheading mb-3 text-xs-center">do you own any of the following popular games?</div>
            <v-layout
                row
                align-center
                justify-center
                class="white--text"
              >
              <v-card class="ma-1" style="width: 150px" v-for="(card, index) in cards" v-if="card.popular == 0">
                <v-card-media
                  :src="card.src"
                  height="150px"
                >
                </v-card-media>
                <v-card-actions v-ripple @click="add_bookmark_internal(card)">
                  <v-icon color="yellow" v-if="bookmarks.indexOf(card._id) > -1" style="margin:0 auto;">bookmark</v-icon>
                  <v-icon v-else style="margin:0 auto;">bookmark</v-icon>
                </v-card-actions>
              </v-card>
            </v-layout>
            <div class="subheading mb-3 text-xs-center">how about any of these lesser-known games?</div>
            <v-btn
              dark
              large
              @click.stop="dialog3 = false"
            >
              Get Started
            </v-btn>-->
          </v-layout>
      </v-card-text>

      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  props: [
    "cards",
    "add_bookmark",
    "bookmarks",
    "dialog3"
  ],
  data () {
    return {
      section1: '',
      section2: '',
      section3: '',
      blurConfig: {
        isBlurred: true, // activate and deactivate blur directive example 2
        opacity: 1,
        filter: 'blur(5px)',
        transition: 'all .3s linear'
      },
      coverList: [
              {
                cover: 'http://ogu51f989.bkt.clouddn.com/react.png',
                title: 'React'
              }, {
                cover: 'http://ogu51f989.bkt.clouddn.com/angular.png',
                title: 'Angular'
              }, {
                cover: 'http://ogu51f989.bkt.clouddn.com/vue.png',
                title: 'Vue'
              }, {
                cover: 'http://ogu51f989.bkt.clouddn.com/webpack.png',
                title: 'Webpack'
              }, {
                cover: 'http://ogu51f989.bkt.clouddn.com/yarn.png',
                title: 'Yarn'
              }, {
                cover: 'http://ogu51f989.bkt.clouddn.com/node.png',
                title: 'Node'
              }
            ],
            valid: false,
          username: '',
          username_rules: [
            v => !!v || 'username is required',
            v => v.length <= 10 || 'username must be less than 10 characters'
          ]
    }
  },
  computed: {
    friendcode: function() {
      return this.section1 + this.section2 + this.section3
    }
  },
  methods: {
    finish_dialog3: function() {
      this.dialog3.close()
    },
    add_bookmark_internal: function(card) {
      this.add_bookmark(card)
    },
    popular_cards: function(check) {
      var count = 0
      var popular = []
      for (var i = 0; i < this.cards.length; i++) {
        if (count >= 4) {
          break;
        } else if (this.cards[i].popular == check) {
          popular.push(this.cards[i])
          count++
        }
      }
      return popular
    },
    add_user: async function() {
      console.log('saving these things' + this.username + this.friendcode + JSON.stringify(this.bookmarks))
      let userRes = await axios.post(`/users/`, {
        username: this.username,
        friendcode: this.friendcode,
        bookmark: this.bookmarks
      })
      if (!userRes) error({ statusCode: 404, message: 'User not found' })
      console.log("saving user" + userRes.data._id)
      localStorage.setItem("user_id", userRes.data._id);
      this.dialog3 = false
    }
  }
}
</script>
