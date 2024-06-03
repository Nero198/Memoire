import {useEffect, useState} from "react";
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";

function GetAll() {
    const [persons, setPersons] = useState();

    let navigate = useNavigate();
    
    useEffect(() => {
        populatePerson();
    }, []);

    const contents = persons === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
            <tr>
            <th>Id</th>
            <th>LastName</th>
            <th>FirstName</th>
            <th>Date of birth</th>
            <th>gender</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {persons.map((person) =>
                <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.lastname}</td>
                    <td>{person.firstname}</td>
                    <td>{format(person.dateOfBirth, 'dd/MM/yyyy')}</td>
                    <td>{person.isMan ? "Male" : "Female"}</td>
                    <td>
                        <button onClick={() => updatePerson(person.id)}><i>Update</i></button>
                    </td>
                    <td>
                        <button onClick={(async) => deletePerson(person.id)}><i>Delete</i></button>
                    </td>
                </tr>
                )
            }

            </tbody>
        </table>
    ;

    return (
        <div>
            <h1 id="tabelLabel">GetAll</h1>
            {contents}
        </div>
    );
    async function deletePerson (personId) {
        console.log(personId);
        const response = await fetch('https://localhost:7009/api/Person/'+personId, {
            method: 'DELETE'
        });
        if (response.status === 200) {
            populatePerson();
            alert("Delete with sucess");
        }
        else{
            alert("An error occured");
        }
    }
    async function populatePerson() {
        const response = await fetch('https://localhost:7009/api/Person');
        const data = await response.json();
        setPersons(data);
    }
    function updatePerson(personId){
        let path = '/person/update/'+personId;
        navigate(path);
    }
}

export default GetAll;