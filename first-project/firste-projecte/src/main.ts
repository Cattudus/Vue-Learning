import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import "primevue/resources/themes/lara-light-indigo/theme.css";

import './assets/main.css'
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";


const app = createApp(App)
app.use(PrimeVue);
app.component('Menubar' ,Menubar)
    .component('Button', Button)
    .component('InputNumber', InputNumber)
    .component('Dialog', Dialog)
app.mount('#app')

