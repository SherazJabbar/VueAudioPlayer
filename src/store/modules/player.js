import { Howl } from "howler";
import helper from "../../includes/helper";

export default {
  state: {
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  mutations: {
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${
        (state.sound.seek() / state.sound.duration()) * 100
      }%`;
    },
  },
  actions: {
    async newSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }
      commit("newSong", payload);

      state.sound.play();

      state.sound.on("play", () => {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },

    progress({ commit, state, dispatch }) {
      commit("updatePosition");
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      // If sound in playing then ! operator changes true to false and code outside if block is executed.
      // If sound is not playing then ! operator changes the false to true and code inside the if block is executed.
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickx = payload.clientX - x;
      const percentage = clickx / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      // Callback will only run once
      state.sound.once("seek", () => {
        dispatch("progress");
      });
    },
  },
};
