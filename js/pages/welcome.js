import * as store from "../store.js";
import { icon } from "../icons.js";
import { $, $$, esc } from "../ui.js";

export function render(view) {
  const s = store.get();
  view.innerHTML = `
  <section class="welcome">
    <div class="welcome-card card">
      <span class="logo big" aria-hidden="true">Aa</span>
      <h1>Welcome to English Learning Hub</h1>
      <p class="muted lead">Learn English step by step. Easy lessons, games and tests.</p>
      <form id="w-form" class="stack" autocomplete="off">
        <label class="field-label" for="w-name">${icon("user")} What is your name?</label>
        <input id="w-name" class="input big" type="text" maxlength="30" value="${esc(s.name)}" placeholder="Your name" required />
        <p class="field-label">${icon("target")} What is your English level?</p>
        <div class="choice-list" role="radiogroup" aria-label="Your level">
          <button type="button" class="choice" role="radio" aria-checked="false" data-level="test">${icon("help")}<span><b>I don't know</b><small>Take a short test to find your level</small></span></button>
          ${store.LEVELS.map((l) => `<button type="button" class="choice" role="radio" aria-checked="false" data-level="${l.code}"><span class="lvl lvl-${l.code}">${l.name}</span><span><small>${esc(l.desc)}</small></span></button>`).join("")}
        </div>
        <p class="form-error" role="alert"></p>
        <button class="btn primary big" type="submit">Start ${icon("next")}</button>
      </form>
    </div>
  </section>`;
  let choice = s.level || "test";
  const mark = () => $$(".choice", view).forEach((b) => { const on = b.dataset.level === choice; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); });
  mark();
  $$(".choice", view).forEach((b) => b.addEventListener("click", () => { choice = b.dataset.level; mark(); }));
  $("#w-form", view).addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#w-name", view).value.trim().replace(/\s+/g, " ");
    if (!name) { $(".form-error", view).textContent = "Please write your name."; $("#w-name", view).focus(); return; }
    store.set({ name, level: choice === "test" ? store.get().level : choice });
    location.hash = choice === "test" ? "#/placement" : "#/";
  });
}
