import React from "react";
import '../style/Homepage.css';

export default function Homepage() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // fetch("/test")
    //   .then((res) => res.json())
    //   .then((data) => setData(data.message));
    fetch("/dates",
      {
        method: "POST",
      })
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}
  