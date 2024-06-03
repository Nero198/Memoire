<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="Label">label:</label>
                <input type="text" id="Label" v-model="form.Label" required />
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
                    Label: ''
                }
            };
        },
        methods: {
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/type', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Label: this.form.Label
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

