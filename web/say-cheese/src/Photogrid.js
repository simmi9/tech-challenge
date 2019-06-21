
import React from 'react';
import ReactDOM from 'react-dom';

export class Photogrid extends React.Component{

render(){

const { photos } = this.props

return ( <section class="grid-section">
			<div className="grid-container">  
			{  
				photos.map((photo,i) =><div key={i}>    
										<img src={photo.url} alt={photo.title}/> 
										<p> {photo.title} </p>   
									</div>   
							
							)  
			}
			</div> 
			</section>  
		)  
}

}     
