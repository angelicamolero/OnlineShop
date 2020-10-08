import React from 'react';
import {Link} from 'react-router-dom';


const Categories = () => {

    return(
        <div className="container">
        <div className="row contact-headline">
            <h3>Choose a Category</h3>
        </div>
        <div className="row categories">
          <div className="category left">
                <Link
                    to={`/categories/captus`}
                >
                    <button
                    >Captus</button>
                </Link>
          </div>
          <div className="category">
                <Link
                    to={`/categories/leaf`}
                >
                    <button>Big Leaf</button>
                </Link>
          </div>
          <div className="category">
                <Link
                    to={`/categories/others`}
                >
                    <button>Others</button>
                </Link>
          </div>
       </div>
 </div>
    );
}

export default Categories;