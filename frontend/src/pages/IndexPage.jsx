import React from 'react';
import TopMovies from "./TopMovies";
import TopActors from "./TopActors";
import { useParams } from 'react-router-dom';

function IndexPage() {
  const { storeId } = useParams(); // Retrieve the store ID from the URL params

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <TopMovies storeId={storeId} /> {/* Pass the store ID as a prop */}
        </div>
        <div className="col-lg-6">
          <TopActors />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
