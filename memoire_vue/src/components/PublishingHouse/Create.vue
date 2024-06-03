<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">name:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div>
                <label for="startYear">start Year:</label>
                <input type="number" id="startYear" v-model="form.startYear" required />
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
                    name: '',
                    startYear:''
                }
            };
        },
        methods: {
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/PublishingHouse', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Name: this.form.name,
                            StartYear: this.form.startYear
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

