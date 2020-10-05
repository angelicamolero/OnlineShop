import React from 'react';

const Categories = () => {
    return(
        <div class="container">
        <div class="row contact-headline">
            <h3>Choose a Category</h3>
        </div>
        <div class="row categories">
          <div class="category left">
             <button>Captus</button>
          </div>
          <div class="category">
              <button>Big Leaf</button>
          </div>
          <div class="category">
              <button>Others</button>
          </div>
       </div>
 </div>
    );
}

export default Categories;