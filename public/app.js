const ideasContainer = document.querySelector(".ideas-container");
const modalBtn = document.querySelector("#modal-btn");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form form");
const userNameDisplay = document.querySelector("#username");

// DISPLAY modal
function showModal() {
  userNameDisplay.value = localStorage.getItem("username") || "";
  console.log(userNameDisplay);
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

  if (!data.text || !data.tag || !data.username) {
    alert("Please fill out all fields");
    return;
  }

  const res = await axios.post("/api/ideas", data);
  const idea = res.data.data;
  getIdeas();

  modalForm.elements.text.value = "";
  modalForm.elements.tag.value = "";
  modalForm.elements.username.value = "";
  modal.style.display = "none";
});

// DELETE an idea
ideasContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    const ideaId = e.target.parentElement.parentElement.dataset.id;
    await axios.delete(`/api/ideas/${ideaId}`);
    getIdeas();
  }
});

const getTagClass = (idea) => {
  const set = new Set();
  set.add("technology");
  set.add("business");
  set.add("entertainment");
  set.add("health");
  set.add("inventions");
  if (set.has(idea.tag.toLowerCase())) {
    return `tag-${idea.tag.toLowerCase()}`;
  }
};

const getIdeas = async () => {
  const res = await axios.get("/api/ideas");
  const ideas = res.data.data;
  const renderedIdeas = ideas
    .map(
      (idea) => `
    <div class="idea" data-id=${idea._id}>
    <div>
    <p class='text'>
    ${idea.text}
   </p>
   <p class="username">
   -${idea.username} on ${idea.date.slice(0, 10)}
   </p>
   <p class="tag ${getTagClass(idea)}">
   ${idea.tag}
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
