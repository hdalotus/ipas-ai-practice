let currentExam=[];

function shuffle(array){
  return [...array].sort(()=>Math.random()-0.5);
}

function startExam(){

  if(typeof questionBank==="undefined"){
    alert("題庫尚未載入");
    return;
  }

  currentExam = shuffle(questionBank).slice(
    0,
    Math.min(5,questionBank.length)
  );

  let html="";

  currentExam.forEach((q,index)=>{

    html += `
      <div style="
      border:1px solid #ccc;
      padding:15px;
      margin:10px 0;
      border-radius:8px;">

      <h3>${index+1}. ${q.question}</h3>

      ${q.options.map((op,i)=>`
      <label>
        <input type="radio"
        name="q${index}"
        value="${i}">
        ${op}
      </label><br>
      `).join("")}

      </div>
    `;
  });

  document.getElementById("exam").innerHTML = html;
}

function submitExam(){

  let score=0;
  let review="";

  currentExam.forEach((q,index)=>{

    let selected =
      document.querySelector(
        `input[name=q${index}]:checked`
      );

    let answer =
      selected
      ? parseInt(selected.value)
      : -1;

    if(answer===q.answer){

      score++;

    }else{

      review += `
      <div style="
      color:red;
      margin-bottom:15px;">

      <b>第${index+1}題錯誤</b><br>

      正確答案：
      ${q.options[q.answer]}<br>

      解析：
      ${q.explanation}

      </div>
      `;
    }

  });

  document.getElementById("score").innerHTML =
    `<h2>成績：${score}/${currentExam.length}</h2>`;

  document.getElementById("review").innerHTML =
    review;
}
