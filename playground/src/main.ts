import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./style.css";

type Element = HTMLElement | null;

const element: Element = document.getElementById("app");

function createMatter(el: Element) {
  const scrollAreaStyle: Partial<CSSStyleDeclaration> = {
    overflow: "hidden",
  };

  const getEl = (): Element => el;

  const withNullCheck = (fn: Function) => {
    return function (this: any, ...args: any[]) {
      const targetEl = getEl();
      if (!targetEl) {
        console.warn("Element is null.");
        return;
      }
      fn.apply(this, [targetEl, ...args]);
    };
  };

  function assignStyles(
    target: CSSStyleDeclaration | undefined,
    styles: Partial<CSSStyleDeclaration>
  ) {
    if (!target) return;
    Object.assign(target, styles);
  }

  const scrollArea = withNullCheck(function (): void {
    const element = getEl()!;
    const content = element.innerHTML;
    assignStyles(element.style, scrollAreaStyle);
    element.innerHTML = `<div class="scrollmater-content">${content}</div>`;
  });

  return {
    scrollArea,
  };
}

const matter = createMatter(element);
matter.scrollArea();
