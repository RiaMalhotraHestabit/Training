//Array of objects created (FAQ Data)
const faqs = [
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language used to create interactive web pages."
  },
  {
    question: "What is the DOM?",
    answer: "DOM represents the structure of an HTML document."
  },
  {
    question: "What is ES6?",
    answer: "ES6 introduced modern features like let, const, arrow functions."
  }
];

//DOM reference
const faqList = document.getElementById("faq-list");

//map() function used to render FAQs
faqList.innerHTML = faqs
  .map(
    faq => `
    <div class="faq">
      <div class="faq-question">${faq.question}</div>
      <div class="faq-answer">${faq.answer}</div>
    </div>
  `
  )
  .join("");

//Event listeners 

const faqItems = document.querySelectorAll(".faq");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {

    faqItems.forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* filter()
mini - challenge : FAQs containing "DOM"
*/
const domFaqs = faqs.filter(faq =>
  faq.question.toLowerCase().includes("dom")
);
console.log("Filtered FAQs:", domFaqs);

/* reduce() -> mini-challenge 
Count total characters in answers */
const totalCharacters = faqs.reduce(
  (count, faq) => count + faq.answer.length,
  0
);
console.log("Total characters in answers:", totalCharacters);
