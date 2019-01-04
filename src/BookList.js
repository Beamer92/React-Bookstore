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
        {id: 0, price: 0, title: 'placeholder'}
      ]
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  //filter state title and author here via: https://stackoverflow.com/questions/44412242/how-can-i-apply-multiple-filters-in-react
  getBooks = async() => {
    try{
      const result = await axios.get('http://localhost:8082/api/books')
 
      this.setState ({
        bookList: result.data,
        cart: result.data.filter(x => x.inCart === true)
      })
    } catch(err) {
      console.log(err)
    }
  }

  addToCart = async(id) => {
    try{
      await axios.patch(`http://localhost:8082/api/books/cart/add/${id}`)
      this.getBooks()
    } catch(err) {
      console.log(err)
    }
  }

  handleFilter = (event) => {
    console.log('yep')
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <div className='container'>
        <div className='row'>
        <div className='col-md-9 col-sm-9'>
        <input type="text" id="searchBar" placeholder="Search for Books.."></input>
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
            {this.state.bookList.map(book => {
            return <Book key={book.id} {...book} addToCart={() => this.addToCart(book.id)}/>
          })}
          </tbody>
        </table>
        </div>
        <div id='cart' className='col-md-3 col-sm-3'>
          <h1>Cart</h1>
          {this.state.cart.map(cartBook => {
            return <Cart key={cartBook.id} price={cartBook.price} title={cartBook.title}/>
          })}
          <h3>Total: &#36;{this.state.cart.reduce((a,b) => a+b.price, 0)}</h3>
        </div>
        </div>
      </div>
    )
  }


}

export default BookList