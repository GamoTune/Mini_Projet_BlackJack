<!doctype html>
<html lang="en" data-bs-theme="auto">
  <head><script src="assets/js/color-modes.js"></script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>Score BlackJack</title>

    <link rel="canonical" href="index.html"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
    <link href="assets/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Style customisé (provient d'une bibliothèque (Bootstrap)) -->
    <link href="blackjack.css" rel="stylesheet">
  </head>
  <body> 
    <!-- Barre de navigation -->
    <div class="top-navigation">
      <!-- Svg - visuel de la sélection des thèmes : sombre ou pas -->
      <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
        <symbol id="check2" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </symbol>
        <symbol id="circle-half" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
        </symbol>
        <symbol id="moon-stars-fill" viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
        </symbol>
        <symbol id="sun-fill" viewBox="0 0 16 16">
          <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </symbol>
      </svg>

      <!-- Menu de navigation -->
      <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <!-- Bouton menu navigation en mobile -->
        <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                id="bd-theme"
                type="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                aria-label="Toggle theme (auto)">
          <svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
          <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
        <!-- Contenu du menu de séléction de thèmes -->
        <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
              <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#sun-fill"></use></svg>
              Light
              <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
              <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
              Dark
              <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
              <svg class="bi me-2 opacity-50" width="1em" height="1em"><use href="#circle-half"></use></svg>
              Auto
              <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
        </ul>
      </div>

      <!-- Contenu du menu de navigation -->    
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="assets/img/logo-small.png" class="img-fluid" alt="BlackJack Logo" /><span>BlackJack</span></a>
        </div>
      </nav>
    </div>
    <!-- Contenu de la page (en 2 colonnes) -->
    <main class="table">
      <?php
      // Ouverture du fichier des scores     
      $filePath = get_template_directory_uri().'/scores.txt'; 

      // Fonction pour convertir les cartes en chiffres et symboles
      function convertCardName($cardName) {
          $nameMapping = [
              "As" => "A",
              "Un" => "1",
              "Deux" => "2",
              "Trois" => "3",
              "Quatre" => "4",
              "Cinq" => "5",
              "Six" => "6",
              "Sept" => "7",
              "Huit" => "8",
              "Neuf" => "9",
              "Dix" => "10",
              "Valet" => "J",
              "Dame" => "Q",
              "Roi" => "K",
              "Pique" => "♠",
              "Coeur" => "♥",
              "Trèfle" => "♣",
              "Carreau" => "♦"
          ];

          // Réarrangement des cartes pour mieux les afficher
          $parts = explode(' ', $cardName);
          // Initialisation du tableau avec les éléments convertis par la fonction
          $convertedParts = [];
          foreach ($parts as $part) {
              if (array_key_exists($part, $nameMapping)) {
                  $convertedParts[] = '<span>'.$nameMapping[$part].'</span>';
              } 
              /*else {
                  $convertedParts[] = $part;
              }*/
          }

          // Fusion de chaque couple chiffre/symboles en un seul str
          return implode('', $convertedParts);
      }

      //Initialisation variables total scores wins et losses
      $sumJoueurWon = 0;
      $sumBanqueWon = 0;
      $sumParties = 0;

      // Lecture du fichier
      $fileName = get_template_directory_uri().'/scores.txt';
      $handle = fopen($fileName, "r");

      if ($handle) {
        // Si il y a résultat(s) :
        ?>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-8">
              <?php
                while (($line = fgets($handle)) !== false) {
                    // Décodage du JSON
                    $data = json_decode($line, true);
                    // Vérification de victoire/défaite
                    $etat = $data['etat'];
                    if($etat == 'gagné') {
                      // Si c'est gagné, on attribue la classe "gagne" à une div "resultats" et on ajoute 1 aux parties totales et gagnées
                      $class_partie = "gagne";
                      $sumJoueurWon++;
                      $sumParties++;
                    }
                    else {
                      // Vice versa
                      $class_partie = "perdu";
                      $sumBanqueWon++;
                      $sumParties++;
                    }

                    $joueurScore = $data['joueur']['score'];
                    $banqueScore = $data['banque']['score'];

                    foreach ($data['joueur']['cartes'] as &$card) {
                        $card = convertCardName($card);
                    }
                    foreach ($data['banque']['cartes'] as &$card) {
                        $card = convertCardName($card);
                    }
                    
                    ?>
                    <!-- Création du tableau de scores, une partie = une ligne (soit : 1 div.resultats = 1 partie) -->
                    <div class="resultats <?php echo $class_partie;?>"> 
                      <div class="row">
                        <div class="col-6">
                          <div class="joueur">
                            <div class="row">
                              <div class="col-3 picto-img-align">
                                <div class="joueur-img">
                                  <img src="assets/img/player.png" class="img-fluid rounded-circle" alt="Image du joueur" />
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="joueur-cartes">
                                  <div class="row">
                                    <?php
                                    foreach ($data['joueur']['cartes'] as $card) {
                                      echo "<div class='col-6'>" . $card . "</div>";
                                    }
                                    ?>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 picto-img-align">
                                <div class="joueur-score">
                                  <span><?php echo $joueurScore;?></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="bot">
                            <div class="row">
                              <div class="col-3 picto-img-align">
                                <div class="bot-img">
                                  <img src="assets/img/bot.png" class="img-fluid rounded-circle" alt="Image du bot" />
                                </div>
                              </div>
                              <div class="col-3">
                                <div class="bot-cartes">
                                  <div class="row">                                    
                                    <?php
                                    foreach ($data['banque']['cartes'] as $card) {
                                      echo "<div class='col-6'>" . $card . "</div>";
                                    }
                                    ?>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 picto-img-align">
                                <div class="bot-score">
                                  <span><?php echo $banqueScore;?></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?php
                }
                fclose($handle);
              ?>
            </div>
            <!-- Création d'une colonne récapitulative de tous les résultats -->
            <div class="col-12 col-md-4">
              <div class="smol rounded-3">
                <div class="wins">
                  <div class="row">
                    <div class="col-6">
                      <div class="wins-img">
                        <img class="img-fluid rounded-3" src="assets/img/wins.png" alt="image de wins" />
                      </div>
                    </div>
                    <div class="col-6">                    
                      <div class="wins-text">
                        <span><?php echo $sumJoueurWon?></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="losses">
                  <div class="row">
                    <div class="col-6">
                      <div class="losses-img">
                        <img class="img-fluid rounded-3" src="assets/img/losses.png" alt="image de losses" />
                      </div>
                    </div>
                    <div class="col-6">                    
                      <div class="losses-text">
                        <span><?php echo $sumBanqueWon?></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="total">
                  <div class="total-text">Total: <?php echo $sumParties?></div>
                  <div class="ratio-value">Ratio: <?php echo ($sumJoueurWon/$sumParties)*100?>% de victoires</div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
        <?php
      } else {
          ?>
          <div class="container">
            <p>Aucun résultat pour le moment</p>
          </div>
          <?php
      }
      ?>
    </main>
    <script src="assets/dist/js/bootstrap.bundle.min.js"></script>

    </body>
</html>
