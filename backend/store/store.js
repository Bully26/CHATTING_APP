import { createStore } from 'vuex';
const store=createStore({
    state:{
        // const map1 = new Map();
        Active_id_name:new Map(),
        Active_name_id:new Map()
    },
    getters: {
        id_to_user: (state) => (socket_id) => {
          return state.Active_id_name.get(socket_id);
        },
        user_to_id: (state) => (username) => {
          return state.Active_name_id.get(username);
        }
      }
      



});

export default store;