<template>
  <v-main class="w-100">
      <v-app-bar height="50" :class=cls>
        <v-icon icon="$vuetify" class="ms-10"></v-icon>
       <v-flex class="ps-2">{{ this.$store.state.recevier }}</v-flex>
      </v-app-bar>
      <div style="display: flex; height: 100vh;">
        <v-virtual-scroll
        v-if="it && it.length > 0"
        class="900"
        :items="it"
      >
        <template v-slot:default="{ item }" >
          <div :class="set(item)">
            <v-content :class="sec(item)" class="chatbox py-3">
              <div class="px-7">{{ item.message }}</div>
            </v-content>
          </div>
        </template>
        </v-virtual-scroll>
      </div>
      <bttm />
  </v-main>
</template>

<script>
import bttm from "./bt_nav.vue";
import eventBus from '../event';

export default {
  components: {
      bttm
  },
  data() {
      return {
          chatt: '',
          curpage: 'Chats',
          cls: 'bg-blue-grey-darken-1',
          socket: null
      };
  },
  created() {
      eventBus.on('dabade', this.change);
  },
  computed: {
      it() {
          if (this.$store.state.recevier in this.$store.state.chats) {
              return this.$store.state.chats[this.$store.state.recevier];
          }
          return [];
      }
  },
  watch:{
      
  },
  methods: {
      change() {
          this.cls = this.cls === 'bg-blue-grey-darken-2' ? 'bg-blue-grey-darken-1' : 'bg-blue-grey-darken-2';
      },
      set(t) {
          return t.user === this.$store.getters.curuser ? 'd-flex justify-start' : 'd-flex justify-end';
      },
      sec(item) {
          return item.user === this.$store.state.username ? 'bg-green-accent-3' : 'd-flex justify-end bg-blue-grey-lighten-4';
      },
      check() {
          return this.$store.state.recevier !== '_temp_';
      }
  }
};
</script>

<style>
.chatbox {
  height: max-content;
  font-size: large;
  border-radius: 7px;
}
</style>
