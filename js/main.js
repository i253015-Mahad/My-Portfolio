/* main.js: entry point. Renders content, then wires up behaviour. */
document.addEventListener("DOMContentLoaded", () => {
  const R = window.Render, U = window.UI;
  R.renderHero(); R.renderAbout(); R.renderSkills(); R.renderProjects();
  R.renderExperience(); R.renderEducation(); R.renderContact();
  U.initNav(); U.initTheme(); U.initFilters(); U.initDialog(); U.initLightbox(); U.initCarousel();
});
