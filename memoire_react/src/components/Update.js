import {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import {format} from 'date-fns';


function Update() {
    const [inputs, setInputs] = useState({});

    const { id } = useParams();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    useEffect(() => {
        populatePerson();
    }, []);

    const updateData = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7009/api/Person', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id : inputs.id,
                Lastname: inputs.lastname,
                Firstname: inputs.firstname,
                DateOfBirth: inputs.dateOfBirth,
                IsMan: inputs.isMale ? true : false
            })
        });
        if (response.status === 200) {
            alert("Updated with sucess")
        }
        else{
            alert("An error occured");
        }
    }
    async function populatePerson() {
        const response = await fetch('https://localhost:7009/api/Person/'+id);
        const data = await response.json();
        data.dateOfBirth = format(data.dateOfBirth, 'yyyy-MM-dd');
        setInputs(data);
    }

    return (
        <form onSubmit={updateData}>
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
                <input type="submit" value="Update"/>
            </div>
        </form>
    )
}

export default Update;