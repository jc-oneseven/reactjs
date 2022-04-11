import Card from "./Card";
import Header from "./Header";

import { Data } from "./Data";

const App = () => {
  return (
    <div className="page">
      <Header />
      <div className="page--content">
        {Data.map((item) => {
          return <Card key={item.id} travelData={item} />;
        })}
      </div>
    </div>
  );
};

export default App;
