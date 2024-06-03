import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function GetAll() {
    const [publishinghouses, setPublishingHouses] = useState();

    let navigate = useNavigate();
    
    useEffect(() => {
        populatePublishingHouse();
    }, []);

    const contents = publishinghouses === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Start year</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {publishinghouses.map((publishinghouse) =>
                <tr key={publishinghouse.id}>
                    <td>{publishinghouse.id}</td>
                    <td>{publishinghouse.name}</td>
                    <td>{publishinghouse.startYear}</td>
                    <td>
                        <button onClick={() => updatePublishingHouse(publishinghouse.id)}><i>Update</i></button>
                    </td>
                    <td>
                        <button onClick={(async) => deletePublishingHouse(publishinghouse.id)}><i>Delete</i></button>
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
    async function deletePublishingHouse (publishinghouseId) {
        const response = await fetch('https://localhost:7009/api/PublishingHouse/'+publishinghouseId, {
            method: 'DELETE'
        });
        if (response.status === 200) {
            populatePublishingHouse();
            alert("Delete with sucess");
        }
        else{
            alert("An error occured");
        }
    }
    async function populatePublishingHouse() {
        const response = await fetch('https://localhost:7009/api/PublishingHouse');
        const data = await response.json();
        setPublishingHouses(data);
    }
    function updatePublishingHouse(publishinghouseId){
        let path = '/PublishingHouse/update/'+publishinghouseId;
        navigate(path);
    }
}

export default GetAll;