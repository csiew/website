import { reactive, readonly } from "vue";
import VueCookies from 'vue-cookies';

const state = reactive({
    darkMode: false
});

function getDarkModeState() {
    return state.darkMode;
}

function setDarkModeState(newValue) {
    state.darkMode = newValue;
    VueCookies.set('dark_mode', state.darkMode === true ? 'true' : 'false');
}

function toggleDarkModeState() {
    setDarkModeState(!state.darkMode);
    return state.darkMode;
}

export const store = readonly({
    state,
    getDarkModeState,
    setDarkModeState,
    toggleDarkModeState
});