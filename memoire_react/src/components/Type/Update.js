import {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";


function Update() {
    const [inputs, setInputs] = useState({});

    const { id } = useParams();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    useEffect(() => {
        populateType();
    }, []);

    const updateData = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7009/api/Type', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id : inputs.id,
                Label: inputs.label
            })
        });
        if (response.status === 200) {
            alert("Updated with sucess")
        }
        else{
            alert("An error occured");
        }
    }
    async function populateType() {
        const response = await fetch('https://localhost:7009/api/Type/'+id);
        const data = await response.json();
        setInputs(data);
    }

    return (
        <form onSubmit={updateData}>
            <div>
                <label>Label:
                    <input
                        type="text"
                        name="label"
                        value={inputs.label || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <input type="submit" value="Update"/>
            </div>
        </form>
    )
}

export default Update;