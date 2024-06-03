<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="label">label:</label>
                <input type="text" id="label" v-model="type.label" required />
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
                type: null
            };
        },
        methods: {
            async fetchData() {
                const response = await fetch('https://localhost:7009/api/type/'+this.id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.type = await response.json();
            },
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/type', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Id: this.type.id,
                            Label: this.type.label
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