import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';import Menubar from 'primevue/menubar';
import "primevue/resources/themes/lara-light-indigo/theme.css";

import './assets/main.css'
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";

export const app = createApp(App)
app.use(PrimeVue);
app.use(ToastService);
app.component('Menubar' ,Menubar)
    .component('Button', Button)
    .component('InputNumber', InputNumber)
    .component('Dialog', Dialog)
    .component('Toast', Toast)
app.mount('#app')

