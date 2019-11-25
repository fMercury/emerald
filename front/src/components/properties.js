import React from 'react'

const Properties = ({ properties }) => {
    return (
        <div>
            <center><h1>Properties List</h1></center>
            {properties.map((property) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{property.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{property.main_image_text}</h6>
                        <p class="card-text">{'Property ID: '+property.id}</p>
                        <p class="card-text">{'Description: '+property.description}</p>
                    </div>
                </div>
            ))}
        </div>
        
    )
};

export default Properties