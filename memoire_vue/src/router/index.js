import { createRouter, createWebHistory } from 'vue-router'
import PersonCreate from '../components/Person/Create.vue'
import PersonGetAll from '../components/Person/GetAll.vue'
import PersonUpdate from '../components/Person/Update.vue'
import TypeCreate from '../components/Type/Create.vue'
import TypeGetAll from '../components/Type/GetAll.vue'
import TypeUpdate from '../components/Type/Update.vue'
import PublishingHouseCreate from '../components/PublishingHouse/Create.vue'
import PublishingHouseGetAll from '../components/PublishingHouse/GetAll.vue'
import PublishingHouseUpdate from '../components/PublishingHouse/Update.vue'
import BookCreate from '../components/Book/Create.vue'
import BookGetAll from '../components/Book/GetAll.vue'
import BookUpdate from '../components/Book/Update.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            name: 'PersonCreate',
            component: PersonCreate
        },
        {
            path: '/Person/Create',
            name: 'PersonCreate',
            component: PersonCreate
        },
        {
            path: '/Person/GetAll',
            name: 'PersonGetAll',
            component: PersonGetAll
        },
        {
            path: '/Person/Update/:id',
            name: 'PersonUpdate',
            component: PersonUpdate
        },
        {
            path: '/Type/Create',
            name: 'TypeCreate',
            component: TypeCreate
        },
        {
            path: '/Type/GetAll',
            name: 'TypeGetAll',
            component: TypeGetAll
        },
        {
            path: '/Type/Update/:id',
            name: 'TypeUpdate',
            component: TypeUpdate
        },
        {
            path: '/PublishingHouse/Create',
            name: 'PublishingHouseCreate',
            component: PublishingHouseCreate
        },
        {
            path: '/PublishingHouse/GetAll',
            name: 'PublishingHouseGetAll',
            component: PublishingHouseGetAll
        },
        {
            path: '/PublishingHouse/Update/:id',
            name: 'PublishingHouseUpdate',
            component: PublishingHouseUpdate
        }
        ,
        {
            path: '/Book/Create',
            name: 'BookCreate',
            component: BookCreate
        },
        {
            path: '/Book/GetAll',
            name: 'BookGetAll',
            component: BookGetAll
        },
        {
            path: '/Book/Update/:id',
            name: 'BookUpdate',
            component: BookUpdate
        }
    ]
    
})

export default router