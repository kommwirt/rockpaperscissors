
// Note: There are some effects, like time-out and image-replacement, 
// wich were not topic of the course so far as I remember.
// I used it, to get a better effect on the screen. Google is a beast. Sometimes.

// Let's start with wrapping everything like an amazon parcel

const rps = () => {

    // Some declarations overall
    let userScoreIn = 0;
    let tieScoreIn = 0;
    let computerScoreIn = 0;

    // Here takes the conversation part
    const  dialog = document.querySelector(".dialog")
    const  dancing = document.getElementById('dancing')
    const roundCounter = document.querySelector(".round-counter")
     // Were are the choices to see (images?
     const userHand = document.querySelector(".user-hand")
     const compHand = document.querySelector(".computer-hand")

    // Round and round and round we go

    let fiveRounds = document.getElementById('fiveRounds');
    let tenRounds = document.getElementById('tenRounds');
    let fifteenRounds = document.getElementById('fifteenRounds');
    let twentyRounds = document.getElementById('twentyRounds');
    

    // Start the Game
    const letsPlay = () => {
        // Needed variables
        const startScreen = document.querySelector(".start-screen");
        const playScreen = document.querySelector(".game");
        const playStart = document.querySelector(".start-screen button");
        const dialogStart = document.querySelector(".start-screen h2");
        
        
        
        // Let's do the fade-out - fade-in thing when a round number is chosen
        
            playStart.addEventListener("click", () => {
              
                if( (fiveRounds.checked == true) || (tenRounds.checked == true) || (fifteenRounds.checked == true) || (twentyRounds.checked == true) ){
                // Let the starting screen fade out - because everything's done

                startScreen.style.display = "none";
                playScreen.style.display = "block";
                dancing.style.height="0vh"
                

                // Get the given round set

                let rounds
                let roundsNumber = document.getElementById('roundsnumber');
                if (fiveRounds.checked == true ){
                rounds = fiveRounds.value
                }
                else if(tenRounds.checked == true){
                rounds = tenRounds.value
                }
                else if(fifteenRounds.checked == true){
                rounds = fifteenRounds.value
                }
                else if (twentyRounds.checked == true) {
                rounds = twentyRounds.value
                }
                roundsNumber.innerText = rounds

                // Get the remaining rounds set

                let remain = document.getElementById('remain');

                // However is the first click not able to decrement the number - so we do it manualy here, it works
                let remainRounds = rounds - 1
                remain.innerText = remainRounds + 1

                // Get the fight done

                const fight = () => {

                    // We want to get the options from ALL the choices buttons rock, paper scissors
                    const choices = document.querySelectorAll(".choices button")

                   

                    // How does the computer his choice? He should pick from an array:
                    // 0 - 0,49 = rock, 2,5 - 3 = rock , 0,5 - 1,49 = paper, 1,5 - 2,49 = scissors
        
                    const computerOptions = ["rock", "paper", "scissors", "rock"]

                    
                    
                    // Everything should work by klicking one of the choice buttons

                    choices.forEach(option => {
                        option.addEventListener("click", function() {

                            // We need to empty the animation of line 113/114 and get back the rock ahnd to start them new

                            const allHands = document.querySelectorAll(".hands img");

                            allHands.forEach(hand => {
                            hand.addEventListener("animationend" , function() {
                            this.style.animation = "";
                            })
                            allHands.forEach(source => {
                                source.src = `./assets/img/rock.png`
                            })
                        })

                            // To get the relation to this array the computer generates a random number between 0 and 3
                            

                            const compNumbers = Math.floor(Math.random() * 4)

                            // Now we match the index of the given array with the generated number
                            const computerChoice = computerOptions[compNumbers]
                            
                            // So, we don't want ro get the results in an instant, but with delay of 1800ms
                            // Solution: A time-out-function, found on the crazy internet, wrapped arround the process

                            setTimeout(() => {

                            // Now it' time to compare who is winning with an external functiom, because we need ist for several rounds
                            // With this.textContent we get the text content from the clicked button wich is equiv. to userChoice used above
                            compareChoices(this.textContent, computerChoice)

                            // Change the images on the screen, found with Google and tears in my eyes

                            userHand.src = `./assets/img/${this.textContent}.png`
                            compHand.src = `./assets/img/${computerChoice}.png`


                            }, 1800)


                            // Animation for the hands. Problem: Once added, the animation won't appear by the nex clicks, so we need something like in line 92

                            userHand.style.animation = "waitUser 2s ease";
                            compHand.style.animation = "waitComputer 2s ease";

                        })
                    })
                }
                
                
                // Get the scores done & count remaining rounds

                const scoring = () => {
                    //All needs for the score
                    let userScore = document.querySelector(".user-score p")
                    let tieScore = document.querySelector(".tie-score p")
                    let compScore = document.querySelector(".computer-score p")
                    userScore.textContent = userScoreIn
                    tieScore.textContent = tieScoreIn
                    compScore.textContent = computerScoreIn 
                    let newRemainRounds = remainRounds--
                    remain.innerText = newRemainRounds

                    // What happens at the end?
                    if(newRemainRounds == 0){
                        const playButtonsAway = document.querySelector(".choices")
                        playButtonsAway.classList.add('fadeout');
                        newGameButtonsIn.classList.remove('fadeout');
                        userHand.style.display = "none";
                        compHand.style.display = "none";
                        
                        // Some text, when noone wins
                        let textNoWinner =[
                        "Boring. Boring. Booooooring.",
                        "Draw. Boring. Booger in the nose.",
                        "It's even more exciting in my loo!",
                        "No decision - this is your life, right?",
                        "You have a life as exciting as a drummer..."
                        ]
                        //Some text when user is winning
                        let textUserWinner = [
                            "Feel like the guitarist now, don't you?",
                            "Yes. You won. Go do some headbanging.",
                            "As long as the loud woman is still singing, the opera is not over.",
                            "I hate to lose!!! Gotta go to the bathroom. Arghhh.",
                            "You won. Yes. OK. But I'm sure you hear Oasis too."
                        ]
                        // Some text when computer is winning
                        let textComputerWinner = [
                            "I am the god of rock and roll! Worship me!",
                            "Go cry - Or just listen to a little Duran Duran",
                            "You lost!! Let Celine Dion comfort you.",
                            "I guitarist - you drummer. The world is injustice. I know.",
                            "I'm the headliner now. You're not even backstage."
                        ]

                        const dialogResult = Math.floor(Math.random() * 5)
                        const dialogResultDraw = textNoWinner[dialogResult]
                        const dialogResultUser = textUserWinner[dialogResult]
                        const dialogResultComputer = textComputerWinner[dialogResult]
                        //And also the winner should be display by comparison,so
                        let resultMessage = document.querySelector(".container-new-game h2")
                        if(userScoreIn === computerScoreIn) {
                            dialog.textContent = dialogResultDraw 
                            roundCounter.classList.add('fadeout');
                            dancing.style.height="40vh"
                            dancing.classList.add('bored-black');
                            return
                        }
                        else if(userScoreIn > computerScoreIn) {
                            dialog.textContent = dialogResultUser
                            roundCounter.classList.add('fadeout');
                            dancing.style.height="40vh"
                            dancing.classList.add('angry-black');
                            return
                        }
                        else{
                            dialog.textContent = dialogResultComputer
                            roundCounter.classList.add('fadeout');
                            dancing.style.height="40vh"
                            dancing.classList.add('dancing-black');
                           
                            return
                        }
                        
                    }}

                // Compare snippet

                const compareChoices = (userChoice, computerChoice) => {
                    
                    
                    // First case: tie
                    if(userChoice === computerChoice){
                        dialog.textContent = 'Tie - No winner - no cry'
                       tieScoreIn++
                        scoring()
                        return
                    }
                    //Check for rock
                    if(userChoice === 'rock'){
                        if(computerChoice === 'paper'){
                            dialog.textContent = 'I ROCK - use your paper to weep your tears!'
                            computerScoreIn++
                            scoring()
                            return
                        }
                        else{
                            dialog.textContent = 'You choose rock. Great. Scissors... naaa.'
                            userScoreIn++
                            scoring()
                            return
                        }
                    }
                    //Check for paper
                    if(userChoice === 'paper'){
                        if(computerChoice === 'rock'){
                            dialog.textContent = 'You win with paper - I loose by rocking. Not fair.'
                            userScoreIn++
                            scoring()
                            return
                        }
                        else{
                            dialog.textContent = 'I cut your paper. Ziiiiing. Loser!'
                            computerScoreIn++
                            scoring()
                            return
                        }
                    }
                    //Check for scissors
                    if(userChoice === 'scissors'){
                        if(computerChoice === 'paper'){
                            dialog.textContent = "You've cut my paper! You really did it! Fraaaanzi!!"
                           userScoreIn++
                            scoring()
                            return
                        }
                        else{
                            dialog.textContent = "Rock'n'Roll!! And you are a scissors sister!"
                            computerScoreIn++
                            scoring()
                            return
                        }
                    }

                }

                

                // Start the inner function
                fight()
                
            
                }
                
                
                else {
                    // Just for fun - an array of possible answers
                    let startDialog = [
                        "You're tacky and I hate you! Choose a number!",
                        "Hey dummy! Just choose the number Schneebly!",
                        "Sixsixsix - get a number, you beast!",
                        "Read and repeat : I choose a number. Now. Instantly.",
                        "Listen: There are four numbers. Uno, dos, tres, quatro.",
                        "Can't you read? Number? Choose? What else you need?",
                        "You should not sit in front of a computer. Not really.",
                        "Go to hell Sneebly ... Choose a number!!!!",
                        "Get off your ath, let's do some math.",
                        "Wonder how you managed to turn the computer on.",
                        "I turn on Chatroulette - take your time to choose a number.",
                        "I'm naked. Totaly. - Oh, just a check if you are able to read."
                    ]
                    const randomStartText = () =>{
                        const dialogStartNumber = Math.floor(Math.random() * 12)
                        const dialogStartChosen = startDialog [dialogStartNumber]
                        dialogStart.textContent = dialogStartChosen
                    }
                    randomStartText()
                }
                
                
        });
       
       
    };

    // Start the inner function
    letsPlay();
    
   
   //At the end
   const newGameButtonsIn = document.querySelector(".container-new-game")
   newGameButtonsIn.addEventListener("click", () => {
       document.location.reload(true)
       
   })
 

};

// Start the initialisation

rps();