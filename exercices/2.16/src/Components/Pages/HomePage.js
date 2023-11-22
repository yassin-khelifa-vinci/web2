const HomePage = () => {
  const main = document.querySelector('main');
  let question1 = {};
  let question2 = {};
  let question3 = {};
  fetch('http://localhost:3000/questions')
    .then((response) => response.json())
    .then((data) => {
      [question1, question2, question3] = data;
    })
    .then(() => {
      main.innerHTML = `
        <h1>${question1?.question}</h1>
        <p>${question1?.answers[0]?.text}<input type="radio" name="1"></p>
        <p>${question1?.answers[1]?.text}<input type="radio" name="1"></p>
        <p>${question1?.answers[2]?.text}<input type="radio" name="1"></p>
        <h1>${question2?.question}</h1>
        <p>${question2?.answers[0]?.text}<input type="radio" name="2"></p>
        <p>${question2?.answers[1]?.text}<input type="radio" name="2"></p>
        <p>${question2?.answers[2]?.text}<input type="radio" name="2"></p>
        <h1>${question3?.question}</h1>
        <p>${question3?.answers[0]?.text}<input type="radio" name="3"></p>
        <p>${question3?.answers[1]?.text}<input type="radio" name="3"></p>
        <p>${question3?.answers[2]?.text}<input type="radio" name="3"></p>
      `;
    });
};

export default HomePage;
