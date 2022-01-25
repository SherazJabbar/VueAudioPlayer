import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";
import SongItem from "../../src/components/SongItem.vue";

jest.mock("@/includes/firebase", () => {});

describe("Home.vue", () => {
  test("render list of songs", () => {
    const songs = [{}, {}, {}];

    Home.methods.getSongs = () => false;

    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
      },
    });
    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]);
    });
  });
});
