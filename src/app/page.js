import React from "react";
import NewHeader from "./components/NewHeader";
import NewFeed from "./components/NewFeed";

const HomePage = () => {
  return (
    <div className="mt-4">
      <NewHeader />
      <NewFeed />
    </div>
  );
};

export default HomePage;
