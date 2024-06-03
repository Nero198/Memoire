import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetAll() {
    const [books, setBooks] = useState([]);
    const [publishingHouses, setPublishingHouses] = useState([]);
    const [persons, setPersons] = useState([]);
    const [types, setTypes] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        const populateBook = async () => {
            try {
                const response = await fetch('https://localhost:7009/api/book');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

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

        populateBook();
        fetchPublishingHouses();
        fetchPersons();
        fetchTypes();
    }, []);

    const getPublishingHouseName = (id) => {
        const house = publishingHouses.find((house) => house.id === id);
        return house ? house.name : 'Unknown';
    };

    const getPersonName = (id) => {
        const person = persons.find((person) => person.id === id);
        return person ? `${person.firstname} ${person.lastname}` : 'Unknown';
    };

    const getTypeName = (id) => {
        const type = types.find((type) => type.id === id);
        return type ? type.label : 'Unknown';
    };

    const contents = books.length === 0
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Publishing House</th>
                    <th>Person</th>
                    <th>Type</th>
                    <th>Release Year</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{getPublishingHouseName(book.publishingHouseId)}</td>
                        <td>{getPersonName(book.personId)}</td>
                        <td>{getTypeName(book.typeId)}</td>
                        <td>{book.releaseYear}</td>
                        <td>
                            <button onClick={() => updateBook(book.id)}>Update</button>
                        </td>
                        <td>
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>;

    const deleteBook = async (bookId) => {
        try {
            const response = await fetch(`https://localhost:7009/api/Book/${bookId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                setBooks(books.filter(book => book.id !== bookId));
                alert("Deleted successfully");
            } else {
                alert("An error occurred");
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            alert("An error occurred");
        }
    };

    const updateBook = (bookId) => {
        let path = `/book/update/${bookId}`;
        navigate(path);
    };

    return (
        <div>
            <h1 id="tabelLabel">Book List</h1>
            {contents}
        </div>
    );
}

export default GetAll;
