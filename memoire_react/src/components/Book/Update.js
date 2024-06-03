import {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

function Create() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const { id } = useParams();
    const [publishingHouses, setPublishingHouses] = useState([]);
    const [persons, setPersons] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
    // Fetch data from APIs
        const fetchPublishingHouses = async () => {
        try {
            const response = await fetch('https://localhost:7009/api/PublishingHouse');
            const data = await response.json();
            setPublishingHouses(data);
        } catch (error) {
            console.error('Error fetching publishing houses:', error);
        }
        };

        const fetchPersons = async () => {
        try {
            const response = await fetch('https://localhost:7009/api/person');
            const data = await response.json();
            setPersons(data);
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
        };

        const fetchTypes = async () => {
        try {
            const response = await fetch('https://localhost:7009/api/type');
            const data = await response.json();
            setTypes(data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
        };
        const populateBook = async () => {
            const response = await fetch('https://localhost:7009/api/Book/'+id);
            const data = await response.json();
            setInputs(data);
        }
        populateBook();
        fetchPublishingHouses();
        fetchPersons();
        fetchTypes();
    }, []);
    const submitData = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7009/api/Book', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id : inputs.id,
                Title: inputs.title,
                ReleaseYear: inputs.releaseYear,
                PublishingHouseId: inputs.publishingHouseId,
                PersonId: inputs.personId,
                TypeId: inputs.typeId,
            })
        });
        if (response.status === 200) {
            alert("Update with sucess")
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
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>Release Year:
                    <input
                        type="number"
                        name="releaseYear"
                        value={inputs.releaseYear || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>Publishing House:</label>
                <select
                    name="publishingHouseId"
                    value={inputs.publishingHouseId}
                    onChange={handleChange}
                >
                    <option value="">Select Publishing House</option>
                    {publishingHouses.map((house) => (
                    <option key={house.id} value={house.id}>
                        {house.name}
                    </option>
                    ))}
                </select>
                </div>
                <div>
                <label>Person:</label>
                <select
                    name="personId"
                    value={inputs.personId}
                    onChange={handleChange}
                >
                    <option value="">Select Person</option>
                    {persons.map((person) => (
                    <option key={person.id} value={person.id}>
                        {person.lastname} {person.firstname}
                    </option>
                    ))}
                </select>
                </div>
                <div>
                <label>Type:</label>
                <select
                    name="typeId"
                    value={inputs.typeId}
                    onChange={handleChange}
                    >
                    <option value="">Select Type</option>
                    {types.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.label}
                    </option>
                    ))}
                </select>
                </div>
            <div>
                <input type="submit" value="Update"/>
            </div>
        </form>
    )
}

export default Create;