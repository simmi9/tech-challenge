
import React from 'react';
import ReactDOM from 'react-dom';

export class Photogrid extends React.Component{

render(){

const { photos } = this.props

return ( <section class="grid-section">
			<div className='flex-grid'>
			{  
				photos.map((photo,i) =><div key={i} className="col">    
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
