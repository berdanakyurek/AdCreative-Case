interface HighlightProps {
  fullString: string;
  matchString: string;
}

// fullString içerisinde matchString'leri bulup highlight edilmiş halde gösteren component
const Highlight = (props: HighlightProps):JSX.Element => {


  // gereksiz bosluklari at 
  let fullString = props.fullString.trim();
  let matchString = props.matchString.trim();

  // highliht edilecek string yoksa direk stringi dondur 
  if(!matchString)
    return (
      <div>
        <span
          style={{
            fontWeight: 400,
          }}
        >
          {fullString}
        </span>
      </div>
    )

  // case-insensitive yapmak icin uppercase'e cevir 
  let matchStringUpper = matchString.toUpperCase();

  let res = [];

  // string icerisinde highlight edilecek kisimlari bul 
  while (true) {
    let fullStringUpper = fullString.toUpperCase();
    let index = fullStringUpper.search(matchStringUpper);
    if(index == -1){
      if(fullString.length > 1)
        res.push({
          highlight: false,
          val: fullString
        });
      break;
    }

    if(index == 0) {
      res.push({
        highlight: true,
        val: fullString.slice(0, matchStringUpper.length)
      });
      fullString = fullString.slice(matchStringUpper.length);
    }
    else {
      res.push({
        highlight: false,
        val: fullString.slice(0, index)
      });
      fullString = fullString.slice(index);
    }

  }

  // highliht edilmis div componentini dondur 
  return (
    <div>
      {res.map(r =>
        <span
          style={{
            fontWeight: r.highlight ? 700 : 400,
          }}
        >
          {r.val}
        </span>
      )}
    </div>
  )
}

export default Highlight;
