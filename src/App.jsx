
import './App.css'
import Autocomplete from './components/autocomplete'

function App() {

  const rowData = [
    { firstName: "Alexis", lastName: "Bonal" },
    { firstName: "Engueran", lastName: "Raoult" },
    { firstName: "Guillaume", lastName: "Stringer" },
    { firstName: "Quentin", lastName: "Granssard" },
    { firstName: "Antoine", lastName: "Gaudry" },
    { firstName: "Arthur", lastName: "Wdubbei" },
    { firstName: "Robin", lastName: "Thomas" },
    { firstName: "Gabin", lastName: "Demorgny" },
  ];

  const searchData = (term) => {
    return rowData.filter((item) =>
      item.firstName.toLowerCase().includes(term.toLowerCase()) ||
      item.lastName.toLowerCase().includes(term.toLowerCase())
    );
  };

  const search = async (term) => {
    
    const response = await fetch(`http://localhost:3000/user/1`, {
      method: "POST",
      body: JSON.stringify({ terms: [term] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data.data.map(element => {return {...element, label: element.firstName + " " + element.lastName}});  }

  const searchProduct  = async (term) => {
    
    const response = await fetch(`http://localhost:3000/product/1`, {
      method: "POST",
      body: JSON.stringify({ terms: [term] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data.data.map(element => {return {...element, label: element.name + " " + element.price}});
  }

  return (
    <>
      <h2>1. Autocomplete user simple avec data en props</h2>
      <Autocomplete OnSearch={searchData} multiple={false}/>
      <h2>2. Autocomplete User simple avec data en fonction</h2>
      <Autocomplete OnSearch={search} multiple={false}/>
      <h2>3. Autocomplete User multiple avec data en fonction</h2>
      <Autocomplete OnSearch={searchData} multiple={true}/>
      <h2>4. Autocomplete Product simple avec data en fonction</h2>
      <Autocomplete OnSearch={searchProduct} multiple={true}/>

    </>
  )
}

export default App
