const textarea= document.querySelector("textarea");
const speechBtn= document.getElementById("btn");
const voicelist=document.querySelector("select");
let synth=speechSynthesis;

isSpeaking=true;
function voices(){
    for(let voice of synth.getVoices()){
        

        // console.log(voice);
        let selected= voice.name==="Google US English"? "selected":"";
        let option=`<option value="${voice.name}" ${selected}>${voice.name}(${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend",option);
    }
}  

synth.addEventListener("voiceschanged",voices);

function textTospeech(text){
    let utter=new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name===voicelist.value){
            utter.voice=voice;
        }
    }
    speechSynthesis.speak(utter);
}

speechBtn.addEventListener("click",e=>{
    e.preventDefault();
    if(textarea.value!==""){
        if(!synth.speaking){
            textTospeech(textarea.value);

        }
        if(textarea.value.length>80){
            if(isSpeaking){
                synth.resume();
                isSpeaking=false;
                speechBtn.innerText="Pause";
            }else{
                synth.pause();
                isSpeaking=true;
                speechBtn.innerText="Resume";
            }
        }
        
    }
})