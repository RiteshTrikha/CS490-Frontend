import React from 'react';
import TopMovies from "../components/TopMovies";
import TopActors from "../components/TopActors";


function IndexPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <TopMovies />
        </div>
        <div className="col-lg-6">
          <TopActors />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
