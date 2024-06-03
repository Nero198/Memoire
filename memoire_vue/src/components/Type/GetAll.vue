<template>

    <div v-if="loading" class="loading">
        Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
    </div>

    <div v-if="types" class="content">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Label</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(type,i) in types" :key="type.id">
                    <td>{{type.id}}</td>
                    <td>{{type.label}}</td>
                    <td><button @click="() => delete_data(type.id)">Delete</button></td>
                    <td><button @click="() => edit_data(type.id)">Edit</button></td>
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
                types: null
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
                fetch('https://localhost:7009/api/type')
                    .then(r => r.json()
                    )
                    .then(json => {
                        this.types = json;
                        this.loading = false;
                        return;
                    });
            },
            async delete_data(id) {
                console.log("Here")
                const response = await fetch('https://localhost:7009/api/type/'+id, {
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
