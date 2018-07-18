<template>
  <v-app id="inspire" style="background-color:#F44336">
    <div style="position: fixed;height:60px; width:100%; background: linear-gradient(#F44336, rgba(0, 0, 0, 0)); z-index: 1"></div>
    <div style="position: fixed;bottom:0px;height:60px; width:100%; background: linear-gradient(rgba(0, 0, 0, 0), #F44336); z-index: 1"></div>
    <v-toolbar class="mt-3" style="z-index:150"
      floating color="white" light app fixed>
      <v-btn icon>
        <v-icon>question_answer</v-icon>
      </v-btn>
      <v-toolbar-title class="mr-5">SwitchLobby</v-toolbar-title>
      <v-text-field style="width: 350px"
      label="Search for games & friends" class="mr-3" prepend-icon="search" hide-details single-line
              v-model="search_text"
              solo-inverted
              flat></v-text-field>
      <v-btn class="mr-3" icon>
        <v-icon color="grey darken-1">add_alert</v-icon>
      </v-btn>
      <v-progress-linear class="pt-0 mt-0" style="position: absolute; top:0" v-show="searching"  :indeterminate="true"></v-progress-linear>
    </v-toolbar><!--!\ -->
      <!--<v-container fluid fill-height class="pa-0">
        <v-layout row wrap transition="slide-x-reverse-transition">
          <v-flex v-show="!show_sidebar" class="xs8 offset-xs2 pb-5" >
              <v-container fluid grid-list-md style="margin-top: 90px">
                <games :method="click_game"/>
              </v-container>
          </v-flex>
          <v-flex v-show="show_sidebar" class="xs5" >
              <v-container fluid grid-list-md style="margin-top: 90px">
                <games :method="click_game"/>
              </v-container>
          </v-flex>
        </v-layout>
      </v-container>-->
    <v-container fluid fill-height class="pa-0">
      <v-layout row wrap>
        <v-flex v-show="(search_text.length == 0) && (!show_sidebar)" class="xs12 sm10 md8 offset-xs0 offset-md2 offset-sm1 pb-5" style="margin-top: 90px" >
            <!--<div style="font-size: 45px; text-align: center;" class="white--text">Games</div>-->
            <v-container fluid grid-list-md >
              <games :mini_cards="false" :add_bookmark="bookmark" :bookmarks="user.bookmark" :method="click_game" :cards="cards" :sidebar="false"/>
            </v-container>
        </v-flex>
        <v-flex v-show="(show_sidebar == false) && (search_text.length > 0)" class="xs12 sm10 md8 offset-xs0 offset-md2 offset-sm1 pb-5" style="margin-top: 90px" >
            <div style="font-size: 45px; text-align: center;" class="white--text">Games</div>
            <v-container fluid grid-list-md >
              <games :mini_cards="true" :add_bookmark="bookmark" :bookmarks="user.bookmark" :method="click_game" :cards="search_cards" :sidebar="false"/>
            </v-container>
            <template v-if="search_cards.length == 0">
              <v-card>
                <div style="font-size: 25px; text-align: center;" >nothing...</div>
              </v-card>
            </template>
            <div style="font-size: 45px; text-align: center;" class="white--text">People</div>
            <users :friends="user.friends" :cards="cards" :add_friend="friend" :users="search_users"/>
        </v-flex>
        <transition name="slide-x-reverse-transition">
          <v-flex v-show="show_sidebar" class="xs5" style="position: fixed" >
              <v-container fluid grid-list-md style="margin-top: 90px">
                <games :add_bookmark="bookmark" :bookmarks="user.bookmark" :method="click_game" :cards="cards" :sidebar="true"/>
              </v-container>
          </v-flex>
        </transition>
        <transition name="slide-y-reverse-transition">
          <v-flex v-show="show_sidebar" xs7 offset-xs5 style="position:fixed; height:100%; z-index: 100; width:100%" >
              <sidebar :friends="user.friends" :add_friend="friend" :chat_users="chat_users" :user="user" :socket="socket" :chat_results="chat_results" :game="selected_game"/>
          </v-flex>
        </transition>
      </v-layout>
    </v-container>
    <v-snackbar
      :timeout="3000"
      :bottom="true"
      :right="true"
      :multi-line="true"
      :color="snackbarColor"
      v-model="snackbar">
      {{ $store.state.notification.text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <dialog3 :bookmarks="user.bookmark" :add_bookmark="bookmark" :cards="cards" v-if="first_time" :dialog3="true"/>
  </v-app>
</template>

<script>
import io from 'socket.io-client'
import _ from 'lodash'
import axios from '~/plugins/axios'
import users from './users.vue'
import dialog3 from './dialog.vue'
import games from './games.vue'
import sidebar from './sidebar.vue'
// search icons: https://material.io/icons/ asd
export default {
  props: {
    source: String
  },
  components: {
    users,
    games,
    sidebar,
    dialog3
  },
  data () {
    return {
      selected_game: null,
      drawer: null,
      items: [
        {
          action: 'android',
          title: 'Something',
          items: [
            { title: 'First' },
            { title: 'Second' },
            { title: 'Third' }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          items: [
            { title: 'Payment' },
            { title: 'Account' },
            { title: 'Privacy' }
          ]
        }
      ],
      user: {
        bookmark: [

        ],
        friends: [

        ]
      },
      show_sidebar: false,
      name: 'switch_lobby',
      mini: true,
      right: null,
      first_time: false,
      cards: [

      ],
      user_id: null,
      searching: false,
      socket: null,
      chat_results: [

      ],
      search_cards: [

      ],
      search_users: [

      ],
      search_text: '',
      chat_users: {

      }
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.snackbar
      },
      set (value) {
        this.$store.commit('notification/UPDATE_SNACKBAR', value)
      }
    },
    snackbarColor () {
      return this.$store.state.notification.context
    }
  },
  methods: {
    click_game: function(data) {
      this.show_sidebar = true
      this.selected_game = data
      this.search_text = ''
      console.log("set stuff")
      this.socket.emit('join game', {
        user: this.user,
        game_id: data._id
      });
    },
    addStatusClass: function(data) {
      console.log(JSON.stringify(data));
    },
    bookmark: async function(card) {
      if (this.user.bookmark.indexOf(card._id) > -1) {
        var index = this.user.bookmark.indexOf(card._id);
        if (index > -1) {
          this.user.bookmark.splice(index, 1);
        }
      } else {
        this.user.bookmark.push(card._id)
      }
      if (this.user != null) {
        let userRes = await axios.post(`/users/bookmark`, {
          user_id: this.user._id,
          game_id: card._id
        })
        if (!userRes) error({ statusCode: 404, message: 'User not found' })
      }
    },
    friend: async function(friend) {
      if (this.user.friends.indexOf(friend._id) > -1) {
        var index = this.user.friends.indexOf(friend._id);
        if (index > -1) {
          this.user.friends.splice(index, 1);
        }
      } else {
        this.user.friends.push(friend._id)
      }
      if (this.user != null) {
        let userRes = await axios.post(`/users/friends`, {
          user_id: this.user._id,
          friend_id: friend._id
        })
        if (!userRes) error({ statusCode: 404, message: 'User not found' })
        else {
          this.socket.emit('add friend', {
            user: this.user,
            friend: friend
          });
        }
      }
    }
    //}
    ,
    search_games: _.debounce(async function() {
      if (this.search_text === "") {
        this.searching = false
      } else {
        console.log("searching for games")
        this.searching = true;
        let gameRes = await axios.get(`/games/search/${this.search_text}`)
        this.searching = false;
        console.log("sasdsa" + JSON.stringify(gameRes.data))
        this.search_cards = gameRes.data.games
        this.search_users = gameRes.data.users
      }
    }, 500)
  },
  async mounted() {
    this.socket = io();
    console.log("searching for games")
    let gameRes = await axios.get(`/games/`)
    if (!gameRes) error({ statusCode: 404, message: 'Game not found' })
    this.cards = gameRes.data
    if (localStorage.getItem("user_id")) {
      console.log("found user" + localStorage.getItem("user_id"))
      this.user_id = localStorage.getItem("user_id")
      let userRes = await axios.get(`/users/${this.user_id}`)
      if (!userRes) error({ statusCode: 404, message: 'User not found' })
      this.user = userRes.data
    } else {
      console.log("didn't find user")
      this.first_time = true
      console.log(this.first_time)
    }
    var vm = this
    this.socket.on('chat message', function(msg){
      console.log("got message")
      vm.chat_results.push({
        type: "chat message",
        user: msg.user,
        text: msg.text
      })
    });
    this.socket.on('add friend', function(msg){
      console.log("got message")
      vm.chat_results.push({
        type: "add friend",
        user: msg.user,
        friend: msg.friend
      })
    });
    this.socket.on('join game', function(msg){
      //console.log("got users" + msg)
      console.log("join game" + JSON.stringify(msg))
      vm.chat_results.push({
        type: "join game",
        user: msg.new_user
      })
      vm.chat_users[msg.game_id] = msg.users
      //vm.chat_results.push(msg)
    });
  },
  watch: {
    search_text: function() {
      if (this.search_text.length > 0) {
        console.log("setting it to false")
        this.show_sidebar = false
        this.search_games()
      }
    }
  }
}
</script>
