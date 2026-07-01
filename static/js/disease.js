async function detectDisease(){

const file=document.getElementById("leafImage").files[0];

if(!file){

alert("Upload image");

return;

}

const form=new FormData();

form.append("image",file);

const res=await fetch("/api/disease-detect",{

method:"POST",

body:form

});

const data=await res.json();

document.getElementById("diseaseResult").innerHTML=`
<h3>${data.detected_disease}</h3>
<p>${data.confidence}</p>
<p>${data.recommended_pesticide}</p>
`;

}
