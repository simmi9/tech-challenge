import React from 'react';
import ReactDOM from 'react-dom';
import Select from "react-select";
import {Photogrid} from "./Photogrid";  

export class Mainpage extends React.Component {

	state = {
		users:[],
		isUserChanged:false,
		albums:[],
		albumOptions:[],
		isAlbumChanged:false,  
		photos:[],
		currentPhotos:[],
		loading:false
	}

		userChange = (e) =>{
			this.setState({ isUserChanged: false});   
			if(e.target.value){     
			let albumOpts = [];
			let curPhotos = [];  
			for(let i=0; i<this.state.albums.length;i++){  
				if(this.state.albums[i].userId === Number(e.target.value)){    
					albumOpts.push(<option key={this.state.albums[i].id} value={this.state.albums[i].id}> {this.state.albums[i].title} </option>);

					this.state.photos.forEach(photo => {
						if(photo.albumId === Number(this.state.albums[i].id)){  
							curPhotos.push(photo);
						}   
	   				}) ;

				}
			}
			this.setState({ isUserChanged: true, albumOptions: albumOpts, isAlbumChanged: true, currentPhotos: curPhotos});     
	   		}  
		}  

		albumChange = (e) => {    
			this.setState({ isAlbumChanged: false});   
				if(e.target.value){  
					let curPhotos=[];  
					this.state.photos.forEach(photo => {
						if(photo.albumId === Number(e.target.value)){  
							curPhotos.push(photo);
						}
				}); 
	     console.log(curPhotos);    
	   			this.setState({ isAlbumChanged: true, currentPhotos: curPhotos}); 
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

		let curPhotos=[];  
		this.state.photos.forEach(photo => {
			if(photo.albumId === this.state.albums[0].id){
				curPhotos.push(photo);
			}
		});  

	   	this.setState({currentPhotos: curPhotos});    
	}




	componentDidUpdate() {
			console.log("The component just updated")
		}

	render() {
		return (<section>
			<div className="jumbotron">
		        <h1>Say Cheese.....!!!!</h1>      
		         <p>A Simple web app that allows a user to see their albums and its' associated photographs</p>    
		    </div>    
			<div className='main-page'>  
				<div className="select-containers">  
							<div className="user-select-container">
							<h3 className="user-select-container-title">Select User:</h3>     
							<select clearable={false}
				            		onChange={this.userChange}
				            		className="user-select">
				            		{this.state.users}
				            </select>  
				            </div>   

				            {
				            	(this.state.isUserChanged || this.state.isAlbumChanged)?     
				            	<div class="album-select-container">
									<h3 class="album-select-container-title">Select Album:</h3>  
									<select  clearable={false} 
						            		 onChange={this.albumChange}  
						                     className="user-select">      
						               {this.state.albumOptions}    
						            </select> 
						         </div> :''    

				            }      
				     </div>  
			</div>
			{
			  this.state.isAlbumChanged? <Photogrid className="photo-grid" photos={this.state.currentPhotos}/>: 'no photos available'     
			      }  
			</section>    
		)
	}
}  