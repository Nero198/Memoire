import {useState} from "react";


function Create() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const submitData = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7009/api/Person', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Lastname: inputs.lastname,
                Firstname: inputs.firstname,
                DateOfBirth: inputs.dateOfBirth,
                IsMan: inputs.isMale ? true : false
            })
        });
        if (response.status === 200) {
            alert("Create with sucess")
        }
        else{
            alert("An error occured");
        }
    }
    return (
        <form onSubmit={submitData}>
            <div>
                <label>Lastname:
                    <input
                        type="text"
                        name="lastname"
                        value={inputs.lastname || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>Firstname:
                    <input
                        type="text"
                        name="firstname"
                        value={inputs.firstname || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>Date of birth:
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={inputs.dateOfBirth || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>Gender:
                    <label>
                        <input
                            type="radio"
                            name="isMale"
                            value="true"
                            defaultChecked={true}
                            onChange={handleChange}
                        />
                        Male
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="isMale"
                            value="false"
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </label>
            </div>
            <div>
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
}

export default Create;