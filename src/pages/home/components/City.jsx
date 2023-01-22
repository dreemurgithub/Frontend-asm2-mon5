export default function City({danang, hanoi, hcm}) {
  const city_list = [
    {
      name: "Da Nang",
      subText: `${danang} properties`,
      image: "./images/Da_Nang.jpg",
    },
    {
      name: "Ha Noi",
      subText: `${hanoi} properties`,
      image: "./images/Ha_Noi.jpg",
    },
    {
      name: "HCM",
      subText: `${hcm} properties`,
      image: "./images/HCM.jpg",
    },
  ];
  return (
    <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr'
        
      }}>
      {city_list.map((obj)=>{
        return <CITY_RETURN name={obj.name} url={obj.image} subText={obj.subText} />
      })}
      
    </div>
  );
}
function CITY_RETURN(props){
    let background_Image=`url(${props.url})`
    return (
        <>
          <div
            style={{
              backgroundImage: background_Image,
              backgroundRepeat:'no-repeat',
              backgroundSize: "contain",
              height:'10em'
            }}
          >
            <div style={{
                color:'white',
                marginLeft:'1em'
            }}>   
              <h3>{props.name}</h3>
              <p>{props.subText}</p>
            </div>
          </div>
        </>)
}