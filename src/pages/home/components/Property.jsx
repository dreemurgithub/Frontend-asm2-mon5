export default function Property({hotel, aparment, villas, resorts,cabin}) {
  const data = [
    {
      name: "Hotels",
      count: `${hotel}`,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: `${aparment}`,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: `${resorts}`,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: `${villas}`,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: `${cabin}`,
      image: "./images/type_5.jpg",
    },
  ];
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gridAutoRows: "1fr",
        }}
      >
        {data.map((obj) => {
          return (
            <HOME_RETURN name={obj.name} image={obj.image} count={obj.count} />
          );
        })}
      </div>
      
    </>
  );
}
function HOME_RETURN(props) {
  return (
    <>
      <div>
        
        <img
          src={props.image}
          alt=""
          style={{
            maxWidth:'15em',
            height:'15em'
          }}
        />
        <h3>{props.name}</h3>
        <p>{props.count}</p>
      </div>
    </>
  );
}
