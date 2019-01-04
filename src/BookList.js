import React, {Component} from 'react'
import Book from './Book'
import Cart from './Cart'
import axios from 'axios'

class BookList extends Component {
  constructor(props){
    super(props)

    this.state ={
      filterTitle: '',
      filterAuthor: '',
      bookList: [
        {id: 0, inCart: false, pages:0, title: 'placeholder', author: 'Nobody', price: 0}
      ],
      cart: [
        {id: 0, price: 0, title: 'placeholder', qty: 0}
      ],
      toDelete: 0
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  getCart = (list, cqs) => {
    const ourCart = list.filter(x => x.inCart === true).map(x=> {
      if(cqs !== []){
        const thisQty = cqs.find(q => q.id === x.id)
        return {id: x.id, price: x.price, title: x.title, qty: thisQty ? thisQty.qty : 1}
      }
      return {id: x.id, price: x.price, title: x.title, qty: 1}
    })
    return ourCart
  }

  //filter state title and author here via: https://stackoverflow.com/questions/44412242/how-can-i-apply-multiple-filters-in-react
  getBooks = async(cqs = []) => {
    try{
      const result = await axios.get('http://localhost:8082/api/books')
      const cartList = this.getCart(result.data, cqs)
      this.setState ({
        bookList: result.data,
        cart: cartList,
        toDelete: 0
      })
    } catch(err) {
      console.log(err)
    }
  }

  addToCart = async(id) => {
    try{
      if(this.state.cart.find(x=> x.id === id)){
        const loadCart = this.state.cart.map(x=> {
            if(x.id === id){
              x.qty++
            }
          return x
        })

        this.setState({
          cart: loadCart,
          toDelete: 0
        })
      }
      else{
        await axios.patch(`http://localhost:8082/api/books/cart/add/${id}`)
        this.getBooks(this.state.cart)
      }
    } catch(err) {
      console.log(err)
    }
  }

  removeFromCart = async(id) => {
    try {
      await axios.patch(`http://localhost:8082/api/books/cart/remove/${id}`)
      const curCart = this.state.cart.filter(x => x.id !== id)
      this.getBooks(curCart)
    } catch(err) {
      console.log(err)
    }
  }

  handleFilter = (event) => {
    this.setState({
      [event.target.name]: event.target.value.toLowerCase()
    })
  }

  get bookList() {
    return this.state.bookList.filter(x=> (x.title.toLowerCase()).includes(this.state.filterTitle))
      .filter(y=> (y.author.toLowerCase()).includes(this.state.filterAuthor))
  }

  handleToDelete = (event)=> {
    this.setState({
      toDelete: event.target.value
    })
  }

  removeFromLibrary = async(event) => {
    event.preventDefault()
    try {
      await axios.delete(`http://localhost:8082/api/books/${this.state.toDelete}`)
      const curCart = this.state.cart.filter(x => x.id !== this.state.toDelete)
      this.getBooks(curCart)
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
        <div className='col-md-9 col-sm-9'>
        {/* <input type="text" id="searchBar" placeholder="Search for Books.."></input> */}
        <table>
          <thead>
            <tr className='header'>
            <th>Title <input type='text' id='filterTitle' placeholder='Filter By Title' name='filterTitle' onChange={this.handleFilter}></input></th>
            <th>Author <input type='text' id='filterTitle' placeholder='Filter By Author' name='filterAuthor' onChange={this.handleFilter}></input></th>
            <th>Pages</th>
            <th>Price</th>
            <th>Add To Cart</th>
            </tr>
          </thead>
         <tbody>
            {this.bookList.map(book => {
            return <Book key={book.id} {...book} addToCart={() => this.addToCart(book.id)}/>
          })}
          </tbody>
        </table>
        </div>
        <div id='cart' className='col-md-3 col-sm-3'>
          <h1>Cart</h1>
          {this.state.cart.map(cartBook => {
            return <Cart key={cartBook.id} price={cartBook.price} title={cartBook.title} qty={cartBook.qty} removeFromCart={() => this.removeFromCart(cartBook.id)}/>
          })}
          <h3>Total: &#36;{this.state.cart.reduce((a,b) => a+(b.price * b.qty), 0)}</h3>
        </div>
        </div>
          <br/><br/><br/>

        <div name='Admins'>
        ----------------------------------------ADMINS ONLY BELOW THIS LINE ----------------------------------------------------
        <br/><br/>
          <label htmlFor='delete'>BookID &nbsp;</label>
          <input type='number' name='delete' value={this.state.toDelete} onChange={this.handleToDelete}></input>
          <button className='btn btn-danger' onClick={this.removeFromLibrary}>Del</button>
        </div>
      </div>
    )
  }


}

export default BookList