const a = document.querySelectorAll(".button") // chwyc all elementy o clasie button i umiesc a jako nodelist
const buttons = Array.from(a); // change nodelist to array
//////// !!! nie trzeba zmieniac nodelista na arraya zeby wykonac forEach, ale zmienilem
console.log(buttons)
const view = document.getElementById("view"); // uchwyt duzego okna
const viewmini = document.getElementById("viewmini"); // uchwyt małego okna
var oneTime = 0; // zmienna umozliwia nadpisania proponowanej zawartosci glownego okna po kliknieciu jakiegos dzialania
var click = 0;  // zmienna umozliwia dodanie wczesniejszej zawartosci i odrazu wpisanie jej do glownego okna jako proponowana wartosc do nastepnych obliczen
var afterequal = 0; // po kliknieciu = zmienna umozliwiajaca nadpisanie wyniku nowymi wartosciami
///////// funkcja za pierwszym razem nadpisuje wartosc z glownego okna do mini okna, a potem przy kazdym kolejnym kliknieciu dzialania oblicza wartosc z mini okna i proponowanego wyniku poprzedniego dzialania
function count(which){ 
    if(click == 1){
        viewmini.textContent += view.textContent; 
        let wynik = eval(viewmini.textContent)
        if (Number.isInteger(wynik)){
        view.textContent = eval(viewmini.textContent) 
        viewmini.textContent += ` ${which} `;
        oneTime = 0;   
        } else { 
        view.textContent = eval(viewmini.textContent).toFixed(2);;  // eval - dodaje wartosci w stringach a  tofixed daje 4 artosci po przecisnku
        viewmini.textContent += ` ${which} `;
        oneTime = 0;
        }
    } else{
        viewmini.textContent = view.textContent;
        viewmini.textContent += ` ${which} `;
        click = 1;
    }
}
///////////  funckja dodajaca clase i usuwa ją po .2s effect click
function clickeffect(btn){
    btn.className += " clicked";
    setTimeout(change, 200);
    function change(){
        btn.classList.remove("clicked");
    };
};
////////// dla kazdego elementu o klasie .button wykonaj ponizsze
buttons.forEach(button => {

    button.addEventListener("click", function(){      /// dodaj click event dla kazdego buttona

    clickeffect(button);  // wywołaj funckje clickeffect

      //  view.textContent += button.getAttribute('id');   /// view okno dostaje wartosc id buttona
        let id = button.getAttribute('id');
//////////////////// jezeli wartosc a nie jest liczba to: 
        if (isNaN(id)){                               
            if (id === "+"){                         
                count("+");                         /// jeżeli wartosc jest plusem to wywołaj funcke count z parametrem + // poniezej tak samo dla innych
            } else if (id === "-"){
                count("-");
            } else if (id === "*"){
                count("*");
            } else if (id === "/"){
                count("/");
            } else if (id === "="){
                let mainwynik = eval(viewmini.textContent + view.textContent)
                if(Number.isInteger(mainwynik)){    // spradzenie czy wynik jest integerem jesli tak to zwroc wynik jesli nie to zwroc wynik z 4 miejscami po przecinku
                    view.textContent = mainwynik; 
                    viewmini.textContent = "";
                    afterequal = 1;
                } else {
                    view.textContent = mainwynik.toFixed(2); /// dodaj wartosci z mini i glownego okna // oraz skraca do 10 wartosci po przecinku
                    viewmini.textContent = "";  // wyczysc mini okno 
                    afterequal = 1; /// zeby po nastepnej wpisanej liczbie wynik byl usuwany
                }
            } else if (id === "."){
                if (view.textContent.indexOf('.') > -1) {
                    /// do nothing if view have already "."
                } else {
                    view.textContent += "."
                }
            } else if (id === "±"){
                view.textContent = -view.textContent;
            } else if (id === "C"){
                view.textContent = "0";
                viewmini.textContent = "";
                oneTime = 0;                // reset zmiennych
                click = 0;
                afterequal = 0;
            } else if (id === "←"){
                if (view.textContent.length == 1) { ///jezeli w view mamy jedna cyfre to usuniecie ostatniej cyfry zostawia 0 domyslnie zamiast pustego pola
                    view.textContent = "0";
                } else {
                    view.textContent = view.textContent.replace(/.$/,"")   //replace last character for "".
                }
            } else if (id === "CE"){
                view.textContent = "0"; 
                oneTime = 20;   /// jezeli w mini oknie cos jest bedzie dodawalo numery
                afterequal = 0; /// jezeli po = wyczyscimy okno to bedzie dodawalo numery
            }
///////////////////// jezeli wcisnieta wartosc jest liczba to:      
        } else {
            if(view.textContent.length < 13){            
                if(view.textContent == "0" && id == "0") {   // jezeli w view oknie jest 0 i wcisniete jest kolejne 0, to nie rob nic                   
                } else if (view.textContent == "0") {  // jezeli w view oknie jest 0 i wcisnieta jest inna liczba to podmien 0 na ta liczbe
                    view.textContent = id;
                    afterequal = 0; /// do sprawdzenia
                } else {
                    if  (viewmini.textContent !== ""){   // jezeli w mini oknie cos jest, to:
                        if(view.textContent.length <= oneTime){  // to musi sie wykonac dopiero za drugim razem, poniewaz za peirwszym razem musimy zresetowac/nadpisac proponowana liczbe w oknie gdy wprowadzimy kolejna liczbe
                            view.textContent += id;
                        } else {        /// gdy klikniemy nowa liczbe to proponowana liczba zostanie nadpisana od nowa ciagiem nowych znakow, + blokujemy zresetowanie poprzez klikniecie nastepnej liczby 
                            view.textContent = id;
                            oneTime = 20;
                        }
                    } else{                         // jezeli w mini oknie nie ma nic, to:
                        if (afterequal == 1) {
                            view.textContent = id;
                            afterequal = 0;
                        } else{
                            view.textContent += id;
                        }
                    } 
                }
            } else {
                        ///////////////// jezeli full okno zapiszemy liczbami to ten kod umozliwia dalsze dzialania i nadpisania liczb /// poniewaz powyzszy if sie sam blokuje jak zapiszemy okno liczbami
                        if  (viewmini.textContent !== ""){   // jezeli w mini oknie cos jest, to:
                            if(view.textContent.length <= oneTime){  // to musi sie wykonac dopiero za drugim razem, poniewaz za peirwszym razem musimy zresetowac/nadpisac proponowana liczbe w oknie gdy wprowadzimy kolejna liczbe
                                
                            } else {        /// gdy klikniemy nowa liczbe to proponowana liczba zostanie nadpisana od nowa ciagiem nowych znakow, + blokujemy zresetowanie poprzez klikniecie nastepnej liczby 
                                view.textContent = id;
                                oneTime = 20;
                            }
                        } else{                         // jezeli w mini oknie nie ma nic, to:
                            if (afterequal == 1) {
                                view.textContent = id;
                                afterequal = 0;
                            } else{
                                
                            }
                        } 
                
            }    
        };
    });
});
