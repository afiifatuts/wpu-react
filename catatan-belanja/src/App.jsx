import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },
];

export default function App() {
  //lifting state up
  const [items, setItems] = useState(groceryItems)

  function handleAddItems(item){
    setItems([...items,item])
  }

  function handleDeleteItem(id) {
    setItems((items)=>items.filter((item)=>item.id !==id))
  }

  return (<div className="app">
    <Header/>
    <Form onAddItem={handleAddItems}/>
    <GroceryList items={items} onDeleteItem={handleDeleteItem}/>
    <Footer/>
  </div>
  )
}


function Header() {
  return <h1>Catatan Belanjaku 📝</h1>
}

function Form({onAddItem}) {

  const [name, setName] = useState('')
  const [qty, setQty] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    if(!name){
      return
    }
    const newItem = {name:name,qty:qty, checked:false,id:Date.now()}
    onAddItem(newItem)

    // console.log(newItem);

    setName('')
    setQty(1)

  }

  const qtyNum = [...Array(20)].map((_,i)=>(
    <option value={i+1} key={i+1}>{i+1}</option>
  ))

  return (
  <form className="add-form" onSubmit={handleSubmit}>
  <h3>Hari ini belanja apa kita?</h3>
  <div>
    <select value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
      {qtyNum}
    </select>
    <input type="text" placeholder="nama barang..." autoFocus value={name} onChange={(e)=>setName(e.target.value)} />
  </div>
  <button>Tambah</button>
</form>);
}

function GroceryList({items,onDeleteItem}) {
  return (<>
  <div className="list">
      <ul>
        {items.map((item)=>(
         <Item item={item} key={item.id} onDeleteItem={onDeleteItem}/>
        ))}
        
      </ul>
    </div>
    <div className="actions">
      <select>
        <option value="input">Urutkan berdasarkan urutan input</option>
        <option value="name">Urutkan berdasarkan nama barang</option>
        <option value="checked">Urutkan berdasarkan ceklis</option>
      </select>
      <button >Bersihkan Daftar</button>
    </div>
    </>)
}

function Item({item,onDeleteItem}) {
  return (
    <li key={item.id}>
    <input type="checkbox" />
    <span style={ item.checked ? {textDecoration:'line-through'}:{}}>

      {item.quantity} {item.name}
      </span>
    <button onClick={()=>onDeleteItem(item.id)}>&times;</button>
  </li>
  )
}

function Footer() {
  return (<footer className="stats">Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>)
}