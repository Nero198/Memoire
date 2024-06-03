<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="Lastname">Lastname:</label>
                <input type="text" id="Lastname" v-model="person.lastname" required />
            </div>
            <div>
                <label for="Firstname">firstname:</label>
                <input type="text" id="Firstname" v-model="person.firstname" required />
            </div>
            <div>
                <label for="DateOfBirth">Date of birth:</label>
                <input type="date" id="DateOfBirth" v-model="formattedDateOfBirth" required />
            </div>
            <div>
                <label>
                    Gender:
                    <label>
                        <input type="radio" id="male" value="true" v-model="person.isMan">
                        <label for="male">Male</label>
                    </label>
                    <label>
                        <input type="radio" id="female" value="false" v-model="person.isMan">
                        <label for="female">Female</label>
                    </label>
                </label>
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'Update',
        data() {
            return {
                id: null,
                person: null
            };
        },
        computed: {
            formattedDateOfBirth: {
                get() {
                    return this.person.dateOfBirth.split('T')[0];
                },
                set(value) {
                    this.person.dateOfBirth = value;
                }
            }
        },
        methods: {
            async fetchData() {
                const response = await fetch('https://localhost:7009/api/person/'+this.id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.person = await response.json();
            },
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/person', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Id: this.person.id,
                            Lastname: this.person.lastname,
                            Firstname: this.person.firstname,
                            DateOfBirth: this.person.dateOfBirth,
                            IsMan: this.person.isMan ? true : false
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