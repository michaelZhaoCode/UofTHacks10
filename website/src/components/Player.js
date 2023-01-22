//TODO: use Material UI (from videos)

import { useContext, useEffect, useState, useNavigate } from 'react'
import Select from 'react-select'
import { Container } from '@material-ui/core'
import { AppContext, AppContextProvider } from './Context'
import axios from 'axios';


const Player = ({ player, docID }) => { //onDelete is a function passed up (to the parent file)
    //onDelete = passed up (executed in parent func) while task = passed down (executed here)
    const { colors, setColors, players, setPlayers } = useContext(AppContext)
    //const docRef = doc(db, 'users', auth.doc)
    // use Axios to connect to cloud functions, which connects to firestore
    // getcolors (getdoc from firestore), setcolors (updatedoc)
    // URL => Axios side 

    const [postColorURL, setPostColorURL] = useState('');
    const [colorsDisabled, setcolorsDisabled] = useState([]);
    const [getColorURL] = useState(`https://us-central1-gamelobby-ecdf4.cloudfunctions.net/getColor?text=${docID}`);

    // user's saved colors
    useEffect(() => {
        colors.forEach((color)=>{
            color.disabled = false;
        })
        console.log(docID);
        axios.get(getColorURL)
            .then(response => {
                const playerColors = response.data.result
                setPlayers([{
                    id: 1,
                    color: playerColors[0]
                },
                {
                    id: 2,
                    color: playerColors[1]
                },
                {
                    id: 3,
                    color: playerColors[2]
                },
                {
                    id: 4,
                    color: playerColors[3]
                }])

                // disable the player colors saved from the firestore in the first render (when I use setstates sequentially instead of this approach, it only rerenders the changes made in the last setstate -> error)
                if (playerColors.includes('red')) {
                    colors[0].disabled = true;
                }
                if (playerColors.includes('blue')) {
                    colors[1].disabled = true;
                }
                if (playerColors.includes('green')) {
                    colors[2].disabled = true;
                }
                if (playerColors.includes('purple')) {
                    colors[3].disabled = true;
                }

            })
            .catch(error => {
                // Handle any errors
            });

    }, [])


    // map through colors and find the color whose color.value == e.value THEN color.disabled = true
    useEffect(() => {
        console.log("color Disabled: ", colorsDisabled);
        // ***********************ERROR: ONLY THE LAST ELEMENT in colorsDisabled is being disabled in the beginning. 
        // All colors in colorsDisabled should be disabled
        for (let i = 0; i < colorsDisabled.length; i++) {
            if (colorsDisabled[i] !== 'white') {
                setColors(
                    colors.map((color) =>
                        color.value === colorsDisabled[i] ? { ...color, disabled: true } : color
                    )
                )
            }
            console.log(colorsDisabled[i], " has been disabled", colors)
        }
    }, [colorsDisabled])

    useEffect(() => {
        console.log(postColorURL);
        if (postColorURL != "") {
            axios.get(postColorURL)
                .then(response => {
                    console.log("data posted to firebase");
                })
                .catch(error => {
                    // Handle any errors
                });
        }
    }, [postColorURL]
    )



    // setColors(
    //     colors.map((color) =>
    //         color.value === player.color ? { ...color, disabled: false }
    //             : color
    //     )
    // )


    // empty dependency array means this effect will only run once (like componentDidMount in classes)

    return (
        <Container maxWidth="lg">
            <div className='container' style={{ backgroundColor: player.color }}>
                <Select
                    options={colors}
                    placeholder={'Player ' + player.id + ' Color'}
                    onChange={(e) => {
                        console.log(player.id, e)
                        setPlayers(
                            players.map((play) =>
                                play.id === player.id ? { ...play, color: e.value }
                                    : play
                            ))
                        if (player.color != "white") {
                            setColors(
                                colors.map((color) =>
                                    color.value === player.color ? { ...color, disabled: false }
                                        : color
                                )
                            )
                        }
                        console.log("TEST: ", e.value, player.id);
                        const ind = player.id - 1
                        setPostColorURL(`https://us-central1-gamelobby-ecdf4.cloudfunctions.net/postColor?text=${docID},${ind},${e.value}`);
                        console.log(postColorURL);
                        // ****************
                        //QUESTION: WHY DOES the code below WORK? I didn't use setColors here...
                        //I didn't use setColors but colors (referred by e here) still changes...
                        // *************
                        // e.disabled = true;
                        setcolorsDisabled([e.value]);
                        console.log(colors)

                    }}
                    isOptionDisabled={(option) => option.disabled}
                />
            </div>
        </Container>
    )
}
export default Player;
