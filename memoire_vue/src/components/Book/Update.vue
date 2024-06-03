<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="Title">title:</label>
                <input type="text" id="Title" v-model="book.title" required />
            </div>
            <div>
                <label for="ReleaseYear">release year:</label>
                <input type="number" id="ReleaseYear" v-model="book.releaseYear" required />
            </div>
            <div>
                <label for="publishingHouseId">Publishing house:</label>
                <select v-model="book.publishingHouseId" id="publishingHouseId" required>
                    <option v-for="house in publishingHouses" :key="house.id" :value="house.id">
                        {{ house.name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="personId">Author:</label>
                <select v-model="book.personId" id="personId" required>
                    <option v-for="person in persons" :key="person.id" :value="person.id">
                        {{ person.lastname }}{{ person.firstname }}
                    </option>
                </select>
            </div>

            <div>
                <label for="typeId">Type:</label>
                <select v-model="book.typeId" id="typeId" required>
                    <option v-for="type in types" :key="type.id" :value="type.id">
                        {{ type.label }}
                    </option>
                </select>
            </div>
            <button type="submit">Update</button>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'Update',
        data() {
            return {
                id: null,
                book: null,
                publishingHouses: [],
                persons: [],
                types: []
            };
        },
        methods: {
            async fetchData() {
                const response = await fetch('https://localhost:7009/api/book/'+this.id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.book = await response.json();
                const [housesResponse, personsResponse, typesResponse] = await Promise.all([
                    fetch('https://localhost:7009/api/publishingHouse'),
                    fetch('https://localhost:7009/api/person'),
                    fetch('https://localhost:7009/api/type')
                ]);
                this.publishingHouses = await housesResponse.json();
                this.persons = await personsResponse.json();
                this.types = await typesResponse.json();
            },
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/book', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Id: this.book.id,
                            Title: this.book.title,
                            ReleaseYear: this.book.releaseYear,
                            PublishingHouseId: this.book.publishingHouseId,
                            PersonId: this.book.personId,
                            TypeId: this.book.typeId
                        })
                    });
                    if (response.status === 200) {
                        alert("Updated with sucess")
                    }
                    else {
                        alert("An error occured");
                    }
                } catch (error) {
                    console.error('Erreur lors de la soumission du formulaire:', error);
                }
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.fetchData();
        }
    }
</script>