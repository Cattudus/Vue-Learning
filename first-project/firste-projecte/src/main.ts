import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Menubar from 'primevue/menubar';
import NodeComponent from "@/shared-ui/NodeComponent.vue";


import './assets/main.css'
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import InfoDialog from "@/shared-ui/InfoDialog.vue"

import AlgorithmPage from "@/components/AlgorithmPage.vue";
import TranslatePage from "@/components/TranslatePage.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: '/', component: AlgorithmPage },
    { path: '/translate', component: TranslatePage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
    .use(PrimeVue)
    .use(ToastService)
    .use(router)
    .component('Menubar', Menubar)
    .component('Button', Button)
    .component('InputNumber', InputNumber)
    .component('Dialog', Dialog)
    .component('Toast', Toast)
    .component('Dropdown', Dropdown)
    .component('NodeComponent', NodeComponent)
    .component('InfoDialog', InfoDialog)
    .mount('#app')


