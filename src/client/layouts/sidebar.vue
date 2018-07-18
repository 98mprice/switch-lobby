<template>
  <v-card class="pt-6 pb-5" dark style="padding-top:96px;height:100%; background-color: #303030">
    <v-container fill-height>
      <v-layout column >
        <div style="margin-bottom:5px;position: relative" v-for="(chat, index) in chat_results">
          <userchips v-if="chat.type == 'chat message'" :friends="friends" :add_friend="add_friend" :user="chat.user" :local_user="user" :chat="chat" :game="game" colour="green"/>
          <v-card v-else-if="chat.type == 'join game'" >
            <div style="text-align: center;">
              ~<userchips :friends="friends" :add_friend="add_friend" :user="chat.user" :local_user="user" :chat="chat" :game="game" colour="transparent"/> <small>joined</small> &nbsp;&nbsp;~
            </div>
          </v-card>
          <v-card v-else-if="chat.type == 'add friend'" >
            <div style="text-align: center;">
              ~<userchips :friends="friends" :add_friend="add_friend" :local_user="user" :user="chat.user" :game="game" colour="transparent"/> <small>added</small> <userchips :friends="friends" :add_friend="add_friend" :local_user="user" :user="chat.friend" :game="game" colour="transparent"/>&nbsp;&nbsp;~
            </div>
          </v-card>
        </div>
      </v-layout>
    </v-container>
    <v-layout align-end>
      <v-flex xs11>
        <v-text-field v-on:keyup="validateEmailAddress"
        label="chat" class="mr-3" hide-details single-line
                v-model="chat_text"
                solo light
                flat></v-text-field>
      </v-flex>
      <v-flex xs1>
        <v-btn icon class="pa-0" @click="send_chat">
          <v-icon>send</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-bottom-nav :value="true" :active.sync="e1" absolute color="transparent">
     <v-btn flat value="scheduled">
       <span>Scheduled</span>
       <v-icon>access_time</v-icon>
     </v-btn>
     <v-btn flat value="lobby">
       <span>Lobby</span>
       <v-icon>forum</v-icon>
     </v-btn>
     <v-btn flat value="online">
       <span>Online (27)</span>
       <v-icon>bubble_chart</v-icon>
     </v-btn>
   </v-bottom-nav>
  </v-card>
</template>

<script>
import userchips from './userchips.vue'
export default {
  props: [
    'chat_users',
    'user',
    'socket',
    'chat_results',
    'game',
    'friends',
    'add_friend'
  ],
  components: {
    userchips
  },
  data() {
    return {
      e1: 'recent',
      chat_text: ''
    }
  },
  methods: {
    send_chat: function() {
      this.socket.emit('chat message', {
        user: this.user,
        text: this.chat_text,
        game_id: this.game._id
      });
      this.chat_text = ''
    },
    validateEmailAddress: function(e) {
      if (e.keyCode === 13) {
        this.send_chat()
      }
    },
    format_friend_code: function(str) {
      var ret_str = ''
      return "SW-" + str.substr(0,4) + "-" + str.substr(4,4) + "-" + str.substr(8, 4)
    }
  },
  mounted() {

  }
}
</script>
