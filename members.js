/* members.js — Centralausschuss Zofingia HSG 2026–2027
   All member data. Facts keys are objects with de/fr translations.
*/

const members = {

  m1: {
    photo:    'assets/photos/Zlugi2.jpeg',
    vulgo:    'Z!ugtzwang',
    realname: 'Luis Nägelin',
    func:     { de: 'Centralpräsident',   fr: 'Président central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Volkswirtschaftslehre (MEcon) / PhD in Economics',
               fr: 'Master en sciences économiques (MEcon) / Doctorat en économie' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '27', fr: '27' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Einen NZZ Artikel veröffentlichen.',
               fr: 'Publier un article dans la NZZ.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Mein Studium noch länger zu machen.',
               fr: 'Pour prolonger encore un peu mes études.' }
      }
    ]
  },

  m2: {
    photo:    'assets/photos/Der gutaussehende ZIone.jpg',
    vulgo:    'Z!one',
    realname: 'Jan Huber',
    func:     { de: 'Centralaktuar', fr: 'Secrétaire central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Business Innovation (MBI) / Hot Shot @ Helvetia',
               fr: 'Master en innovation commerciale (MBI) / Cadre ambitieux @ Helvetia' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '30', fr: '30' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Complete "The Seven Summits".',
               fr: 'Gravir les sept sommets.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Um mit meinen Herzbrüdern nochmals eine steile Zeit zu haben, bevor ich alt und grau bin.',
               fr: 'Pour passer encore du bon temps avec mes frères de cœur avant de devenir vieux et grisonnant.' }
      }
    ]
  },

  m3: {
    photo:    'assets/photos/Gnüss-Linn.jpg',
    vulgo:    'Gnüss-Linn',
    realname: 'Silvan Stöckli',
    func:     { de: 'Centralquästor', fr: 'Trésorier central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Business Innovation (MBI) / Big Time Consulting @ Detecon',
               fr: 'Master en innovation commerciale (MBI) / Grand consultant @ Detecon' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '29', fr: '29' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Einen unentdeckten Schatz finden und verprassen (z.B. auf den Konten des CAus).',
               fr: 'Trouver un trésor inexploré et le dilapider (par exemple sur les comptes du CC).' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Eine gute Ausrede um unter der Woche Bier zu trinken.',
               fr: 'Une bonne excuse pour boire de la bière en semaine.' }
      }
    ]
  },

  m4: {
    photo:    'assets/photos/FIXI.jpeg',
    vulgo:    'fiXibus',
    realname: 'Philipp Umbricht',
    func:     { de: 'Centralfest Morpion', fr: 'Morpion de fête-central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Business Innovation (MBI)',
               fr: 'Master en innovation commerciale (MBI)' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '25', fr: '25' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Ein Haus am See und meine 100 Enkel spielen Cricket aufm Rasen.',
               fr: 'Une maison au bord du lac avec mes 100 petits-enfants jouant au cricket sur la pelouse.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Der weisse Weinzipfel!',
               fr: 'Le bout de ruban blanc!' }
      }
    ]
  },

  m5: {
    photo:    'assets/photos/QCT.jpeg',
    vulgo:    'Que-ce-tus',
    realname: 'Marc von Rotz',
    func:     { de: 'Centralseminar Morpion', fr: 'Morpion de séminaire-central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Accounting und Corporate Finance (MACFin) / Fusionierer @ Helvetia Consulting',
               fr: 'Master en comptabilité et finance d\'entreprise (MACFin) / Spécialiste en fusions @ Helvetia Consulting' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '24', fr: '24' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Auf Inside Paradeplatz namentlich erwähnt werden.',
               fr: 'Être mentionné nommément sur Inside Paradeplatz.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'CAus Spesen',
               fr: 'Les notes de frais du CC.' }
      }
    ]
  },

  m6: {
    photo:    'assets/photos/Zdi.jpg',
    vulgo:    'Z!de-nix',
    realname: 'Lars Holenstein',
    func:     { de: 'Centralblatt Morpion', fr: 'Morpion de journal central' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Marketing Management (MiMM) / Jobsuche',
               fr: 'Master en management du marketing (MiMM) / En recherche d\'emploi' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '28', fr: '28' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Das Championsleaguefinale besuchen.',
               fr: 'Assister à la finale de la Ligue des champions.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Das Centralblatt zur alten Grösse führen.',
               fr: 'Ramener le Centralblatt à sa gloire passée.' }
      }
    ]
  },

  m7: {
    photo:    'assets/photos/Torronté.jpeg',
    vulgo:    'Torronté',
    realname: 'Evan Kursner',
    func:     { de: 'Romand Morpion', fr: 'Morpion romand' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Bachelor International Affairs (BIA) / Praktikum SECO',
               fr: 'Bachelor en affaires internationales (BIA) / Stage au SECO' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '23', fr: '23' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Mit dem Segelboot um die Welt segeln.',
               fr: 'Faire le tour du monde en voilier.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'Die Romandie repräsentieren und den Röstigraben überwinden.',
               fr: 'Représenter les romands et casser le Röstigraben.' }
      }
    ]
  },

  m8: {
    photo:    'assets/photos/Kaschmir.jpg',
    vulgo:    'Kaschmir',
    realname: 'Vittore Osele',
    func:     { de: 'Central GFA Herrscher', fr: 'Maître central GFA' },
    facts: [
      {
        key: { de: 'Studium / Arbeit', fr: 'Études / Travail' },
        val: { de: 'Master in Rechtswissenschaft (MLaw) / Substitut bei Advoro',
               fr: 'Master en droit (MLaw) / Substitut chez Advoro' }
      },
      {
        key: { de: 'Alter', fr: 'Âge' },
        val: { de: '27', fr: '27' }
      },
      {
        key: { de: 'Träume', fr: 'Rêves' },
        val: { de: 'Meine engsten Freunde als Nachbarn zu haben.',
               fr: 'Avoir mes meilleurs amis comme voisins.' }
      },
      {
        key: { de: 'Motivation für den CAus', fr: 'Motivation pour le CC' },
        val: { de: 'BBS (mit den Besten Bier saufen).',
               fr: 'BBB (boire de la bière avec les meilleurs).' }
      }
    ]
  }

};
