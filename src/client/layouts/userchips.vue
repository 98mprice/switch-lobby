<template>
  <span style="margin-bottom:0px;position: relative">
          <v-menu
      :nudge-width="180"
      v-model="menu"
      :nudge-left="86"
      offset-y
      lazy
      bottom
    >
          <template slot="activator">
            <v-tooltip  top>
              <v-chip :color="colour" text-color="white" slot="activator" v-ripple @click="chat.toggle_btns = true">
                  <v-icon v-if="(user.friends.indexOf(local_user._id) > -1) && (local_user.friends.indexOf(user._id) == -1)"  left class="pl-1">people_outline</v-icon>
                  <v-icon v-else-if="user.friends.indexOf(local_user._id) > -1"  left class="pl-1">people</v-icon>
                  <v-icon v-else-if="local_user.friends.indexOf(user._id) > -1"  class="pl-1" left>person</v-icon>
                  <v-icon v-else  class="pl-1" left>person_outline</v-icon>
                {{user.username}}
              </v-chip>
              <span v-if="(user.friends.indexOf(local_user._id) > -1) && (local_user.friends.indexOf(user._id) == -1)">They added you, but you haven't added them</span>
              <span v-else-if="user.friends.indexOf(local_user._id) > -1">You are already friends with each other</span>
              <span v-else-if="local_user.friends.indexOf(user._id) > -1">You are friends with them, but they aren't with you</span>
              <span v-else>{{format_friend_code(user.friendcode)}}</span>
            </v-tooltip> {{text}}
          </template>
            <v-card class="pt-0 mt-3">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.username}}</v-list-tile-title>
              <v-list-tile-sub-title>{{format_friend_code(user.friendcode)}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon
              @click="add_friend(user)"><v-icon
                v-if="friends && friends.indexOf(user._id) < 0"
                color="grey lighten-1"
              >star_border</v-icon>
              <v-icon
                v-else
                color="yellow darken-2"
              >star</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </span>
</template>

<script>
export default {
  props: [
    'user',
    'local_user',
    'game',
    'friends',
    'add_friend',
    'colour',
    'text'
  ],
  data() {
    return {
      menu: ''
    }
  },
  methods: {
    format_friend_code: function(str) {
      var ret_str = ''
      return "SW-" + str.substr(0,4) + "-" + str.substr(4,4) + "-" + str.substr(8, 4)
    }
  },
  mounted() {

  }
}
</script>
