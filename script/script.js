const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>lesson - ${lesson.level_no}</button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();
