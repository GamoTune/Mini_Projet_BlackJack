class Game {
    constructor() {
        this.couleurs = ['Coeur', 'Carreau', 'Trèfle', 'Pique']; // Les couleurs
        this.valeurs = ['AS', 'Roi', 'Dame', 'Valet', // Les valeurs
            'Dix', 'Neuf', 'Huit', 'Sept', 'Six',
            'Cinq', 'Quatre', 'Trois', 'Deux'];
        this.cartes = []; // Les cartes du jeu global
        this.infos = {
            joueur: {
                cartes: [],
                score: 0
            },
            banque: {
                cartes: [],
                score: 0
            },
            etat: 'Partie en cours' // L'état de la partie
        };

    }

    newGame() {
        this.cartes = this.creerCartes();
        this.cartes = this.melangerCartes(this.cartes);

        this.infos.joueur.cartes = [this.piocherCarte(), this.piocherCarte()];
        this.infos.banque.cartes = [this.piocherCarte(), this.piocherCarte()];
        this.infos.joueur.score = this.calculerScore(this.infos.joueur.cartes);
        this.infos.banque.score = this.calculerScore(this.infos.banque.cartes);

        return this.infoForEmbed();
    }

    creerCartes() {
        let cartes = [];
        for (let couleur of this.couleurs) {
            for (let valeur of this.valeurs) {
                cartes.push({ valeur: valeur, couleur: couleur });
            }
        }
        return cartes;
    }

    melangerCartes(cartes) {
        let i = cartes.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = cartes[j];
            cartes[j] = cartes[i];
            cartes[i] = temp;
        }
        return cartes;
    }

    piocherCarte() {
        return this.cartes.shift();
    }

    calculerScore(cartes) {
        let score = 0;
        let as = 0;
        for (let carte of cartes) {
            if (carte.valeur === 'AS') {
                as += 1;
            }
            score += this.getNumericValue(carte);
        }
        while (score > 21 && as) {
            score -= 10;
            as -= 1;
        }
        return score;
    }

    hit() {
        this.infos.joueur.cartes.push(this.piocherCarte());
        this.infos.joueur.score = this.calculerScore(this.infos.joueur.cartes);
        this.infos.banque.cartes.push(this.piocherCarte());
        this.infos.banque.score = this.calculerScore(this.infos.banque.cartes);
        if (this.infos.joueur.score > 21) {
            this.infos.etat = 'perdu';
        }
        if (this.infos.banque.score > 21) {
            this.infos.etat = 'gagné';
        }

        return this.infoForEmbed();
    }

    stay() {
        while (this.infos.banque.score < 17) {
            this.infos.banque.cartes.push(this.piocherCarte());
            this.infos.banque.score = this.calculerScore(this.infos.banque.cartes);
        }
        if (this.infos.banque.score > 21) {
            this.infos.etat = 'gagné';
        } else if (this.infos.banque.score >= this.infos.joueur.score) {
            this.infos.etat = 'perdu';
        } else {
            this.infos.etat = 'gagné';
        }
        return this.infoForEmbed();
    }

    listToStr(lst) {
        let strLst = [];
        for (let i = 0; i < lst.length; i++) {
            strLst.push(lst[i].valeur + " de " + lst[i].couleur);
        }
        return strLst;
    }

    infoForEmbed() {
        let new_infos = {};
        new_infos.etat = this.infos.etat;
        new_infos.joueur = {};
        new_infos.joueur.cartes = this.listToStr(this.infos.joueur.cartes);
        new_infos.joueur.score = this.infos.joueur.score;
        new_infos.banque = {};
        new_infos.banque.cartes = this.listToStr(this.infos.banque.cartes);
        new_infos.banque.score = this.infos.banque.score;
        return new_infos;
    }

    getNumericValue(card) {
        switch (card.valeur) { // On regarde la valeur de la carte
            case 'AS': // Si c'est un as
                return 11; // On retourne 2
            case 'Deux': // Si c'est un deux
                return 2; // On retourne 2
            case 'Trois': //Etc
                return 3;
            case 'Quatre':
                return 4;
            case 'Cinq':
                return 5;
            case 'Six':
                return 6;
            case 'Sept':
                return 7;
            case 'Huit':
                return 8;
            case 'Neuf':
                return 9;
            default:
                return 10;
        }
    }
}

module.exports = { Game }