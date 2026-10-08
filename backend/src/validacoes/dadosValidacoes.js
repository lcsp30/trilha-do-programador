
const brasil = {
    "1" : {
        "entradas" : {
            "t01" : [],
        },
        "saidas" : {
            "t01" : ["Olá Mundo!"]
        }
    },
    "2" : {
        "entradas" : {
            "t01" : [1, 1],
            "t02" : [2, 9],
            "t03" : [1, 10],
            "t04" : [4, 4],
            "t05" : [3, 3],
        },
        "saidas" : {
            "t01" : [2],
            "t02" : [11],
            "t03" : [11],
            "t04" : [8],
            "t05" : [6],
        }
    },
    "3" : {
        "entradas" : {
            "t01" : [10, 4],
            "t02" : [20, 7],
            "t03" : [5, 5],
            "t04" : [50, 12],
            "t05" : [30, 10],
        },
        "saidas" : {
            "t01" : [6],
            "t02" : [13],
            "t03" : [0],
            "t04" : [38],
            "t05" : [20],
        }
    },
    "4" : {
        "entradas" : {
            "t01" : [3, 4],
            "t02" : [2, 5],
            "t03" : [6, 6],
            "t04" : [10, 3],
            "t05" : [7, 2],
        },
        "saidas" : {
            "t01" : [12],
            "t02" : [10],
            "t03" : [36],
            "t04" : [30],
            "t05" : [14],
        }
    },
    "5" : {
        "entradas" : {
            "t01" : [20, 5],
            "t02" : [100, 10],
            "t03" : [15, 3],
            "t04" : [24, 6],
            "t05" : [81, 9],
        },
        "saidas" : {
            "t01" : [4],
            "t02" : [10],
            "t03" : [5],
            "t04" : [4],
            "t05" : [9],
        }
    }
}



export function dadosValidacoes(pais, numero_desafio){
    switch(pais){
        case "brasil":
        return brasil[numero_desafio];
        default:
         return "nenhum pais";
    }
}