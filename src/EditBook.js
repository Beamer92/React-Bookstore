import React, {Component} from 'react'
import axios from 'axios';

class AddBook extends Component{
  constructor(props){
    super(props)

    this.state={
      id: '0',
      title: '',
      subtitle: '',
      author: '',
      description: '',
      published: '',
      publisher: '',
      pages: 0,
      website: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  submitEdit = async(event) => {
    event.preventDefault()
    try{
      if(Object.values(this.state).indexOf('') > -1){
        alert("Edit fields cannot be blank!")
      }
      else{
        const editBook = this.state
        await axios.put(`${process.env.REACT_APP_API_SERVER}books/${editBook.id}`, editBook)
        this.props.getBooks()
        this.setState({
          id: 0,
          title: '',
          subtitle: '',
          author: '',
          description: '',
          published: '',
          publisher: '',
          pages: 0,
          website: ''
        })
      }
    } catch(err) {
      console.log(err)
    }
  }


  handleIDChange = async (event) => {
    const id = event.target.value
    const result = await axios.get(`${process.env.REACT_APP_API_SERVER}books/${id}`)
    this.setState({
      id: id,
      title: result.data.title,
      subtitle: result.data.subtitle,
      author: result.data.author,
      description: result.data.description,
      published: result.data.published,
      publisher: result.data.publisher,
      pages: result.data.pages,
      website: result.data.website
    })
  }

  render(){
  return(
  <form name='add' onSubmit={this.submitEdit}>
    <h4>Edit Book</h4>
    <div className="form-group">
      <select key={this.state.id + 's'} value={this.state.id} onChange={this.handleIDChange}>
        <option key={0} value={0}>0</option>
       {this.props.ids.map(x=> {return <option key={x} value={x}>{x}</option>})}
      </select>
    </div>
    <div className="form-group">
      <input type="text" placeholder="title" name='title' value={this.state.title} onChange={this.handleChange}></input>&nbsp;
      <input type="text" placeholder="subtitle" name="subtitle" value={this.state.subtitle} onChange={this.handleChange}></input>&nbsp;
      <input type="text" placeholder="author" name='author' value={this.state.author} onChange={this.handleChange}></input>
    </div>
    <div className="form-group">
      <input type="text" placeholder="description" name="description" value={this.state.description} onChange={this.handleChange}></input>
    </div>
    <div className="form-group">
      <input type="text" placeholder="published" name="published" value={this.state.published} onChange={this.handleChange}></input>&nbsp;
      <input type="text" placeholder="publisher" name="publisher" value={this.state.publisher} onChange={this.handleChange}></input>
    </div>
    <div className='form-group'>
      <input type="number" placeholder="pages" name="pages" value={this.state.pages} onChange={this.handleChange}></input>&nbsp;
      <input type="text" placeholder="website" name="website" value={this.state.website} onChange={this.handleChange}></input>
    </div>
    <input type='submit'className="btn btn-primary" value='Submit'></input>
  </form>
  )}
}

export default AddBook