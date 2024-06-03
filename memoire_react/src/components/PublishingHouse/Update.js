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
        populatePublishingHouse();
    }, []);

    const updateData = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7009/api/PublishingHouse', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id : inputs.id,
                Name: inputs.name,
                StartYear: inputs.startYear
            })
        });
        if (response.status === 200) {
            alert("Updated with sucess")
        }
        else{
            alert("An error occured");
        }
    }
    async function populatePublishingHouse() {
        const response = await fetch('https://localhost:7009/api/PublishingHouse/'+id);
        const data = await response.json();
        setInputs(data);
    }

    return (
        <form onSubmit={updateData}>
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
                <input type="submit" value="Update"/>
            </div>
        </form>
    )
}

export default Update;