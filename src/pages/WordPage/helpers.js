export function mapTabs(arr){
    return arr.map((e) => {
        if (e == "verbeteIngles") {
          return "Inglês";
        } else if (e == "num") {
          return "Num";
        } else if (e == "cabeca_simb") {
          return "Cabeça/Símbolo";
        } else if (e == "rubrica") {
          return "Rubrica";
        } else if (e == "grupo") {
          return "Grupo";
        } else if (e == "classeGram") {
          return "Classe Gramatical";
        } else if (e == "genero_num") {
          return "Gênero/Número";
        } else if (e == "volp") {
          return "Volp";
        } else if (e == "fontes") {
          return "Fontes";
        } else if (e == "remissivaComplementar") {
          return "Rem. Complementar";
        } else if (e == "remissivaImperativa") {
          return "Rem. Imperativa";
        } else if (e == "f_rmula") {
          return "Fórmula";
        } else if (e == "locucao_expressoes") {
          return "Locução/Expressões";
        } else if (e == "etimologiaBruto") {
          return "Etimologia";
        } else if (e == "plural") {
          return "Plural";
        } else if (e == "sinonimosVariantes") {
          return "Sinônimos/Variantes";
        } else if (e == "antonimos") {
          return "Antônimos";
        } else if (e == "achega") {
          return "Achega";
        } else if (e == "exemplo") {
          return "Exemplo";
        } else if (e == "abonacao_citacoes_adagios") {
          return "Abonação/Citações/Adágios";
        } else if (e == "fig") {
          return "Fig";
        } else if (e == "comentariosExtraBrutos") {
          return "Comentários Extras";
        } else if (e == "comentariosExtraEditados") {
          return "Comentários Extras";
        } else if (e == "voceSabia") {
          return "Você sabia?";
        } else if (e == "ortoepia") {
          return "Ortoépia";
        }
      });
}


export const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        partialVisibilityGutter: 170 // this is needed to tell the amount of px that should be visible.
      }
    }

export const ColumnsToName = {
  verbeteIngles: "Inglês",
  num: "Num",
  cabeca_simb: "Cabeça/Símbolo",
  rubrica: "Rubrica",
  grupo: "Grupo",
  classeGram: "Classe Gramatical",
  genero_num: "Gênero/Número",
  volp: "Volp",
  fontes: "Fontes",
  remissivaComplementar: "Rem. Complementar",
  remissivaImperativa: "Rem. Imperativa",
  f_rmula: "Fórmula",
  locucao_expressoes: "Locução/Expressões",
  etimologiaBruto: "Etimologia",
  plural: "Plural",
  sinonimosVariantes: "Sinônimos/Variantes",
  antonimos: "Antônimos",
  achega: "Achega",
  exemplo: "Exemplo",
  abonacao_citacoes_adagios: "Abonação/Citações/Adágios",
  fig: "Fig",
  comentariosExtraBrutos: "Comentários Extras",
  comentariosExtraEditados: "Comentários Extras",
  voceSabia: "Você sabia?",
  ortoepia: "Ortoépia",
}

export const NameToColumns = {
  Inglês: "verbeteIngles",
  Num: "num",
  "Cabeça/Símbolo": "cabeca_simb",
  Rubrica: "rubrica",
  Grupo: "grupo",
  "Classe Gramatical": "classeGram",
  "Gênero/Número": "genero_num",
  Volp: "volp",
  Fontes: "fontes",
  "Rem. Complementar": "remissivaComplementar",
  "Rem. Imperativa": "remissivaImperativa",
  Fórmula: "f_rmula",
  "Locução/Expressões": "locucao_expressoes",
  Etimologia: "etimologiaBruto",
  Plural: "plural",
  "Sinônimos/Variantes": "sinonimosVariantes",
  Antônimos: "antonimos",
  Achega: "achega",
  Exemplo: "exemplo",
  "Abonação/Citações/Adágios": "abonacao_citacoes_adagios",
  Fig: "fig",
  "Comentários Extras": ["comentariosExtraBrutos", "comentariosExtraEditados"],
  "Você sabia?": "voceSabia",
  Ortoépia: "ortoepia",
  Descrição: "descricao"
};
