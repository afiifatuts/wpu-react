/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import GroceryList from "./GroceryList";
import Footer from "./Footer";

const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    qty: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    qty: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    qty: 3,
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

  function handleToggleItem(id) {
    setItems((items)=>items.map((item)=>item.id===id?{...item,checked:!item.checked}:item))
  }

  function handleClearItems() {
    setItems([])
  }

  return (<div className="app">
    <Header/>
    <Form onAddItem={handleAddItems}/>
    <GroceryList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
    <Footer items={items}/>
  </div>
  )
}






