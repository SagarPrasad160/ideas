const ideasContainer = document.querySelector(".ideas-container");
const modalBtn = document.querySelector("#modal-btn");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form form");

// DISPLAY modal
function showModal() {
  modal.style.display = "block";
}

modalBtn.addEventListener("click", showModal);

// CLOSE modal
function closeModal(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("click", closeModal);

// POST an idea
modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    text: modalForm.elements.text.value,
    tag: modalForm.elements.tag.value,
    username: modalForm.elements.username.value,
  };
  const res = await axios.post("http://localhost:5000/api/ideas", data);
  const idea = res.data.data;
  getIdeas();
  modal.style.display = "none";
});

// DELETE an idea
ideasContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    const ideaId = e.target.parentElement.parentElement.dataset.id;
    await axios.delete(`http://localhost:5000/api/ideas/${ideaId}`);
    getIdeas();
  }
});

const getIdeas = async () => {
  const res = await axios.get("http://localhost:5000/api/ideas");
  const ideas = res.data.data;
  const renderedIdeas = ideas
    .map(
      (idea) => `
    <div class="idea" data-id=${idea._id}>
    <div>
    <p>
    ${idea.text}
   </p>
   <p class="username">
   -${idea.username}
   </p>
    </div>
    <div class="delete">
      <i class="fa-sharp fa-solid fa-xmark"></i>
    </div>
    </div>
    `
    )
    .join("");
  ideasContainer.innerHTML = renderedIdeas;
};

getIdeas();
