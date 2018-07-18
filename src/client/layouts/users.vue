<template>
  <v-card>
    <v-list two-line v-if="users.length > 0">
      <template v-for="(card, index) in users">
        <v-list-tile
          :key="card.title"
          avatar
          v-ripple
        >
          <v-list-tile-content>
            <!--{{card.bookmark[0]}}wqeweq{{find_game_name(['5b0187f66659e71317859bb9'], 1)}}ewfwew-->
            <v-list-tile-title v-html="format_friend_code(card.friendcode)"></v-list-tile-title>
            <v-list-tile-sub-title class="text--primary black--text">{{ card.username }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="card.bookmark.length > 1">{{ card.bookmark.length }} games ~ {{ find_game_name(card.bookmark, 5) }} </v-list-tile-sub-title>
            <v-list-tile-sub-title v-else>sada{{card.bookmark}}{{ card.bookmark.length }} game ~ {{ find_game_name(card.bookmark, 1) }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon
            @click="add_friend(card)"><v-icon
              v-if="friends.indexOf(card._id) < 0"
              color="grey lighten-1"
            >star_border</v-icon>
            <v-icon
              v-else
              color="yellow darken-2"
            >star</v-icon></v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < cards.length" :key="index"></v-divider>
      </template>
    </v-list>
    <template v-else>
      <div style="font-size: 25px; text-align: center;" >nothing...</div>
    </template>
  </v-card>
</template>

<script>
import axios from '~/plugins/axios'
// search icons: https://material.io/icons/ asd
export default {
  props: [
    'add_friend',
    'cards',
    'users',
    'friends',
    'chat_users'
  ],
  data () {
    return {
      selected: [2],
      items: [
        { username: 'e_e13', friendcode: '123212311231', bookmark: ['5b0187f66659e71317859bb9', '5b0182f96659e71317859bb4', '5b0183176659e71317859bb5','5b018d316659e71317859bbf','5b0187f66659e71317859bb9'] },
        { username: '15 min', friendcode: 'Brunch this weekend?', bookmark: ['5b0182f96659e71317859bb4','5b0187f66659e71317859bb9', '5b018f9d6659e71317859bc4', '5b0183176659e71317859bb5','5b018d316659e71317859bbf','5b0187f66659e71317859bb9'] },
        { username: '15 min', friendcode: 'Brunch this weekend?', bookmark: ['5b0187f66659e71317859bb9'] },
        { username: '15 min', friendcode: 'Brunch this weekend?', bookmark: ['5b0187f66659e71317859bb9'] }
      ]
    }
  },methods: {
    find_game_name: function(_ids, count) {
      var inc = 0
      var arr = []
      for (var i = 0; (i < this.cards.length) && (inc < count); i++) {
        for (var j = 0; j < _ids.length; j++) {
          if (this.cards[i]._id == _ids[j]) {
            inc++
            arr.push(this.cards[i].title)
          }
        }
      }
      var str = arr.join(", ")
      if (arr.length >= 5) {
        str += "..."
      }
      return str
    },
    format_friend_code: function(str) {
      var ret_str = ''
      return "<b>SW</b> - " + str.substr(0,4) + " - " + str.substr(4,4) + " - " + str.substr(8, 4)
    }
  }
}
</script>
