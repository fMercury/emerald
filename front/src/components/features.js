import React from 'react'

const Features = ({ features }) => {
    return (
        <div>
            <center><h1>Property Features List</h1></center>
            {features.map((feature) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{feature.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{'Featue ID: ' +feature.id}</h6>
                        <p class="card-text">{feature.icon}</p>
                    </div>
                </div>
            ))}
        </div>

    )
};

export default Features