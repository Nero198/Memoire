<template>

    <div v-if="loading" class="loading">
        Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
    </div>

    <div v-if="publishingHouses" class="content">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Label</th>
                    <th>StartYear</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(publishingHouse,i) in publishingHouses" :key="publishingHouses.id">
                    <td>{{publishingHouse.id}}</td>
                    <td>{{publishingHouse.name}}</td>
                    <td>{{publishingHouse.startYear}}</td>
                    <td><button @click="() => delete_data(publishingHouse.id)">Delete</button></td>
                    <td><button @click="() => edit_data(publishingHouse.id)">Edit</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="js">
    import { defineComponent } from 'vue';
    import moment from 'moment';
    import router from '../../router/index.js'

    export default defineComponent({
        data() {
            return {
                loading: false,
                publishingHouses: null
            };
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData();
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                fetch('https://localhost:7009/api/publishingHouse')
                    .then(r => r.json()
                    )
                    .then(json => {
                        this.publishingHouses = json;
                        this.loading = false;
                        return;
                    });
            },
            async delete_data(id) {
                console.log("Here")
                const response = await fetch('https://localhost:7009/api/publishingHouse/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert("Delete with sucess");
                this.fetchData();
            },
            edit_data(id) {
                router.push({ path: 'Update/'+id })
            }
        },
    });
</script>
