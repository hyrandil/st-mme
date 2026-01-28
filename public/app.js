const state = {
  resources: {
    wood: 620,
    clay: 540,
    iron: 420,
    grain: 390,
    storage: 2400,
    population: 210
  },
  villages: [
    {
      id: "v1",
      name: "Falkenhorst",
      owner: "player",
      coords: "435|512",
      buildings: {
        lumber: 4,
        clay: 4,
        iron: 3,
        farm: 4,
        headquarters: 4,
        barracks: 3,
        stable: 2,
        workshop: 1,
        smithy: 2,
        market: 2,
        wall: 3,
        watchtower: 1,
        storage: 3,
        academy: 1
      },
      units: {
        spears: 120,
        swords: 60,
        axes: 35,
        scouts: 18,
        lightCavalry: 12,
        heavyCavalry: 6,
        rams: 4,
        cats: 1
      }
    },
    {
      id: "v2",
      name: "Eichenfeld",
      owner: "player",
      coords: "438|517",
      buildings: {
        lumber: 3,
        clay: 4,
        iron: 3,
        farm: 3,
        headquarters: 3,
        barracks: 2,
        stable: 2,
        workshop: 1,
        smithy: 2,
        market: 2,
        wall: 2,
        watchtower: 1,
        storage: 3,
        academy: 1
      },
      units: {
        spears: 90,
        swords: 40,
        axes: 20,
        scouts: 12,
        lightCavalry: 8,
        heavyCavalry: 4,
        rams: 2,
        cats: 0
      }
    },
    {
      id: "v3",
      name: "Rabenfels",
      owner: "enemy",
      coords: "441|513",
      buildings: {
        lumber: 4,
        clay: 5,
        iron: 4,
        farm: 4,
        headquarters: 4,
        barracks: 4,
        stable: 3,
        workshop: 2,
        smithy: 3,
        market: 2,
        wall: 4,
        watchtower: 2,
        storage: 4,
        academy: 2
      },
      units: {
        spears: 110,
        swords: 80,
        axes: 60,
        scouts: 25,
        lightCavalry: 16,
        heavyCavalry: 10,
        rams: 6,
        cats: 2
      }
    },
    {
      id: "v4",
      name: "Grauburg",
      owner: "enemy",
      coords: "430|509",
      buildings: {
        lumber: 3,
        clay: 3,
        iron: 3,
        farm: 3,
        headquarters: 3,
        barracks: 2,
        stable: 2,
        workshop: 1,
        smithy: 2,
        market: 1,
        wall: 3,
        watchtower: 1,
        storage: 2,
        academy: 1
      },
      units: {
        spears: 80,
        swords: 50,
        axes: 30,
        scouts: 10,
        lightCavalry: 6,
        heavyCavalry: 3,
        rams: 2,
        cats: 0
      }
    }
  ],
  selectedVillageId: "v1",
  buildQueue: [],
  trainingQueue: [],
  tradeQueue: [],
  plannedAttacks: [],
  reports: [],
  researchPoints: 120,
  nobles: 1
};

const resourceEls = {
  wood: document.getElementById("wood"),
  clay: document.getElementById("clay"),
  iron: document.getElementById("iron"),
  grain: document.getElementById("grain"),
  storage: document.getElementById("storage"),
  population: document.getElementById("population")
};

const unitEls = {
  spears: document.getElementById("spears"),
  swords: document.getElementById("swords"),
  axes: document.getElementById("axes"),
  scouts: document.getElementById("scouts"),
  lightCavalry: document.getElementById("lightCavalry"),
  heavyCavalry: document.getElementById("heavyCavalry"),
  rams: document.getElementById("rams"),
  cats: document.getElementById("cats")
};

const statEls = {
  smithy: document.getElementById("smithy"),
  researchPoints: document.getElementById("researchPoints"),
  academy: document.getElementById("academy"),
  nobles: document.getElementById("nobles"),
  wall: document.getElementById("wall"),
  watchtower: document.getElementById("watchtower"),
  marketLevel: document.getElementById("marketLevel")
};

const mapEl = document.getElementById("map");
const villageDetailsEl = document.getElementById("villageDetails");
const queueListEl = document.getElementById("queueList");
const trainingListEl = document.getElementById("trainingList");
const attackListEl = document.getElementById("attackList");
const tradeQueueEl = document.getElementById("tradeQueue");
const reportListEl = document.getElementById("reportList");
const originSelect = document.getElementById("originSelect");
const targetSelect = document.getElementById("targetSelect");
const villageSelect = document.getElementById("villageSelect");

const endTurnButton = document.getElementById("endTurn");
const toggleHelpButton = document.getElementById("toggleHelp");
const closeHelpButton = document.getElementById("closeHelp");
const helpPanel = document.getElementById("helpPanel");
const researchButton = document.getElementById("researchButton");
const trainNobleButton = document.getElementById("trainNoble");
const upgradeWallButton = document.getElementById("upgradeWall");
const upgradeMarketButton = document.getElementById("upgradeMarket");
const submitTradeButton = document.getElementById("submitTrade");

const attackForm = document.getElementById("attackForm");

const tabs = document.querySelectorAll(".nav-button");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

const tileCount = 40;

const resourceIncome = {
  lumber: 40,
  clay: 35,
  iron: 30,
  farm: 32
};

const buildingCosts = {
  lumber: { wood: 120, clay: 80, iron: 50, grain: 30, time: 1 },
  clay: { wood: 110, clay: 90, iron: 50, grain: 30, time: 1 },
  iron: { wood: 120, clay: 90, iron: 70, grain: 30, time: 1 },
  farm: { wood: 90, clay: 80, iron: 50, grain: 30, time: 1 },
  headquarters: { wood: 200, clay: 180, iron: 100, grain: 80, time: 2 },
  barracks: { wood: 180, clay: 120, iron: 90, grain: 60, time: 2 },
  stable: { wood: 240, clay: 180, iron: 160, grain: 120, time: 3 },
  workshop: { wood: 260, clay: 220, iron: 180, grain: 140, time: 3 },
  smithy: { wood: 200, clay: 160, iron: 140, grain: 90, time: 2 },
  market: { wood: 180, clay: 120, iron: 100, grain: 80, time: 2 },
  wall: { wood: 150, clay: 200, iron: 120, grain: 80, time: 2 },
  watchtower: { wood: 140, clay: 120, iron: 160, grain: 100, time: 2 },
  storage: { wood: 120, clay: 180, iron: 100, grain: 60, time: 2 },
  academy: { wood: 260, clay: 240, iron: 180, grain: 120, time: 3 }
};

const unitCosts = {
  spears: { wood: 30, clay: 20, iron: 10, grain: 10, time: 1, pop: 1 },
  swords: { wood: 20, clay: 30, iron: 25, grain: 15, time: 1, pop: 1 },
  axes: { wood: 40, clay: 30, iron: 20, grain: 20, time: 1, pop: 1 },
  scouts: { wood: 50, clay: 50, iron: 20, grain: 30, time: 2, pop: 2 },
  lightCavalry: { wood: 80, clay: 60, iron: 50, grain: 40, time: 2, pop: 4 },
  heavyCavalry: { wood: 120, clay: 80, iron: 80, grain: 60, time: 3, pop: 6 },
  rams: { wood: 200, clay: 160, iron: 80, grain: 60, time: 3, pop: 5 },
  cats: { wood: 220, clay: 200, iron: 200, grain: 90, time: 4, pop: 8 }
};

const attackStats = {
  spears: { attack: 10, defense: 15 },
  swords: { attack: 15, defense: 25 },
  axes: { attack: 35, defense: 10 },
  scouts: { attack: 5, defense: 5 },
  lightCavalry: { attack: 65, defense: 40 },
  heavyCavalry: { attack: 85, defense: 60 },
  rams: { attack: 40, defense: 50 },
  cats: { attack: 75, defense: 40 }
};

const getVillageById = (id) => state.villages.find((village) => village.id === id);

const clampResources = () => {
  const max = state.resources.storage;
  ["wood", "clay", "iron", "grain"].forEach((key) => {
    state.resources[key] = Math.min(state.resources[key], max);
  });
};

const canAfford = (cost) =>
  Object.entries(cost).every(([key, amount]) =>
    key === "time" || key === "pop" ? true : state.resources[key] >= amount
  );

const spendResources = (cost) => {
  Object.entries(cost).forEach(([key, amount]) => {
    if (key === "time" || key === "pop") return;
    state.resources[key] -= amount;
  });
};

const addReport = (title, text, status = "info") => {
  state.reports.unshift({ title, text, status, timestamp: new Date().toLocaleTimeString() });
  if (state.reports.length > 8) {
    state.reports.pop();
  }
};

const renderResources = () => {
  Object.entries(resourceEls).forEach(([key, el]) => {
    el.textContent = state.resources[key].toString();
  });

  const totalUnits = state.villages
    .filter((village) => village.owner === "player")
    .reduce(
      (acc, village) => {
        Object.keys(acc).forEach((unit) => {
          acc[unit] += village.units[unit];
        });
        return acc;
      },
      {
        spears: 0,
        swords: 0,
        axes: 0,
        scouts: 0,
        lightCavalry: 0,
        heavyCavalry: 0,
        rams: 0,
        cats: 0
      }
    );

  Object.entries(unitEls).forEach(([key, el]) => {
    el.textContent = totalUnits[key];
  });
};

const renderStats = () => {
  const village = getVillageById(state.selectedVillageId);
  if (!village) return;
  statEls.smithy.textContent = village.buildings.smithy;
  statEls.academy.textContent = village.buildings.academy;
  statEls.wall.textContent = village.buildings.wall;
  statEls.watchtower.textContent = village.buildings.watchtower;
  statEls.marketLevel.textContent = village.buildings.market;
  statEls.researchPoints.textContent = state.researchPoints;
  statEls.nobles.textContent = state.nobles;
};

const renderMap = () => {
  mapEl.innerHTML = "";
  for (let i = 0; i < tileCount; i += 1) {
    const tile = document.createElement("div");
    tile.className = "map-tile";
    const village = state.villages[i];
    if (village) {
      tile.innerHTML = `${village.name} <small>${village.coords}</small>`;
      tile.classList.add(village.owner === "player" ? "owned" : "enemy");
      tile.addEventListener("click", () => selectVillage(village.id));
      if (state.selectedVillageId === village.id) {
        tile.classList.add("selected");
      }
    } else {
      tile.textContent = "Wildnis";
      tile.classList.add("neutral");
    }
    mapEl.appendChild(tile);
  }
};

const renderQueues = () => {
  queueListEl.innerHTML = "";
  trainingListEl.innerHTML = "";

  const buildQueue = state.buildQueue;
  const trainQueue = state.trainingQueue;

  if (buildQueue.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Keine Bauaufträge.";
    queueListEl.appendChild(item);
  } else {
    buildQueue.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = `${entry.label} – bereit in ${entry.remaining} Runden`;
      queueListEl.appendChild(item);
    });
  }

  if (trainQueue.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Keine Ausbildungen.";
    trainingListEl.appendChild(item);
  } else {
    trainQueue.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = `${entry.label} – bereit in ${entry.remaining} Runden`;
      trainingListEl.appendChild(item);
    });
  }
};

const renderVillageDetails = () => {
  const village = getVillageById(state.selectedVillageId);
  if (!village) {
    villageDetailsEl.innerHTML = "<p>Wähle ein Dorf auf der Karte aus.</p>";
    return;
  }

  villageDetailsEl.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = `${village.name} (${village.coords})`;

  const buildingSection = document.createElement("div");
  buildingSection.className = "card";
  buildingSection.innerHTML = `
    <h4>Gebäudeübersicht</h4>
    <p>Holzfäller: Stufe ${village.buildings.lumber}</p>
    <p>Lehmgrube: Stufe ${village.buildings.clay}</p>
    <p>Eisenmine: Stufe ${village.buildings.iron}</p>
    <p>Bauernhof: Stufe ${village.buildings.farm}</p>
    <p>Speicher: Stufe ${village.buildings.storage}</p>
    <p>Hauptgebäude: Stufe ${village.buildings.headquarters}</p>
    <p>Kaserne: Stufe ${village.buildings.barracks}</p>
    <p>Stall: Stufe ${village.buildings.stable}</p>
    <p>Werkstatt: Stufe ${village.buildings.workshop}</p>
  `;

  const buildGrid = document.createElement("div");
  buildGrid.className = "action-grid";
  const buildingOptions = [
    { key: "lumber", label: "Holzfäller" },
    { key: "clay", label: "Lehmgrube" },
    { key: "iron", label: "Eisenmine" },
    { key: "farm", label: "Bauernhof" },
    { key: "headquarters", label: "Hauptgebäude" },
    { key: "barracks", label: "Kaserne" },
    { key: "stable", label: "Stall" },
    { key: "workshop", label: "Werkstatt" },
    { key: "smithy", label: "Schmiede" },
    { key: "market", label: "Markt" },
    { key: "wall", label: "Mauer" },
    { key: "watchtower", label: "Wachturm" },
    { key: "storage", label: "Speicher" },
    { key: "academy", label: "Hof" }
  ];

  buildingOptions.forEach((building) => {
    const card = document.createElement("div");
    card.className = "card";
    const cost = buildingCosts[building.key];
    card.innerHTML = `
      <h4>${building.label}</h4>
      <p>Kosten: ${cost.wood} Holz, ${cost.clay} Lehm, ${cost.iron} Eisen, ${cost.grain} Getreide</p>
      <p>Bauzeit: ${cost.time} Runden</p>
    `;
    const button = document.createElement("button");
    button.textContent = "Ausbauen";
    button.addEventListener("click", () => queueBuildingUpgrade(village.id, building.key));
    card.appendChild(button);
    buildGrid.appendChild(card);
  });

  const unitGrid = document.createElement("div");
  unitGrid.className = "action-grid";
  const unitOptions = [
    { key: "spears", label: "Speere" },
    { key: "swords", label: "Schwerter" },
    { key: "axes", label: "Äxte" },
    { key: "scouts", label: "Späher" },
    { key: "lightCavalry", label: "Leichte Kavallerie" },
    { key: "heavyCavalry", label: "Schwere Kavallerie" },
    { key: "rams", label: "Rammbock" },
    { key: "cats", label: "Katapult" }
  ];

  unitOptions.forEach((unit) => {
    const card = document.createElement("div");
    card.className = "card";
    const cost = unitCosts[unit.key];
    card.innerHTML = `
      <h4>${unit.label}</h4>
      <p>Kosten: ${cost.wood} Holz, ${cost.clay} Lehm, ${cost.iron} Eisen, ${cost.grain} Getreide</p>
      <p>Ausbildungszeit: ${cost.time} Runden</p>
    `;
    const button = document.createElement("button");
    button.textContent = "Ausbilden";
    button.addEventListener("click", () => queueUnitTraining(village.id, unit.key));
    card.appendChild(button);
    unitGrid.appendChild(card);
  });

  const unitsInfo = document.createElement("div");
  unitsInfo.className = "card";
  unitsInfo.innerHTML = `
    <h4>Truppenstationierung</h4>
    <p>Speere: ${village.units.spears}</p>
    <p>Schwerter: ${village.units.swords}</p>
    <p>Äxte: ${village.units.axes}</p>
    <p>Späher: ${village.units.scouts}</p>
    <p>Leichte Kavallerie: ${village.units.lightCavalry}</p>
    <p>Schwere Kavallerie: ${village.units.heavyCavalry}</p>
    <p>Rammen: ${village.units.rams}</p>
    <p>Katapulte: ${village.units.cats}</p>
  `;

  villageDetailsEl.appendChild(title);
  villageDetailsEl.appendChild(buildingSection);
  villageDetailsEl.appendChild(buildGrid);
  villageDetailsEl.appendChild(unitsInfo);
  villageDetailsEl.appendChild(unitGrid);
};

const renderAttackPlanner = () => {
  const playerVillages = state.villages.filter((village) => village.owner === "player");
  originSelect.innerHTML = "";
  targetSelect.innerHTML = "";
  villageSelect.innerHTML = "";

  playerVillages.forEach((village) => {
    const option = document.createElement("option");
    option.value = village.id;
    option.textContent = `${village.name} (${village.coords})`;
    originSelect.appendChild(option);

    const villageOption = option.cloneNode(true);
    villageSelect.appendChild(villageOption);
  });

  state.villages
    .filter((village) => village.owner === "enemy")
    .forEach((village) => {
      const option = document.createElement("option");
      option.value = village.id;
      option.textContent = `${village.name} (${village.coords})`;
      targetSelect.appendChild(option);
    });

  attackListEl.innerHTML = "";
  if (state.plannedAttacks.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Keine Aktionen geplant.";
    attackListEl.appendChild(item);
  } else {
    state.plannedAttacks.forEach((attack) => {
      const item = document.createElement("li");
      item.textContent = `${attack.originName} -> ${attack.targetName} | ${attack.typeLabel} | Ankunft in ${attack.remaining} Runden`;
      attackListEl.appendChild(item);
    });
  }
};

const renderTrades = () => {
  tradeQueueEl.innerHTML = "";
  if (state.tradeQueue.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Keine Karawanen unterwegs.";
    tradeQueueEl.appendChild(item);
  } else {
    state.tradeQueue.forEach((trade) => {
      const item = document.createElement("li");
      item.textContent = `${trade.label} – Ankunft in ${trade.remaining} Runden`;
      tradeQueueEl.appendChild(item);
    });
  }
};

const renderReports = () => {
  reportListEl.innerHTML = "";
  if (state.reports.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Keine Berichte vorhanden.";
    reportListEl.appendChild(item);
  } else {
    state.reports.forEach((report) => {
      const item = document.createElement("li");
      item.className = report.status === "success" ? "success" : report.status === "warning" ? "warning" : "";
      item.innerHTML = `
        <strong>${report.title}</strong>
        <p>${report.text}</p>
        <span class="tag ${report.status === "success" ? "success" : report.status === "warning" ? "danger" : ""}">${report.timestamp}</span>
      `;
      reportListEl.appendChild(item);
    });
  }
};

const selectVillage = (id) => {
  state.selectedVillageId = id;
  villageSelect.value = id;
  renderAll();
};

const queueBuildingUpgrade = (villageId, buildingKey) => {
  const cost = buildingCosts[buildingKey];
  if (!canAfford(cost)) {
    alert("Nicht genug Ressourcen.");
    return;
  }
  spendResources(cost);
  state.buildQueue.push({
    type: "building",
    villageId,
    key: buildingKey,
    label: `${buildingKey} ausbauen`,
    remaining: cost.time
  });
  addReport("Bauauftrag", `${buildingKey} wird im Dorf vorbereitet.`, "info");
  renderAll();
};

const queueUnitTraining = (villageId, unitKey) => {
  const cost = unitCosts[unitKey];
  if (!canAfford(cost)) {
    alert("Nicht genug Ressourcen.");
    return;
  }
  spendResources(cost);
  state.resources.population += cost.pop;
  state.trainingQueue.push({
    type: "unit",
    villageId,
    key: unitKey,
    label: `${unitKey} ausbilden`,
    remaining: cost.time
  });
  addReport("Ausbildung", `${unitKey} werden ausgebildet.`, "info");
  renderAll();
};

const resolveQueue = () => {
  state.buildQueue.forEach((entry) => {
    entry.remaining -= 1;
  });
  state.trainingQueue.forEach((entry) => {
    entry.remaining -= 1;
  });

  const completedBuilds = state.buildQueue.filter((entry) => entry.remaining <= 0);
  const completedTraining = state.trainingQueue.filter((entry) => entry.remaining <= 0);

  state.buildQueue = state.buildQueue.filter((entry) => entry.remaining > 0);
  state.trainingQueue = state.trainingQueue.filter((entry) => entry.remaining > 0);

  completedBuilds.forEach((entry) => {
    const village = getVillageById(entry.villageId);
    if (!village) return;
    village.buildings[entry.key] += 1;
    if (entry.key === "storage") {
      state.resources.storage += 600;
    }
    addReport("Bau abgeschlossen", `${entry.key} wurde ausgebaut.`, "success");
  });

  completedTraining.forEach((entry) => {
    const village = getVillageById(entry.villageId);
    if (!village) return;
    village.units[entry.key] += entry.key === "rams" || entry.key === "cats" ? 1 : 5;
    addReport("Ausbildung abgeschlossen", `${entry.key} sind bereit.`, "success");
  });
};

const collectResources = () => {
  state.villages
    .filter((village) => village.owner === "player")
    .forEach((village) => {
      state.resources.wood += village.buildings.lumber * resourceIncome.lumber;
      state.resources.clay += village.buildings.clay * resourceIncome.clay;
      state.resources.iron += village.buildings.iron * resourceIncome.iron;
      state.resources.grain += village.buildings.farm * resourceIncome.farm;
    });
  clampResources();
};

const resolveAttacks = () => {
  state.plannedAttacks.forEach((attack) => {
    attack.remaining -= 1;
  });

  const landed = state.plannedAttacks.filter((attack) => attack.remaining <= 0);
  state.plannedAttacks = state.plannedAttacks.filter((attack) => attack.remaining > 0);

  landed.forEach((attack) => {
    const target = getVillageById(attack.targetId);
    if (!target) return;

    const attackPower = Object.keys(attack.units).reduce(
      (acc, key) => acc + attack.units[key] * attackStats[key].attack,
      0
    );
    const defensePower = Object.keys(target.units).reduce(
      (acc, key) => acc + target.units[key] * attackStats[key].defense,
      0
    );

    if (attack.type === "support") {
      Object.keys(attack.units).forEach((key) => {
        target.units[key] += attack.units[key];
      });
      addReport(
        "Unterstützung eingetroffen",
        `${attack.originName} unterstützt ${attack.targetName}.`,
        "success"
      );
      return;
    }

    if (attackPower > defensePower) {
      target.owner = "player";
      target.units = {
        spears: Math.max(10, Math.floor(attack.units.spears / 2)),
        swords: Math.max(5, Math.floor(attack.units.swords / 2)),
        axes: Math.max(5, Math.floor(attack.units.axes / 2)),
        scouts: Math.max(2, Math.floor(attack.units.scouts / 2)),
        lightCavalry: Math.max(2, Math.floor(attack.units.lightCavalry / 2)),
        heavyCavalry: Math.max(1, Math.floor(attack.units.heavyCavalry / 2)),
        rams: Math.max(1, Math.floor(attack.units.rams / 2)),
        cats: Math.max(0, Math.floor(attack.units.cats / 2))
      };
      addReport(
        "Sieg!",
        `${attack.originName} hat ${attack.targetName} erobert.`,
        "success"
      );
    } else {
      Object.keys(target.units).forEach((key) => {
        target.units[key] = Math.max(0, target.units[key] - Math.floor(attack.units[key] / 2));
      });
      addReport(
        "Angriff abgewehrt",
        `${attack.originName} konnte ${attack.targetName} nicht bezwingen.`,
        "warning"
      );
    }
  });
};

const resolveTrades = () => {
  state.tradeQueue.forEach((trade) => {
    trade.remaining -= 1;
  });

  const arrived = state.tradeQueue.filter((trade) => trade.remaining <= 0);
  state.tradeQueue = state.tradeQueue.filter((trade) => trade.remaining > 0);

  arrived.forEach((trade) => {
    state.resources.wood += trade.payload.wood;
    state.resources.clay += trade.payload.clay;
    state.resources.iron += trade.payload.iron;
    state.resources.grain += trade.payload.grain;
    addReport("Handel abgeschlossen", "Karawane ist eingetroffen.", "success");
  });
  clampResources();
};

const scheduleTrade = () => {
  const payload = {
    wood: Number.parseInt(document.getElementById("tradeWood").value, 10) || 0,
    clay: Number.parseInt(document.getElementById("tradeClay").value, 10) || 0,
    iron: Number.parseInt(document.getElementById("tradeIron").value, 10) || 0,
    grain: Number.parseInt(document.getElementById("tradeGrain").value, 10) || 0
  };

  const total = Object.values(payload).reduce((acc, value) => acc + value, 0);
  if (total === 0) {
    alert("Bitte Ressourcen für den Handel wählen.");
    return;
  }

  state.tradeQueue.push({
    payload,
    label: "Karawane unterwegs",
    remaining: 2
  });
  addReport("Handel gestartet", "Eine Karawane wurde entsendet.", "info");
  renderAll();
};

const processResearch = () => {
  if (state.researchPoints < 40) {
    alert("Nicht genug Forschungspunkte.");
    return;
  }
  state.researchPoints -= 40;
  addReport("Forschung", "Ein neuer Waffenbonus wurde entwickelt.", "success");
  renderAll();
};

const trainNoble = () => {
  if (state.resources.grain < 200 || state.resources.iron < 200) {
    alert("Nicht genug Ressourcen für einen Adeligen.");
    return;
  }
  state.resources.grain -= 200;
  state.resources.iron -= 200;
  state.nobles += 1;
  addReport("Adeliger", "Ein neuer Adeliger steht bereit.", "success");
  renderAll();
};

const upgradeWall = () => {
  const village = getVillageById(state.selectedVillageId);
  if (!village) return;
  queueBuildingUpgrade(village.id, "wall");
};

const upgradeMarket = () => {
  const village = getVillageById(state.selectedVillageId);
  if (!village) return;
  queueBuildingUpgrade(village.id, "market");
};

attackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const originId = originSelect.value;
  const targetId = targetSelect.value;
  const attackType = document.getElementById("attackType").value;
  const originVillage = getVillageById(originId);
  const targetVillage = getVillageById(targetId);
  if (!originVillage || !targetVillage) return;

  const units = {
    spears: Number.parseInt(document.getElementById("attackSpears").value, 10) || 0,
    swords: Number.parseInt(document.getElementById("attackSwords").value, 10) || 0,
    axes: Number.parseInt(document.getElementById("attackAxes").value, 10) || 0,
    scouts: Number.parseInt(document.getElementById("attackScouts").value, 10) || 0,
    lightCavalry: Number.parseInt(document.getElementById("attackLight").value, 10) || 0,
    heavyCavalry: Number.parseInt(document.getElementById("attackHeavy").value, 10) || 0,
    rams: Number.parseInt(document.getElementById("attackRams").value, 10) || 0,
    cats: Number.parseInt(document.getElementById("attackCats").value, 10) || 0
  };

  const hasUnits = Object.values(units).some((value) => value > 0);
  if (!hasUnits) {
    alert("Bitte Einheiten auswählen.");
    return;
  }

  const insufficient = Object.keys(units).some((key) => units[key] > originVillage.units[key]);
  if (insufficient) {
    alert("Nicht genug Einheiten im Dorf.");
    return;
  }

  Object.keys(units).forEach((key) => {
    originVillage.units[key] -= units[key];
  });

  const typeLabel =
    attackType === "raid"
      ? "Plünderung"
      : attackType === "assault"
      ? "Voller Angriff"
      : "Unterstützung";

  state.plannedAttacks.push({
    originId,
    originName: originVillage.name,
    targetId,
    targetName: targetVillage.name,
    units,
    remaining: attackType === "raid" ? 1 : 2,
    type: attackType,
    typeLabel
  });

  addReport("Angriff geplant", `${originVillage.name} -> ${targetVillage.name}`, "info");
  attackForm.reset();
  renderAll();
});

endTurnButton.addEventListener("click", () => {
  collectResources();
  resolveQueue();
  resolveTrades();
  resolveAttacks();
  state.researchPoints += 10;
  renderAll();
});

toggleHelpButton.addEventListener("click", () => {
  helpPanel.classList.remove("hidden");
});

closeHelpButton.addEventListener("click", () => {
  helpPanel.classList.add("hidden");
});

researchButton.addEventListener("click", processResearch);
trainNobleButton.addEventListener("click", trainNoble);
upgradeWallButton.addEventListener("click", upgradeWall);
upgradeMarketButton.addEventListener("click", upgradeMarket);
submitTradeButton.addEventListener("click", scheduleTrade);

villageSelect.addEventListener("change", (event) => {
  selectVillage(event.target.value);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab);
  });
});

const setActiveTab = (target) => {
  tabs.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === target));
  tabPanels.forEach((panel) => {
    panel.style.display = panel.dataset.tabPanel === target ? "block" : "none";
  });
};

const renderAll = () => {
  renderResources();
  renderStats();
  renderMap();
  renderQueues();
  renderVillageDetails();
  renderAttackPlanner();
  renderTrades();
  renderReports();
};

setActiveTab("overview");
renderAll();
