<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">name:</label>
                <input type="text" id="name" v-model="publishingHouse.name" required />
            </div>

            <div>
                <label for="startYear">startYear:</label>
                <input type="number" id="startYear" v-model="publishingHouse.startYear" required />
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
                publishingHouse: null
            };
        },
        methods: {
            async fetchData() {
                const response = await fetch('https://localhost:7009/api/publishingHouse/'+this.id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.publishingHouse = await response.json();
            },
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/publishingHouse', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Id: this.publishingHouse.id,
                            Name: this.publishingHouse.name,
                            StartYear: this.publishingHouse.startYear
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