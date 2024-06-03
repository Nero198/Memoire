<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="nom">Lastname:</label>
                <input type="text" id="Lastname" v-model="form.Lastname" required />
            </div>
            <div>
                <label for="Firstname">firstname:</label>
                <input type="text" id="Firstname" v-model="form.Firstname" required />
            </div>
            <div>
                <label for="DateOfBirth">Date of birth:</label>
                <input type="date" id="DateOfBirth" v-model="form.DateOfBirth" required />
            </div>
            <div>
                <label>
                    Gender:
                    <label>
                        <input type="radio"
                               name="IsMale"
                               checked="checked"
                               value="true"/>
                        Male
                    </label>

                    <label>
                        <input type="radio"
                               name="IsMale"
                               value="false"/>
                        Female
                    </label>
                </label>
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
                    Lastname: '',
                    Firstname: '',
                    DateOfBirth: '',
                    IsMale: 'true'
                }
            };
        },
        methods: {
            async submitForm() {
                try {
                    const response = await fetch('https://localhost:7009/api/person', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Lastname: this.form.Lastname,
                            Firstname: this.form.Firstname,
                            DateOfBirth: this.form.DateOfBirth,
                            IsMan: this.form.IsMale ? true : false
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

