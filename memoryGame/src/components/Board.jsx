import {useState, useEffect} from 'react';

export default function Board() {

    const url = "https://rickandmortyapi.com/api/character";
    const [count, setCount] = useState(0);
    const [list, updateList] = useState([]);
    const [characters, setCharacters] = useState(null);


    function handleClick (id) {
        const cl = characters.filter((item)=>item.id == id);
        for (let x = 0; x < list.length; x++)
        {
            if (list[x].id === id)
            {
                setCount(0);
                updateList([]);
                return;
            }
        }
        setCount(count+1);
        updateList([...list, cl[0]]);
    }

    useEffect(()=> {
     
       fetch(url)
           .then((data) => {
                return data.json();
            })
            .then((info)=> {
                let arr = [];
                for (let x = 0; x< 10; x++)
                {
                    arr.push(info.results[x]);
                }
                setCharacters(arr);         
            })
           
    }, []);
    
    
    useEffect(()=> {
        let gimp;
        let copy = characters;
        if (copy!=null)
        { gimp = copy.sort(() => Math.random() - 0.5);
         }
        setCharacters(gimp);
        
       
        
        

        
    }, [characters, list] );

    

        return (<>
        
            <h1>Memory Game</h1>
            <div> Get points for clicking on an image, but don<span>&#39;</span>t click on it more than once.</div>
            <div className = "score">Score: {count}</div>
         <div className='pictures'>
                {!characters && <h3>loading...</h3>}
                {characters!=null && 
                    characters.map((item)=> {
                        return (
                            <div key = {item.name} id = "imageContainer">
                            
                                <img src = {item.image} id = "characters" onClick={()=> handleClick(item.id)}></img>
                                <div id = "caption">{item.name}</div>
                            </div>
                        )
                    })
                
                }
         </div>     
         
    
        </>)
}