import styled from "styled-components";
import { CompactTable } from '@table-library/react-table-library/compact';

/* {
    "C_digo": null,
    "Verbete": "aba",
    "verbeteIngles": null,
    "num": null,
    "indice": null,
    "cabeca_simb": null,
    "rubrica": null,
    "grupo": null,
    "classeGram": "s",
    "genero_num": "f",
    "volp": null,
    "fontes": null,
    "remissivaComplementar": null,
    "remissivaImperativa": null,
    "definicao": "(1) Qualquer prolongamento de telhado além da prumada externa; beiral. \n(2) peça de madeira usada no arremate da junção entre a parede e o teto de madeira\n(3) peça saliente em obras de alvenaria, carpintaria, serralheria, cantaria etc.",
    "f_rmula": null,
    "topicoIluminacaoNatural": null,
    "locucao_expressoes": "v. aba corrida\n",
    "etimologiaBruto": null,
    "ortoepia": null,
    "plural": null,
    "sinonimosVariantes": "beiral",
    "antonimos": null,
    "achega": null,
    "exemplo": null,
    "abonacao_citacoes_adagios": null,
    "outrasLinguas": null,
    "fig": null,
    "comentariosExtraBrutos": null,
    "comentariosExtraEditados": null,
    "obsrcc": null,
    "voceSabia": null,
    "id": 1
} */

const COLUMNS = [
    { label: 'Código', renderCell: (item) => item.name },
    { label: 'Verbete', renderCell: (item) => item.name },
    { label: 'Verbete em Inglês', renderCell: (item) => item.name },
    { label: 'Num', renderCell: (item) => item.name },
    { label: 'Índice', renderCell: (item) => item.name },
    { label: 'Cabeça/Símbolo', renderCell: (item) => item.name },
    { label: 'Rubrica', renderCell: (item) => item.name },
    { label: 'Grupo', renderCell: (item) => item.name },
    { label: 'Classe Gramatical', renderCell: (item) => item.name },
    { label: 'Gênero/Número', renderCell: (item) => item.name },
    { label: 'Volp', renderCell: (item) => item.name },
    { label: 'Fontes', renderCell: (item) => item.name },
    { label: 'Remissiva Complementar', renderCell: (item) => item.name },
    { label: 'Remissiva Imperativa', renderCell: (item) => item.name },
    { label: 'Definição', renderCell: (item) => item.name },
    { label: 'Fórmula', renderCell: (item) => item.name },
    { label: 'Tópico de Iluminação Natural', renderCell: (item) => item.name },
    { label: 'Locução/Expressões', renderCell: (item) => item.name },
    { label: 'Etimologia Bruto', renderCell: (item) => item.name },
    { label: 'Ortoepia', renderCell: (item) => item.name },
    { label: 'Plural', renderCell: (item) => item.name },
    { label: 'Sinônimos Variantes', renderCell: (item) => item.name },
    { label: 'Antônimos', renderCell: (item) => item.name },
    { label: 'Achega', renderCell: (item) => item.name },
    { label: 'Exemplo', renderCell: (item) => item.name },
    { label: 'Abonação/Citações/Adágios', renderCell: (item) => item.name },
    { label: 'Outras Línguas', renderCell: (item) => item.name },
    { label: 'Fig', renderCell: (item) => item.name },
    { label: 'Comentários Extra Brutos', renderCell: (item) => item.name },
    { label: 'Comentários Extra Editados', renderCell: (item) => item.name },
    { label: 'OBSRCC', renderCell: (item) => item.name },
    { label: 'Você Sabia', renderCell: (item) => item.name },

]

export default function AdminPage({ showSidebar, setShowSidebar }){
    return(
        <>
        <CompactTable columns={COLUMNS}/>
        </>
    )
}

