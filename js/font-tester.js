function initFontTester(config) {
  const fontName = config.name;
  const fontNameMono = config.nameMono || fontName + "Mono";
  const repoBase = config.repoBase;

  const inputFontVariant = document.getElementById("input-font-variant");
  const inputViewSize = document.getElementById("input-view-size");
  const inputLineHeight = document.getElementById("input-line-height");
  const inputToggleMono = document.getElementById("toggle-mono");

  const valFontVariant = document.getElementById("val-font-variant");
  const valViewSize = document.getElementById("val-view-size");
  const valLineHeight = document.getElementById("val-line-height");

  const displayFontTitle = document.getElementById("display-font-title");
  const displaySizeNum = document.getElementById("display-size-num");
  const selectorWrapper = document.getElementById("font-selector-wrapper");
  const dropdownList = document.getElementById("dropdown-list");

  const btnTtf = document.getElementById("btn-dl-ttf");
  const btnOtf = document.getElementById("btn-dl-otf");
  const btnWoff = document.getElementById("btn-dl-woff");

  const tester = document.getElementById("type-tester");

  function initDropdown() {
    const min = parseInt(inputFontVariant.min);
    const max = parseInt(inputFontVariant.max);

    for (let i = min; i <= max; i++) {
      const li = document.createElement("li");
      li.className = "dropdown-item";
      li.textContent = `${fontName}${i}`;
      li.dataset.value = i;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        inputFontVariant.value = i;
        updateFont();
        closeDropdown();
      });

      dropdownList.appendChild(li);
    }
  }

  function toggleDropdown() {
    selectorWrapper.classList.toggle("open");
  }
  function closeDropdown() {
    selectorWrapper.classList.remove("open");
  }

  displayFontTitle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener("click", () => {
    closeDropdown();
  });

  function updateFont() {
    const fontSizeVariant = inputFontVariant.value;
    const cssViewSize = inputViewSize.value;
    const lineHeightVal = inputLineHeight.value;
    const isMono = inputToggleMono.checked;

    const currentBaseName = isMono ? fontNameMono : fontName;

    tester.style.fontFamily = `'${currentBaseName}${fontSizeVariant}'`;
    tester.style.fontSize = `${cssViewSize}px`;
    tester.style.lineHeight = lineHeightVal;

    displayFontTitle.style.fontFamily = `'${currentBaseName}${fontSizeVariant}'`;
    displayFontTitle.childNodes[0].nodeValue = currentBaseName;
    displaySizeNum.textContent = fontSizeVariant;

    valFontVariant.textContent = `${fontSizeVariant}px`;
    valViewSize.textContent = `${cssViewSize}px`;
    valLineHeight.textContent = lineHeightVal;

    btnTtf.href = `${repoBase}/ttf/${currentBaseName}${fontSizeVariant}.ttf?raw=true`;
    btnOtf.href = `${repoBase}/otf/${currentBaseName}${fontSizeVariant}.otf?raw=true`;
    btnWoff.href = `${repoBase}/woff/${currentBaseName}${fontSizeVariant}.woff2?raw=true`;

    const items = dropdownList.querySelectorAll(".dropdown-item");
    items.forEach((item) => {
      if (item.dataset.value === fontSizeVariant) {
        item.classList.add("active");
        item.textContent = `${currentBaseName}${fontSizeVariant}`;
      } else {
        item.classList.remove("active");
        item.textContent = `${currentBaseName}${item.dataset.value}`;
      }
    });
  }

  inputFontVariant.addEventListener("input", updateFont);
  inputViewSize.addEventListener("input", updateFont);
  inputLineHeight.addEventListener("input", updateFont);
  inputToggleMono.addEventListener("change", updateFont);

  initDropdown();
  updateFont();
}
