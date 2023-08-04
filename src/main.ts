/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';
import GifSearch from './components/GifSearch.vue';
import GifCard from './components/GifSearch.vue';
import Button from './components/Button.vue';
import Logo from './components/Logo.vue';
import Loader from './components/Loader.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';
import MyRequestControll from './classes/MyRequestControll.ts';


const app = createApp(App);

app.component('search-gifs', GifSearch);
app.component('card-gif', GifSearch);
app.component('cmp-button', Button);
app.component('cmp-logo', Logo);
app.component('cmp-loader', Loader);

app.use({
    install(a: any) {
        a.config.globalProperties.$myRequestControll = new MyRequestControll();
    }
})

registerPlugins(app);

app.mount('#app');
