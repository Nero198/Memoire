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
        const response = await fetch('https://localhost:7009/api/publishingHouse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputs.name,
                startYear: inputs.startYear
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
                <label>Name:
                    <input
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={handleChange}
                    />
                </label>
                
            </div>
            <div>
                <label>Start year:
                    <input
                        type="number"
                        name="startYear"
                        value={inputs.startYear || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
}

export default Create;