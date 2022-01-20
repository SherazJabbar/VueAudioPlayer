<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <div class="flex justify-center items-center" v-show="isLoading">
              <div
                class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span class="visually-hidden"></span>
              </div>
            </div>
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from "../store/index";
import AppUpload from "../components/Upload.vue";
import CompositionItem from "../components/CompositionItem.vue";
import { songsCollection, auth } from "../includes/firebase";

export default {
  name: "manage",
  // This keyword is not available in route navigation guards becuase component is not rendered yet
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
      isLoading: true,
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
    this.isLoading = false;
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },

    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      this.$refs.upload.cancelUploads();
      next();
    } else {
      // eslint-disable-next-line no-unused-vars
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      this.$refs.upload.cancelUploads();
      next(leave);
    }
  },
};
</script>

<style scoped></style>
