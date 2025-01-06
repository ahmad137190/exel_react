import React, {useState} from 'react';
import axios from 'axios';

function App() {
    console.log(this)
    const [file, setFile] = useState(null);
   // const [BaseUrl, setBaseUrl] = useState("http://localhost:5000");
    const [BaseUrl, setBaseUrl] = useState("https://exel-nodejs-backend.onrender.com");
    const [searchCriteria, setSearchCriteria] = useState({});
    const [newData, setNewData] = useState({});
    const [result, setResult] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleFileUpload = async () => {

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(BaseUrl+'/file-upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });

            console.log(response.data);


    };

    const handleSearchOrAdd = async () => {
        if(searchCriteria.Name?.length>0 && searchCriteria.LastName?.length>0){
            const response = await axios.post(BaseUrl+'/search-or-add', {
                filePath: 'uploads/data.xlsx',
                searchCriteria,
                newData,
            });
            //if(response.data?.item?.Name)
            setVisible(true);
            //  alert(response.data?.exit)
            if(response.data?.exit){
                // alert(response.data?.item)
                setSearchCriteria(response.data?.item)
            }
            setResult(response.data);
        }else {
            alert("Entering the first and last name is required")
        }

    };
    const handleUpdate = async () => {
        const response = await axios.post(BaseUrl+'/search-or-add', {
            filePath: 'uploads/data.xlsx',
            searchCriteria,
            newData,
            update:true,
        });
        setVisible(false);
        setResult(response.data);
    };

    return (
        <div>
            <h1>Excel File Management</h1>

            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
            />
            <button onClick={handleFileUpload}>Upload File</button>

            <h2>Search or Add</h2>
            <input
                required
                type="text"
                placeholder="Name"
                disabled ={visible}
                onChange={e => setSearchCriteria({...searchCriteria, Name: e.target.value})}

                value={searchCriteria?.Name}
            />
            <input
                required
                type="text"
                placeholder="LastName"
                disabled ={visible}

                onChange={e => setSearchCriteria({...searchCriteria, LastName: e.target.value})}
                value={searchCriteria?.LastName}

            />
            {
                visible && <input
                    required
                    type="text"
                    placeholder="IdNumber"
                    onChange={e => setSearchCriteria({...searchCriteria, IdNumber: e.target.value})}
                value={searchCriteria?.IdNumber}
                />
            }

            {
                visible &&
                <input
                    required
                    type="text"
                    placeholder="NumberPhone"
                    onChange={e => setSearchCriteria({...searchCriteria, NumberPhone: e.target.value})}
                    value={searchCriteria?.NumberPhone}

                />
            }
            {
                !visible &&
                <button onClick={() => {
                    setVisible(false);
                    handleSearchOrAdd()

                }}>Search or Add
                </button>
            }
            {
                visible &&
                <button onClick={() => {
                    setVisible(false);
                    handleUpdate()

                }}>Update
                </button>
            }

            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default App;
