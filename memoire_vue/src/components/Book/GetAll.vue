<template>

    <div v-if="loading" class="loading">
        Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
    </div>

    <div v-if="books" class="content">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>PublishingHouse</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book,i) in books" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.releaseYear }}</td>
                    <td>{{ getPublishingHouseName(book.publishingHouseId) }}</td>
                    <td>{{ getPersonName(book.personId) }}</td>
                    <td>{{ getTypeName(book.typeId) }}</td>
                    <td><button @click="() => delete_data(book.id)">Delete</button></td>
                    <td><button @click="() => edit_data(book.id)">Edit</button></td>
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
                books: null,
                publishingHouses: [],
                persons: [],
                types: []
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
            async fetchData() {
                fetch('https://localhost:7009/api/book')
                    .then(r => r.json()
                    )
                    .then(json => {
                        this.books = json;
                        this.loading = false;
                        return;
                    });
                const [housesResponse, personsResponse, typesResponse] = await Promise.all([
                    fetch('https://localhost:7009/api/publishingHouse'),
                    fetch('https://localhost:7009/api/person'),
                    fetch('https://localhost:7009/api/type')
                ]);
                this.publishingHouses = await housesResponse.json();
                this.persons = await personsResponse.json();
                this.types = await typesResponse.json();
            },
            getPublishingHouseName(id) {
                const house = this.publishingHouses.find(h => h.id === id);
                return house ? house.name : 'Unknown';
            },
            getPersonName(id) {
                const person = this.persons.find(p => p.id === id);
                return person ? person.lastname : 'Unknown';
            },
            getTypeName(id) {
                const type = this.types.find(t => t.id === id);
                return type ? type.label : 'Unknown';
            },
            async delete_data(id) {
                console.log("Here")
                const response = await fetch('https://localhost:7009/api/book/'+id, {
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
