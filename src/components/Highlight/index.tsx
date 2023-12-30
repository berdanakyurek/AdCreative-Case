interface HighlightProps {
  fullString: string;
  matchString: string;
}

// fullString içerisinde matchString'leri bulup highlight edilmiş halde gösteren component
const Highlight = (props: HighlightProps):JSX.Element => {

  let fullString = props.fullString.trim();
  let matchString = props.matchString.trim();

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
  let matchStringUpper = matchString.toUpperCase();

  let res = [];
  
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
