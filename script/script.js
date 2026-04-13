const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach(btn => btn.classList.remove("active"))
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
         <div class="col-span-full text-center font-bangla space-y-5">
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-400 text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    return;
  }

  //   {
  //     "id": 3,
  //     "level": 2,
  //     "word": "Cautious",
  //     "meaning": "সতর্ক",
  //     "pronunciation": "কশাস"
  // }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-2xl font-medium">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-medium">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1. get the Element and empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get every lessons
  for (let lesson of lessons) {
    // 3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>lesson - ${lesson.level_no}</button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();
