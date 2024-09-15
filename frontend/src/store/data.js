
import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: "_temp_",
    section: "Chats",
    room_id: "_temp_",
    recevier:"",
    have_recevier:false,
    chats: {},
    friend:['1','2','3','4','5'],
    receivedMessageIds: new Set(),
  },
  getters: {
    curuser: state => state.username,
    cursec: state => state.section,
    curroom: state => state.room_id,
  },
  mutations: {
    setsection: (state, payload) => {
      state.section = payload;
    },
    setuser: (state, payload) => {
      state.username = payload;
    },
    setroom: (state, payload) => {
      state.room_id = payload;
    },
    addchat: (state, payload) => {
      if(!state.receivedMessageIds.has(payload.id))
        {
          let friend;
          if(payload.user==state.username)friend=payload.recevier;
          else friend=payload.user;

          if (!state.chats[friend]) {
            state.chats[friend] = [];
          }
          state.chats[friend].push(payload);
          let len=state.chats[friend].length;
        }
    },
    addReceivedMessageId: (state, messageId) => {
      state.receivedMessageIds.add(messageId);
    }
  }
});

export default store;
