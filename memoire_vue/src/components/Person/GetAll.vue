<template>

    <div v-if="loading" class="loading">
        Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
    </div>

    <div v-if="post" class="content">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>LastName</th>
                    <th>FirstName</th>
                    <th>Date of birth</th>
                    <th>gender</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person,i) in post" :key="person.id">
                    <td>{{person.id}}</td>
                    <td>{{person.lastname}}</td>
                    <td>{{person.firstname}}</td>
                    <td>{{format_date(person.dateOfBirth)}}</td>
                    <td>{{format_gender(person.isMan)}}</td>
                    <td><button @click="() => delete_data(person.id)">Delete</button></td>
                    <td><button @click="() => edit_data(person.id)">Edit</button></td>
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
                post: null
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
                fetch('https://localhost:7009/api/person')
                    .then(r => r.json()
                    )
                    .then(json => {
                        this.post = json;
                        this.loading = false;
                        return;
                    });
            },
            async delete_data(id) {
                console.log("Here")
                const response = await fetch('https://localhost:7009/api/person/'+id, {
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
            },
            format_date(value) {
                if (value) {
                    return moment(String(value)).format('DD/MM/YYYY')
                }
            },
            format_gender(value) {
                if (value === true) {
                    return "Male"
                }
                else {
                    return "Female"
                }
            }
        },
    });
</script>
