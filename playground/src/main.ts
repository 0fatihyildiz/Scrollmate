import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./style.css";
import createMatter from "scrollmate";

const element = document.getElementById("app");

const matter = createMatter(element)

matter.scrollArea();