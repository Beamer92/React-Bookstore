import React, {Component} from 'react'
import axios from 'axios';

class AddBook extends Component{
  constructor(props){
    super(props)

    this.state={
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

  submitAdd = async(event) => {
    event.preventDefault()
    try{
      if(Object.values(this.state).indexOf('') > -1){
        alert("Must Completely Fill Out Form to Add Book")
      }
      else{
        const newBook = this.state
        await axios.post(`${process.env.REACT_APP_API_SERVER}books`, newBook)
        this.props.getBooks()
        this.setState({
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

  render(){
  return(
  <form name='add' onSubmit={this.submitAdd}>
    <h4>Add Book To Shelves</h4>
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