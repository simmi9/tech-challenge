import React from 'react';
import ReactDOM from 'react-dom';
import Select from "react-select";

export class Mainpage extends React.Component {

	state = {
		users:[],
		isUserChanged:false,
		albums:[],
		albumOptions:[],
		isAlbumChanged:false,  
		photos:[],
		loading:false
	}

		userChange = (e) =>{
			this.setState({ isUserChanged: false});   
			if(e.target.value){     
			let albumOpts = [];
			for(let i=0; i<this.state.albums.length;i++){  
				if(this.state.albums[i].userId === Number(e.target.value)){    
					albumOpts.push(<option key={this.state.albums[i].id} value={this.state.albums[i].id}> {this.state.albums[i].title} </option>);
				}
			}
	   			this.setState({ isUserChanged: true, albumOptions: albumOpts});
	   			console.log(this.state.albums)    
	   		}  
  
		}  



	//using Component Life Cycle Methods
	async componentDidMount() {
		this.setState({loading:true});
		const req = await fetch('https://jsonplaceholder.typicode.com/users');
		const resJson = await req.json();
		let userOpts = [];  

		for(let i=0; i<resJson.length;i++){
		userOpts.push(<option key={resJson[i].id} value={resJson[i].id}> {resJson[i].name} </option>);
			}
	   	this.setState({users: userOpts});  
		const req1 = await fetch('https://jsonplaceholder.typicode.com/albums');
		const resJson1 = await req1.json(); 

		const req2 = await fetch('https://jsonplaceholder.typicode.com/photos');
		const resJson2 = await req2.json();
       	let albumOpts = [];
	      
	    this.setState({albums: resJson1 , photos: resJson2, loading:false });  
	    albumOpts.push(<option key={this.state.albums[0].id} value={this.state.albums[0].id}> {this.state.albums[0].title} </option>);
	    this.setState({isAlbumChanged:true,albumOptions: albumOpts});       
   
	}




	componentDidUpdate() {
			console.log("The component just updated")
		}

	render() {
		return (
			<div className='main-page'>  
						<select
			            clearable={false}
			            onChange={this.userChange}
			            className="user-select">
			            {this.state.users}
			            </select>  

			            {
			            	(this.state.isUserChanged || this.state.isAlbumChanged)?     
			            	<select  
			            clearable={false} 
			            className="user-select">    
			            {this.state.albumOptions}    
			            </select>  :''
			            }
			</div>
		)
	}
}  