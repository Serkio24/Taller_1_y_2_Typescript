import { Serie } from "./serie.js";
import { dataSeries } from "./dataSeries.js";

let seriesTBody: HTMLElement = document.getElementById("series")!;
let promedioTemporadas: HTMLElement = document.getElementById("promedio-label")!;
const detailCard: HTMLElement = document.getElementById("serie-detail")!;

renderSeriesInTable(dataSeries);
getPromedioTemporadas(dataSeries);

function renderSeriesInTable(series: Serie[]): void {
  seriesTBody.innerHTML = ""; // limpiar por si acaso
  series.forEach((serie, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>
        <a href="#" class="serie-link" data-index="${i}">
          ${serie.name}
        </a>
      </td>
      <td>${serie.canal}</td>
      <td class="text-right">${serie.temporadas}</td>
    `;
    seriesTBody.appendChild(tr);
  });
  
  enableRowClicks(series);
}

function getPromedioTemporadas(series: Serie[]): void {
  const total = series.reduce((acc, s) => acc + s.temporadas, 0);
  const promedio = total / series.length;
  promedioTemporadas.textContent = promedio.toFixed(2);
}

function enableRowClicks(series: Serie[]): void {
  seriesTBody.addEventListener("click", (ev) => {
    const a = (ev.target as HTMLElement).closest("a.serie-link") as HTMLAnchorElement | null;
    if (!a) return;

    ev.preventDefault();
    const idx = Number(a.dataset.index);
    const serie = series[idx];
    if (serie) {
      renderDetail(serie);
    }
  });
}


function renderDetail(serie: Serie): void {
  detailCard.classList.remove("d-none");
  detailCard.innerHTML = `
    ${serie.poster ? `<img src="${serie.poster}" class="card-img-top" alt="${serie.name}">` : ""}
    <div class="card-body">
      <h5 class="card-title">${serie.name}</h5>
      <p class="card-text">
        ${serie.descripcion ?? "Sin descripción disponible."}
      </p>
      <p class="card-text">
        <small class="text-muted">
          Estudio: <strong>${serie.canal}</strong> &nbsp;•&nbsp;
          Temporadas: <strong>${serie.temporadas}</strong>
        </small>
      </p>
      ${
        serie.url
          ? `<a href="${serie.url}" target="_blank" rel="noopener" class="card-link">Página en Crunchyroll</a>`
          : ""
      }
    </div>
  `;
}
