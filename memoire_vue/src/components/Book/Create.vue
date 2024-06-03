<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="Title">title:</label>
                <input type="text" id="Title" v-model="form.title" required />
            </div>
            <div>
                <label for="ReleaseYear">release year:</label>
                <input type="number" id="ReleaseYear" v-model="form.releaseYear" required />
            </div>
            <div>
                <label for="publishingHouseId">Publishing house:</label>
                <select v-model="form.publishingHouseId" id="publishingHouseId" required>
                    <option v-for="house in publishingHouses" :key="house.id" :value="house.id">
                        {{ house.name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="personId">Author:</label>
                <select v-model="form.personId" id="personId" required>
                    <option v-for="person in persons" :key="person.id" :value="person.id">
                        {{ person.lastname }}{{ person.firstname }}
                    </option>
                </select>
            </div>

            <div>
                <label for="typeId">Type:</label>
                <select v-model="form.typeId" id="typeId" required>
                    <option v-for="type in types" :key="type.id" :value="type.id">
                        {{ type.label }}
                    </option>
                </select>
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    releaseYear: '',
                    personId: '',
                    typeId: '',
                    publishingHouseId: ''
                },
                publishingHouses: [],
                persons: [],
                types: []
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                try {
                    const [housesResponse, personsResponse, typesResponse] = await Promise.all([
                        fetch('https://localhost:7009/api/publishingHouse'),
                        fetch('https://localhost:7009/api/person'),
                        fetch('https://localhost:7009/api/type')
                    ]);
                    this.publishingHouses = await housesResponse.json();
                    this.persons = await personsResponse.json();
                    this.types = await typesResponse.json();
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            },
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/book', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Title: this.form.title,
                            ReleaseYear: this.form.releaseYear,
                            PublishingHouseId: this.form.publishingHouseId,
                            PersonId: this.form.personId,
                            TypeId: this.form.typeId
                        })
                    });
                    
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    alert("Create with sucess");
                } catch (error) {
                    console.error('Erreur lors de la soumission du formulaire:', error);
                }
            }
        }
    };
</script>

