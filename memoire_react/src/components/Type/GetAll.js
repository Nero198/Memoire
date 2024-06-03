import {useEffect, useState} from "react";
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";

function GetAll() {
    const [types, setTypes] = useState();

    let navigate = useNavigate();
    
    useEffect(() => {
        populateType();
    }, []);

    const contents = types === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
            <tr>
            <th>Id</th>
            <th>Label</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {types.map((type) =>
                <tr key={type.id}>
                    <td>{type.id}</td>
                    <td>{type.label}</td>
                    <td>
                        <button onClick={() => updateType(type.id)}><i>Update</i></button>
                    </td>
                    <td>
                        <button onClick={(async) => deleteType(type.id)}><i>Delete</i></button>
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
    async function deleteType (typeId) {
        const response = await fetch('https://localhost:7009/api/Type/'+typeId, {
            method: 'DELETE'
        });
        if (response.status === 200) {
            populateType();
            alert("Delete with sucess");
        }
        else{
            alert("An error occured");
        }
    }
    async function populateType() {
        const response = await fetch('https://localhost:7009/api/Type');
        const data = await response.json();
        setTypes(data);
    }
    function updateType(typeId){
        let path = '/Type/update/'+typeId;
        navigate(path);
    }
}

export default GetAll;