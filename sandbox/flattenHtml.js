const DomParser = require('dom-parser')

const html = `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html lang="fr" dir="ltr" prefix="content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ og: http://ogp.me/ns# rdfs: http://www.w3.org/2000/01/rdf-schema# sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#">
<head profile="http://www.w3.org/1999/xhtml/vocab">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="https://www.transilien.com/sites/all/themes/custom/transilien/favicon.ico" type="image/vnd.microsoft.icon" />
<meta name="generator" content="Drupal 7 (http://drupal.org)" />
<link rel="canonical" href="https://www.transilien.com/fr" />
<link rel="shortlink" href="https://www.transilien.com/fr" />
      <title>Home | Transilien </title>
  
  <link type="text/css" rel="stylesheet" href="https://www.transilien.com/sites/default/files/css/css_lQaZfjVpwP_oGNqdtWCSpJT1EMqXdMiU84ekLLxQnc4.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.transilien.com/sites/default/files/css/css_VveUJilvmNfGbfqnmjite96uRUtFXctHKcQ1q625ie4.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.transilien.com/sites/default/files/css/css_Wu8npAzy16WmnnnWKxpexfgsAryolGGaX6yO3GWA5bU.css" media="all" />
<style>.carousel-1304{background-color:#009AA6 !important;}
.carousel-1299{background-color:#7BB64A !important;}
.carousel-1272{background-color:#A1006B !important;}
.carousel-1302{background-color:#6B2E78 !important;}
.carousel-1305{background-color:#7BB64A !important;}
.carousel-1307{background-color:#A1006B !important;}
</style>
<link type="text/css" rel="stylesheet" href="https://www.transilien.com/sites/default/files/css/css_IPZIoLz95jawqe4rR8r2kJeAuAiRRwwVobF40p18WYI.css" media="all" />
<style>@media screen and (min-width:768px){.carousel-control .icon-next.glyphicon-chevron-right:before{content:"\e080";}}@media screen and (max-width:767px){.carousel-control .icon-next.glyphicon-chevron-right:before{content:"\e080";}}
</style>

<!--[if lte IE 8]>
<link type="text/css" rel="stylesheet" href="https://www.transilien.com/sites/all/themes/charte/css/my/ie8.css?oydbgz" media="all" />
<![endif]-->

  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <script src="https://www.transilien.com/sites/all/modules/contrib/jquery_update/replace/jquery/1.11/jquery.min.js?v=1.11.2"></script>
<script src="https://www.transilien.com/misc/jquery.once.js?v=1.2"></script>
<script src="https://www.transilien.com/misc/drupal.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/default/files/languages/fr_WTFWShA4-s9GdA1wHFdTB8Md8EfBtU2RMrTAvYAFwCs.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/modules/custom/tratabs/tra_element_activation/theme/js/tra_usabilla.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/modules/custom/tratabs/tra_element_activation/theme/js/tra_chat_eptica.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/modules/contrib/field_group/field_group.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/modules/contrib/makeupbootstrap/js/carouselbuttons.js?oydbgz"></script>
<script>jQuery.extend(Drupal.settings, {"basePath":"\/","pathPrefix":"fr\/","ajaxPageState":{"theme":"transilien","theme_token":"28r1FfopFTwEtuM_CUDx1YrYLqgoRzdJhfzvydEz3so","js":{"sites\/all\/themes\/contrib\/bootstrap\/js\/bootstrap.js":1,"sites\/all\/themes\/charte\/js\/lib\/bootstrap\/bootstrap.min.js":1,"sites\/all\/themes\/charte\/js\/lib\/perfect-scrollbar\/perfect-scrollbar.min.js":1,"sites\/all\/themes\/charte\/js\/lib\/bootstrap-select\/bootstrap-select.min.js":1,"sites\/all\/themes\/charte\/js\/lib\/Swapsies\/Swapsies.js":1,"sites\/all\/themes\/charte\/js\/lib\/jquery-ui\/jquery-ui.min.js":1,"sites\/all\/themes\/custom\/transilien\/js\/custom.js":1,"sites\/all\/themes\/custom\/transilien\/js\/taggages.js":1,"sites\/all\/themes\/custom\/transilien\/js\/accessibility.js":1,"sites\/all\/modules\/contrib\/jquery_update\/replace\/jquery\/1.11\/jquery.min.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"public:\/\/languages\/fr_WTFWShA4-s9GdA1wHFdTB8Md8EfBtU2RMrTAvYAFwCs.js":1,"sites\/all\/modules\/custom\/tratabs\/tra_element_activation\/theme\/js\/tra_usabilla.js":1,"sites\/all\/modules\/custom\/tratabs\/tra_element_activation\/theme\/js\/tra_chat_eptica.js":1,"sites\/all\/modules\/contrib\/field_group\/field_group.js":1,"sites\/all\/modules\/contrib\/makeupbootstrap\/js\/carouselbuttons.js":1},"css":{"modules\/system\/system.base.css":1,"sites\/all\/modules\/contrib\/date\/date_api\/date.css":1,"sites\/all\/modules\/contrib\/date\/date_popup\/themes\/datepicker.1.7.css":1,"modules\/field\/theme\/field.css":1,"modules\/node\/node.css":1,"sites\/all\/modules\/contrib\/scald_file\/scald_file.css":1,"sites\/all\/modules\/contrib\/scald_text\/scald_text.css":1,"sites\/all\/modules\/contrib\/views\/css\/views.css":1,"sites\/all\/modules\/contrib\/ckeditor\/css\/ckeditor.css":1,"sites\/all\/modules\/contrib\/ctools\/css\/ctools.css":1,"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"sites\/all\/themes\/charte\/css\/bootstrap.css":1,"sites\/all\/themes\/charte\/css\/lib\/font-awesome.min.css":1,"sites\/all\/themes\/charte\/css\/custom.css":1,"sites\/all\/themes\/charte\/css\/my\/common\/common_bootstrap.css":1,"sites\/all\/themes\/charte\/css\/lib\/bootstrap-select.min.css":1,"sites\/all\/themes\/charte\/css\/admin.css":1,"sites\/all\/themes\/custom\/transilien\/css\/style.css":1,"sites\/all\/themes\/custom\/transilien\/css\/responsive.css":1,"6":1,"sites\/all\/themes\/charte\/css\/my\/ie8.css":1}},"field_group":{"link":"editorial","html-element":"diaporama","hidden":"default","div":"grand"},"bandeau":{"display":{"hd":{"connected":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1980_0.jpg","anonymous":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1980.jpg"},"desktop":{"connected":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1366_1.jpg","anonymous":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1366.jpg"},"mobile":{"connected":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1366_2.jpg","anonymous":"https:\/\/www.transilien.com\/sites\/default\/files\/bandeaux_hp\/visuel_hp_1_1366_0.jpg"}},"msg":{"message":{"connected":"C\u0027est un plaisir de\u003Cbr\/\u003Evous revoir","anonymous":"Est tous les jours\u003Cbr\/\u003E \u00e0 vos c\u00f4t\u00e9s"},"welcome_msg":{"connected":"Bonjour ","anonymous":"Transilien "}},"redirection":{"connected":{"link":"","target":0},"anonymous":{"link":"","target":0}},"period":"week"},"diapo_ids":[{"target_id":"1304","title":"FAITES DES \u00c9CONOMIES AVEC LES FORFAITS ETUDIANTS PARIS IDF"},{"target_id":"1299","title":"TRAVAUX D\u0027AUTOMNE 2017 SUR LE RER C"},{"target_id":"1272","title":"RER C : travaux en gare du pont de l\u0027alma"},{"target_id":"1302","title":"Tous les chemins m\u00e8nent \u00e0 la U ARENA"},{"target_id":"1305","title":"TRANSILIEN VOUS OFFRE DES AVANTAGES EXCLUSIFS SUR OUICAR !"},{"target_id":"1307","title":"NOUVEAU TRAIN \u0026 NOUVEAU BLOG !"}],"push":"\u003Cem\u003ETransilien.com \u003C\/em\u003Econtinue d\u0027\u00e9voluer \u003Cem\u003Egr\u00e2ce \u00e0 vos retours\u003C\/em\u003E","makeupbootstrap_carousel_id":"#carousel-example-generic","bootstrap":{"anchorsFix":0,"anchorsSmoothScrolling":1,"formHasError":1,"popoverEnabled":1,"popoverOptions":{"animation":1,"html":0,"placement":"right","selector":"","trigger":"click","triggerAutoclose":1,"title":"","content":"","delay":0,"container":"body"},"tooltipEnabled":1,"tooltipOptions":{"animation":1,"html":0,"placement":"auto left","selector":"","trigger":"hover focus","delay":0,"container":"body"}}});</script>
        <!-- Adding css tag-->
    
				
<SCRIPT language="javascript">
    var triLabels = {
        "transilien.carto.label.pointeur.arrivee" : "Arrivée",
		"transilien.carto.label.pointeur.depart": "Départ",
		"transilien.autocomplete.aucun.resultat": "Pas de résultats"
    };
</SCRIPT>
				



<link rel="stylesheet" type="text/css"  href="/tricharte/css/bundles/common-5552.min.css" />
<link rel="stylesheet" type="text/css"  href="/tricharte/css/styles-base-5552.min.css" />
<link rel="stylesheet" type="text/css"  href="/tricharte/css/tnicons/tnicons-5552.min.css" />

				<link rel="stylesheet" type="text/css"  href="/tricharte/css/bundles/page-home-5552.min.css" />
				<link rel="stylesheet" type="text/css"  href="/tricharte/css/page-nextDeparture-5552.min.css" />
				<link rel="stylesheet" type="text/css"  href="/tricharte/css/bundles/print-5552.min.css" media="print" />
			
</head>
<body class="html front not-logged-in no-sidebars page-node page-node- page-node-48 node-type-page i18n-fr" >

    <header id="mainheader" role="banner" class="navbar">
    <div id="galaxy">
        <div class="container">
            <div class="row">
                <div id="header-left" class="col-lg-4 col-md-4 col-sm-4 col-xs-12 block-site-name">
                    <p>Transilien.com est un site de <img
                            src="/sites/all/themes/charte/img/homepage/logo-sncf-31x12.png"
                            alt="SNCF"></p>
                </div>
                <div id="region-header-right" class="col-lg-8 col-md-8 col-sm-8 hidden-xs">


                    <div class="input-group">
            <form novalidate="" name="Synomia" method="get" role="search" action="http://recherche.transilien.com/">
            <span class="errormsg withico"><span id="parsley-id-0206"></span></span><input data-parsley-id="0206" class="form-control" placeholder="rechercher" aria-label="Recherche" name="q" type="text">
            <button type="submit" class="btn-submit"><img src="/sites/all/themes/charte/img/homepage/icon-magnifying-glass.png" alt="Rechercher"></button>
            </form>
          </div>                  <ul class="menu-languages pull-right">
                                          <li
                        class="eptica-aide"><a href="#" id="lnkEpticaModal" data-target="#epticaModal"
                data-backdrop="static"
                data-toggle="modal"
                iframe-id="popinEpticaModal"
                iframe-url="//transilien.epticahosting.com/selftransilien/"
                iframe-style="width:1024px;height:768px;"
                class="btn btn-iframe"
                onclick="javascript:return tc_events_conteneurID(this, 'clic', {'Evt_Categorie' : 'services_reseaux_sociaux', 'Evt_Action' : 'Sortie', 'Evt_Opt_label' : 'Aide_Contact', 'Type' : 'event'});">AIDE ET CONTACT</a></li>
                                        <li>
                      
    <div class="btn-group">
    <button class="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown" title="Langue du site"><i class="flag-small flag-small-fr"></i><span class="lg-name">Français</span><span class="caret"></span></button>
      <ul class="dropdown-menu" role="menu">
        <li><i class="flag-small flag-small-fr"></i><a href="/fr" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'header', 'Evt_Opt_label' : 'Français', 'Type' : 'event'});">Français</a></li>
        <li><i class="flag-small flag-small-en"></i><a href="/en" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'header', 'Evt_Opt_label' : 'English', 'Type' : 'event'});">English</a></li>
        <li><i class="flag-small flag-small-es"></i><a href="/es" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'header', 'Evt_Opt_label' : 'Español', 'Type' : 'event'});">Español</a></li>
    </ul>
    </div>
                        </li>
                  </ul>

                </div>
            </div>
        </div>
    </div>
    <div id="menu">
        <div class="container">
            <div class="row" id="menu-wrapper">
                <div id="menu-burger-mobile" class="hidden-md hidden-lg hidden-sm col-xs-3">
                    <i class="fa fa-bars fa-2x menu-burger" aria-hidden="true"></i>


                </div>

                <div id="block-mobile-logo" class="hidden-md hidden-lg hidden-sm col-xs-6">
                                            <a class="logo navbar-btn"
                           href="/fr"
                           title="Accueil">
                            <img class="img-responsive logo-mobile" src="/sites/all/themes/custom/transilien/logo.png"
                                 alt="Accueil"/>
                        </a>
                                    </div>
                <div id="menu-mobile-profile" class="hidden-md hidden-lg hidden-sm col-xs-3">
                    
				
					
				









 







	
		
		
			
				
					
						
						<div class="block-account block-inner list-account">
							<i class="fa fa-user profile-mobile" aria-hidden="true" id="user-connexion-link-mobile"></i>
						</div>
					
					
				

			

			
			

		
	







			
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 hidden-xs">
                    <h1 class="hidden-xs">
                                                    <a class="logo navbar-btn pull-left"
                               href="/fr"
                               title="Accueil">
                                <img src="/sites/all/themes/custom/transilien/logo.png"
                                     alt="Accueil"/>
                            </a>
                                                                    </h1>
                </div>
                <div  id="wrapper-menu-nav" class="col-lg-8 col-md-8 col-sm-8 hidden-xs">
                    <nav id="header-main-menu-links" class="menu-links"
                         role="navigation">
                        <ul class="clearfix">
                            <li class="menu-block font-avenir-book item-1"><a title="Cliquez pour entrer dans le sous-menu" href="#submenu1" class="link" aria-expanded="false"  aria-controls="submenu1" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'menu', 'Evt_Opt_label' : 'Se déplacer &amp;amp; visiter', 'Type' : 'event'});">Se déplacer &amp; visiter </a><span class="triangle-menu"> </span></li><li class="menu-block font-avenir-book item-2"><a title="Cliquez pour entrer dans le sous-menu" href="#submenu2" class="link" aria-expanded="false"  aria-controls="submenu2" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'menu', 'Evt_Opt_label' : 'Tarifs &amp;amp; forfaits', 'Type' : 'event'});">Tarifs &amp; forfaits </a><span class="triangle-menu"> </span></li><li class="menu-block font-avenir-book item-3"><a title="Cliquez pour entrer dans le sous-menu" href="#submenu3" class="link" aria-expanded="false"  aria-controls="submenu3" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'menu', 'Evt_Opt_label' : 'Services &amp;amp; réseaux sociaux', 'Type' : 'event'});">Services &amp; réseaux sociaux </a><span class="triangle-menu"> </span></li>                            
				
					
				









 







	
		
		
			
				
					
					
						
						<li class="block-account">
							<div class="block-inner list-account">
								<a role="button" title="onglet connexion compte client (ouvrir la fenêtre)" id="user-connexion-link" href="#">
									<div id="block-account-table">
										<div>
											<img src="/tricharte/img/picto/Avatar.png" class="ico-avatar" />
										</div>
										<div>
											Connexion
										</div>
									</div>
								</a>
							</div>
						</li>
						
						<div id="popin-connexion" class="popin-connexion">
							
								
							

























<form id="formAuthentification" data-type-form="identification" data-validate-recap="true" data-validate-recap-target="#validate-recap-summary" class="mon-compte" data-parsley-errors-container="#error-bandeau-messages-identification" action="/moncompte/verification" method="POST">

<div class="row">

    <div class="col-xs-12">
        <p>
            <label for="j_username">e-mail *</label>
                <input type="email" name="j_username" class="form-control" placeholder="Votre email	"
                       id="j_username"
                       required="true" data-parsley-type-message="Votre identifiant doit être une adresse E-mail."
                       data-parsley-required-message="Ce champ est requis."
                       data-validate-recap-message="Identifiant incorrect" />

            <!-- data-parsley-type="email" -->
        </p>

    </div>
</div>

<div class="row">

    <div class="col-xs-12">
        <label for="j_password">mot de passe *</label>
            <span class="input-group js-password-show-hide"
                  data-hide-text="MASQUER"
                  data-show-text="MONTRER">
                <input type="password" name="j_password" class="form-control" placeholder="Votre mot de passe" value=""
                       id="j_password" required="true"
                       data-parsley-required-message="Ce champ est requis."
                       data-validate-recap-message="Mot de passe incorrect"/>
                <span class="input-group-btn">
                  <button class="btn" type="button">MONTRER</button>
                </span>
            </span>


        
    </div>
</div>

<div class="row">
    <div class="col-xs-6 label-reverse inscription-checkboxes-libelle">
        <label class="for-checkbox"><input type="checkbox" id="resterco_contenus" name="_spring_security_remember_me" checked/> <span>Se souvenir de moi</span></label>
    </div>
    <div class="col-xs-6">
        
            
            
                <a onclick="javascript:return tc_events_conteneurID(this, 'clic', {'Evt_Opt_label' : 'moncompte/reinitialisation/formulaire', 'Type' : 'page'});" id="mdp-oublie" href="#">Mot de passe oublié ?</a>
            
        
    </div>
</div>

<div class="row container-btn">
    <div class="btns-line col-xs-12 espace-bas center-thing">
        <input type="submit" id="connexionSubmit"
           onclick="javascript:return tc_events_conteneurID(this, 'clic', {'Evt_Categorie' : 'Intéractions_compte', 'Evt_Action' : 'Connexion_compte', 'Type' : 'event'});"
           class="btn-primary"
           value="Me connecter">
    </div>
</div>

</form>





<div class="row">
    <div class="col-xs-12 center-thing">
        <p class="label-no-account">Pas encore de compte ?</p>
    </div>
</div>
<div class="row container-btn">
    <div class="col-xs-12 center-thing">
        <a id="last-button-popin" onclick="javascript:return tc_events_conteneurID(this, 'clic', {'Evt_Categorie' : 'HomePage', 'Evt_Action' : 'clic', 'Evt_Opt_label' : 'creation_compte', 'Type' : 'event'});" class="btn-default" href="/moncompte/inscription">Créer mon compte</a>
    </div>
</div>


<div class="top-bubble" id="message-validate">
    <div class="box box-picto box-picto-infos">
        Un email de validation vient de vous être envoyé.
    </div>
</div>



						</div>
						<div id="popin-reinitialisation-mdp" class="popin-connexion">
							<div class="tbox mon-compte forgotten-password">
								<!-- Header Mon Compte -->

								<div class="row">
									<div class="col-xs-12">
										<h1>Réinitialisez votre mot de passe</h1>
									</div>
								</div>
								








<div id="error-bandeau-modifier-mdp" class="error-bandeau-container">
    <div class="box box-error margintop show " style="width: 300px" aria-live="assertive" id="validate-recap-summary">
        <p>
            Les champs suivants sont erronés ou incomplets
        </p>
        <ul class="erreur-message" id="error-bandeau-messages-modifier-mdp">
            
        </ul>
    </div>
</div>
<div id="error-bandeau-modifier-mdp-server" class="error-bandeau-container">

</div>
<form id="form_assistant" data-validate-recap="true" data-validate-recap-target="#validate-recap-summary" data-parsley-errors-container="#error-bandeau-messages-modifier-mdp" action="/moncompte/mot-de-passe-oublie/" method="POST" onsubmit="return mdpOublie();">

    <div class="row">
        <div class="col-xs-12">
            <p>Saisissez l'adresse e-mail associée à votre compte, vous recevrez ensuite un message qui vous permettra de le réinitialiser.</p>
            <label for="email_oublie">Adresse E-mail utilisée lors de votre inscription *</label>
            
            
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <input id="email_oublie" name="courriel" class="form-control" data-parsley-type="email" data-parsley-required-message="Le champ est obligatoire" placeholder="adresse@email.com" type="email" class="mdp-oublie-email" required="true" data-validate-recap-message="E-mail incorrect" value=""/>
        </div>
    </div>
    <div class="row container-btn">
        <div class="col-xs-12 center-thing espace-haut">
            <button type="submit" class="btn-primary" id="submit-mdp-oublie">Envoyer le lien de réinitialisation</button>
        </div>
    </div>
</form>

							</div>
						</div>
						

						
						
					
				

			

			
			

		
	







			                        </ul>
                    </nav>
                </div>
            </div>
            <div class="row" id="mobile-menu">
                <div id="responsive-wrapper" class="hidden-lg hidden-md hidden-sm col-xs-12">
                    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/se-deplacer-visiter" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Se déplacer &amp;amp; visiter&#039;, &#039;Type&#039; : &#039;event&#039;});">Se déplacer & visiter <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a><ul class="dropdown-menu"><li><div class="sub-title">Au quotidien</div><ul class="dropdown-menu-1"><li><a href="/fr/itineraire" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Itinéraires&#039;, &#039;Type&#039; : &#039;event&#039;});">Itinéraires <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/horaires" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Prochains départs&#039;, &#039;Type&#039; : &#039;event&#039;});">Prochains départs <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/info-trafic/temps-reel" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Info trafic&#039;, &#039;Type&#039; : &#039;event&#039;});">Info trafic <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="https://www.transilien.com/fr/page-editoriale/les-fiches-horaires" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Fiches horaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Fiches horaires <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/accessibilite-handicap" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Accessibilité&#039;, &#039;Type&#039; : &#039;event&#039;});">Accessibilité <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-de-liste-editoriale/choisissez-le-mode-qui-vous-convient" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Depuis et vers la gare&#039;, &#039;Type&#039; : &#039;event&#039;});">Depuis et vers la gare <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="http://www.sncf.com/fr/geolocalisation" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Géolocaliser mon train&#039;, &#039;Type&#039; : &#039;event&#039;});">Géolocaliser mon train <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Loisirs & Tourisme</div><ul class="dropdown-menu-1"><li><a href="/fr/page-de-liste-tourisme/tourisme-en-ile-de-france" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Tourisme en &amp;lt;em&amp;gt;Île-de-France&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Tourisme en <em>Île-de-France</em> <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/se-deplacer-et-visiter/loisirs-et-tourisme/la-carte-des-visites/home" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;La carte des visites&#039;, &#039;Type&#039; : &#039;event&#039;});">La carte des visites <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/centres-dexpositions-et-daffaires" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Centres d&amp;#039;expositions &amp;amp; d&amp;#039;affaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Centres d'expositions & d'affaires <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-gares-tgv-aeroports" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Gares TGV &amp;amp; aéroports&#039;, &#039;Type&#039; : &#039;event&#039;});">Gares TGV & aéroports <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/redecouvrez-le-patrimoine-dile-de-france-avec-hapi" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Application HAPI&#039;, &#039;Type&#039; : &#039;event&#039;});">Application HAPI <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Le Réseau</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/comprendre-le-reseau" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Comprendre le réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Comprendre le réseau <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-plans-du-reseau" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Plans du réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Plans du réseau <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/se-deplacer-et-visiter/le-reseau/les-lignes/home" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les lignes&#039;, &#039;Type&#039; : &#039;event&#039;});">Les lignes <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/gare" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les gares&#039;, &#039;Type&#039; : &#039;event&#039;});">Les gares <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-de-liste-editoriale/les-aeroports-de-paris" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les aéroports&#039;, &#039;Type&#039; : &#039;event&#039;});">Les aéroports <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/modernisation-du-reseau" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Modernisation du réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Modernisation du réseau <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Toutes les lignes</div><ul class="dropdown-menu-1"><li><a href="/fr/se-deplacer-et-visiter/toutes-les-lignes/rer-et-trains/home" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;RER &amp;amp; trains&#039;, &#039;Type&#039; : &#039;event&#039;});">RER & trains <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-lignes-de-tramway" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Tramways&#039;, &#039;Type&#039; : &#039;event&#039;});">Tramways <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-lignes-de-noctilien" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Noctilien&#039;, &#039;Type&#039; : &#039;event&#039;});">Noctilien <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-lignes-de-metro" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Métro&#039;, &#039;Type&#039; : &#039;event&#039;});">Métro <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Services mobiles</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/decouvrez-les-applications" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Applications&#039;, &#039;Type&#039; : &#039;event&#039;});">Applications <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/le-site-mobile" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Site mobile&#039;, &#039;Type&#039; : &#039;event&#039;});">Site mobile <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/le-numero-3658" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3658&#039;, &#039;Type&#039; : &#039;event&#039;});">3658 <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/sms-4-10-20" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;41020&#039;, &#039;Type&#039; : &#039;event&#039;});">41020 <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li></ul></li><li class="dropdown"> <a href="/fr/page-editoriale/services-reseaux-sociaux" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Services &amp;amp;amp; réseaux sociaux&#039;, &#039;Type&#039; : &#039;event&#039;});">Services &amp; réseaux sociaux <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a><ul class="dropdown-menu"><li><div class="sub-title">Servies mobiles</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/decouvrez-les-applications" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Applications&#039;, &#039;Type&#039; : &#039;event&#039;});">Applications <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/le-site-mobile" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Site mobile&#039;, &#039;Type&#039; : &#039;event&#039;});">Site mobile <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/le-numero-3658" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3658&#039;, &#039;Type&#039; : &#039;event&#039;});">3658 <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/sms-4-10-20" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;41020&#039;, &#039;Type&#039; : &#039;event&#039;});">41020 <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Services pratiques</div><ul class="dropdown-menu-1"><li><a href="http://bulletinsretard.transilien.com/" target="_blank" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Bulletin de retard&#039;, &#039;Type&#039; : &#039;event&#039;});">Bulletin de retard <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/le-service-objets-trouves" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Objets trouvés&#039;, &#039;Type&#039; : &#039;event&#039;});">Objets trouvés <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/en-cas-de-danger-appelez-le-3117" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3117&#039;, &#039;Type&#039; : &#039;event&#039;});">3117 <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/guide-du-savoir-voyager" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Guide du &amp;lt;em&amp;gt;savoir voyager&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Guide du <em>savoir voyager</em> <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/des-produits-maraichers-en-gare" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Paniers fraîcheurs&#039;, &#039;Type&#039; : &#039;event&#039;});">Paniers fraîcheurs <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="http://lieuideal.transilien.com/ou-habiter/" target="_blank" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Où habiter&#039;, &#039;Type&#039; : &#039;event&#039;});">Où habiter <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="http://lieuideal.transilien.com/ou-se-retrouver/" target="_blank" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Où se retrouver&#039;, &#039;Type&#039; : &#039;event&#039;});">Où se retrouver <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Réseaux sociaux</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/les-comptes-twitter" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Twitter de ligne&#039;, &#039;Type&#039; : &#039;event&#039;});">Twitter de ligne <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-blogs-de-ligne" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Blogs de ligne&#039;, &#039;Type&#039; : &#039;event&#039;});">Blogs de ligne <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Aide & contact</div><ul class="dropdown-menu-1"><li><a href="/fr/contact/formulairecontact" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Nous contacter&#039;, &#039;Type&#039; : &#039;event&#039;});">Nous contacter <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li></ul></li><li class="dropdown"> <a href="/fr/page-editoriale/tarifs-forfaits" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Tarifs &amp;amp; forfaits&#039;, &#039;Type&#039; : &#039;event&#039;});">Tarifs & forfaits <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a><ul class="dropdown-menu"><li><div class="sub-title">Voyager souvent</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/navigo-annuel" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Toute l&amp;#039;année&#039;, &#039;Type&#039; : &#039;event&#039;});">Toute l'année <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/navigo-mois" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Le mois&#039;, &#039;Type&#039; : &#039;event&#039;});">Le mois <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/navigo-semaine" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;La semaine&#039;, &#039;Type&#039; : &#039;event&#039;});">La semaine <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/decouvrez-le-dezonage" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Dézonage&#039;, &#039;Type&#039; : &#039;event&#039;});">Dézonage <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/decouvrez-le-complement-de-parcours-en-ile-de-france" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Complément de parcours&#039;, &#039;Type&#039; : &#039;event&#039;});">Complément de parcours <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Jeune ou étudiant</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/decouvrir-imagine-r" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Imagine R&#039;, &#039;Type&#039; : &#039;event&#039;});">Imagine R <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/circuler-avec-le-ticket-jeunes-week-end" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Ticket Jeune weekend&#039;, &#039;Type&#039; : &#039;event&#039;});">Ticket Jeune weekend <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/la-carte-scolaire" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Carte scolaire&#039;, &#039;Type&#039; : &#039;event&#039;});">Carte scolaire <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-jeunes-en-insertion" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Jeunes en insertion&#039;, &#039;Type&#039; : &#039;event&#039;});">Jeunes en insertion <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Voyager occasionnellement</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/decouvrir-les-billets-individuels" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Billets individuels&#039;, &#039;Type&#039; : &#039;event&#039;});">Billets individuels <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/voyager-avec-paris-visite" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Paris visite&#039;, &#039;Type&#039; : &#039;event&#039;});">Paris visite <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/utiliser-la-carte-navigo-decouverte" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Forfait semaine&#039;, &#039;Type&#039; : &#039;event&#039;});">Forfait semaine <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Tarifs spécifiques</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/reductions-pour-les-chomeurs-et-demandeurs-demploi" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Chômeurs &amp;amp; demandeurs d&amp;#039;emplois&#039;, &#039;Type&#039; : &#039;event&#039;});">Chômeurs & demandeurs d'emplois <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/reductions-pour-les-familles" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Famille&#039;, &#039;Type&#039; : &#039;event&#039;});">Famille <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/reductions-pour-les-militaires" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Militaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Militaires <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/tarification-pmr" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;PMR / handicapés&#039;, &#039;Type&#039; : &#039;event&#039;});">PMR / handicapés <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/voyager-en-groupe" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Groupes&#039;, &#039;Type&#039; : &#039;event&#039;});">Groupes <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/reductions-pour-les-jeunes" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Jeunes&#039;, &#039;Type&#039; : &#039;event&#039;});">Jeunes <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/pour-les-seniors" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Séniors&#039;, &#039;Type&#039; : &#039;event&#039;});">Séniors <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li><li><div class="sub-title">Points de vente & SAV</div><ul class="dropdown-menu-1"><li><a href="/fr/page-editoriale/les-agences-services-navigo" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Agences Services Navigo&#039;, &#039;Type&#039; : &#039;event&#039;});">Agences Services Navigo <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-guichets-services-navigo" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Guichets Services Navigo&#039;, &#039;Type&#039; : &#039;event&#039;});">Guichets Services Navigo <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/les-automates-transilien" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Automates Transilien&#039;, &#039;Type&#039; : &#039;event&#039;});">Automates Transilien <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/autres-canaux-dachat" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Autres &amp;lt;em&amp;gt;canaux d&amp;#039;achat&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Autres <em>canaux d'achat</em> <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li><li><a href="/fr/page-editoriale/service-apres-vente-transilien" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;SAV&#039;, &#039;Type&#039; : &#039;event&#039;});">SAV <i class="fa fa-angle-right pull-right" aria-hidden="true"></i></a></li></ul></li></ul></li></ul>                                                                <ul class="block-lang list-unstyled">
                            <li id="fr-l" class="item-ln"><a href="/fr" onclick=""><i class="flag flag-fr"></i><span>Français</span><i class="fa fa-circle-o pull-right" aria-hidden="true"></i></a></li>
                            <li id="en-l" class="item-ln"><a href="/en" onclick=" "><i class="flag flag-en"></i><span>Anglais</span><i class="fa fa-circle-o pull-right" aria-hidden="true"></i></a></li>
                            <li id="es-l" class="item-ln"><a href="/es" onclick=""><i class="flag flag-es"></i><span>Español</span><i class="fa fa-circle-o pull-right" aria-hidden="true"></i></a></li>
                        </ul>
                        <div class="lang-item">
                            <i class="flag flag-fr"></i> <span class="lang">Français</span>
                        </div>
                                    </div>
            </div>
        </div>
    </div>

    <div class="expand">
        <div class="container">
            <div id="menu-desktop" tabindex="0" class="row">
                
        <div style="display: none;" id="submenu1" class="sous-menu col-xs-12 clearfix">
    
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-blue-1.png"><span class="text-uppercase">
        Au quotidien      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/itineraire" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Itinéraires&#039;, &#039;Type&#039; : &#039;event&#039;});">Itinéraires <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/horaires" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Prochains départs&#039;, &#039;Type&#039; : &#039;event&#039;});">Prochains départs <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/info-trafic/temps-reel" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Info trafic&#039;, &#039;Type&#039; : &#039;event&#039;});">Info trafic <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="https://www.transilien.com/fr/page-editoriale/les-fiches-horaires" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Fiches horaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Fiches horaires <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/accessibilite-handicap" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Accessibilité&#039;, &#039;Type&#039; : &#039;event&#039;});">Accessibilité <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-de-liste-editoriale/choisissez-le-mode-qui-vous-convient" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Depuis et vers la gare&#039;, &#039;Type&#039; : &#039;event&#039;});">Depuis et vers la gare <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="http://www.sncf.com/fr/geolocalisation" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Géolocaliser mon train&#039;, &#039;Type&#039; : &#039;event&#039;});">Géolocaliser mon train <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-blue-2.png"><span class="text-uppercase">
        Loisirs &amp; tourisme      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-de-liste-tourisme/tourisme-en-ile-de-france" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Tourisme en &amp;lt;em&amp;gt;Île-de-France&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Tourisme en <em>Île-de-France</em> <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/se-deplacer-et-visiter/loisirs-et-tourisme/la-carte-des-visites/home" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;La carte des visites&#039;, &#039;Type&#039; : &#039;event&#039;});">La carte des visites <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/centres-dexpositions-et-daffaires" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Centres d&amp;#039;expositions &amp;amp; d&amp;#039;affaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Centres d'expositions & d'affaires <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-gares-tgv-aeroports" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Gares TGV &amp;amp; aéroports&#039;, &#039;Type&#039; : &#039;event&#039;});">Gares TGV & aéroports <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/redecouvrez-le-patrimoine-dile-de-france-avec-hapi" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Application HAPI&#039;, &#039;Type&#039; : &#039;event&#039;});">Application HAPI <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-blue-3.png"><span class="text-uppercase">
        Le réseau      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/comprendre-le-reseau" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Comprendre le réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Comprendre le réseau <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-plans-du-reseau" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Plans du réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Plans du réseau <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/se-deplacer-et-visiter/le-reseau/les-lignes/home" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les lignes&#039;, &#039;Type&#039; : &#039;event&#039;});">Les lignes <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/gare" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les gares&#039;, &#039;Type&#039; : &#039;event&#039;});">Les gares <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-de-liste-editoriale/les-aeroports-de-paris" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Les aéroports&#039;, &#039;Type&#039; : &#039;event&#039;});">Les aéroports <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/modernisation-du-reseau" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Modernisation du réseau&#039;, &#039;Type&#039; : &#039;event&#039;});">Modernisation du réseau <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-blue-4.png"><span class="text-uppercase">
        Toutes les lignes      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/se-deplacer-et-visiter/toutes-les-lignes/rer-et-trains/home" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;RER &amp;amp; trains&#039;, &#039;Type&#039; : &#039;event&#039;});">RER & trains <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-lignes-de-tramway" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Tramways&#039;, &#039;Type&#039; : &#039;event&#039;});">Tramways <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-lignes-de-noctilien" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Noctilien&#039;, &#039;Type&#039; : &#039;event&#039;});">Noctilien <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-lignes-de-metro" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Métro&#039;, &#039;Type&#039; : &#039;event&#039;});">Métro <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-blue-5.png"><span class="text-uppercase">
        Services mobiles      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/decouvrez-les-applications" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Applications&#039;, &#039;Type&#039; : &#039;event&#039;});">Applications <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/le-site-mobile" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Site mobile&#039;, &#039;Type&#039; : &#039;event&#039;});">Site mobile <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/le-numero-3658" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3658&#039;, &#039;Type&#039; : &#039;event&#039;});">3658 <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/sms-4-10-20" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;41020&#039;, &#039;Type&#039; : &#039;event&#039;});">41020 <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
        </div>
    
        <div style="display: none;" id="submenu2" class="sous-menu col-xs-12 clearfix">
    
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-plum-1.png"><span class="text-uppercase">
        Voyager souvent      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/navigo-annuel" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Toute l&amp;#039;année&#039;, &#039;Type&#039; : &#039;event&#039;});">Toute l'année <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/navigo-mois" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Le mois&#039;, &#039;Type&#039; : &#039;event&#039;});">Le mois <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/navigo-semaine" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;La semaine&#039;, &#039;Type&#039; : &#039;event&#039;});">La semaine <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/decouvrez-le-dezonage" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Dézonage&#039;, &#039;Type&#039; : &#039;event&#039;});">Dézonage <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/decouvrez-le-complement-de-parcours-en-ile-de-france" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Complément de parcours&#039;, &#039;Type&#039; : &#039;event&#039;});">Complément de parcours <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-plum-2.png"><span class="text-uppercase">
        Voyager occasionnellement      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/decouvrir-les-billets-individuels" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Billets individuels&#039;, &#039;Type&#039; : &#039;event&#039;});">Billets individuels <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/voyager-avec-paris-visite" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Paris visite&#039;, &#039;Type&#039; : &#039;event&#039;});">Paris visite <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/utiliser-la-carte-navigo-decouverte" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Forfait semaine&#039;, &#039;Type&#039; : &#039;event&#039;});">Forfait semaine <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-plum-3.png"><span class="text-uppercase">
        Jeune ou étudiant      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/decouvrir-imagine-r" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Imagine R&#039;, &#039;Type&#039; : &#039;event&#039;});">Imagine R <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/circuler-avec-le-ticket-jeunes-week-end" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Ticket Jeune weekend&#039;, &#039;Type&#039; : &#039;event&#039;});">Ticket Jeune weekend <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/la-carte-scolaire" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Carte scolaire&#039;, &#039;Type&#039; : &#039;event&#039;});">Carte scolaire <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-jeunes-en-insertion" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Jeunes en insertion&#039;, &#039;Type&#039; : &#039;event&#039;});">Jeunes en insertion <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-plum-4.png"><span class="text-uppercase">
        Tarifs spécifiques      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/reductions-pour-les-chomeurs-et-demandeurs-demploi" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Chômeurs &amp;amp; demandeurs d&amp;#039;emplois&#039;, &#039;Type&#039; : &#039;event&#039;});">Chômeurs & demandeurs d'emplois <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/reductions-pour-les-familles" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Famille&#039;, &#039;Type&#039; : &#039;event&#039;});">Famille <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/reductions-pour-les-militaires" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Militaires&#039;, &#039;Type&#039; : &#039;event&#039;});">Militaires <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/tarification-pmr" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;PMR / handicapés&#039;, &#039;Type&#039; : &#039;event&#039;});">PMR / handicapés <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/voyager-en-groupe" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Groupes&#039;, &#039;Type&#039; : &#039;event&#039;});">Groupes <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/reductions-pour-les-jeunes" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Jeunes&#039;, &#039;Type&#039; : &#039;event&#039;});">Jeunes <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/pour-les-seniors" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Séniors&#039;, &#039;Type&#039; : &#039;event&#039;});">Séniors <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-plum-5.png"><span class="text-uppercase">
        Points de vente &amp; SAV      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/les-agences-services-navigo" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Agences Services Navigo&#039;, &#039;Type&#039; : &#039;event&#039;});">Agences Services Navigo <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-guichets-services-navigo" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Guichets Services Navigo&#039;, &#039;Type&#039; : &#039;event&#039;});">Guichets Services Navigo <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-automates-transilien" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Automates Transilien&#039;, &#039;Type&#039; : &#039;event&#039;});">Automates Transilien <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/autres-canaux-dachat" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Autres &amp;lt;em&amp;gt;canaux d&amp;#039;achat&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Autres <em>canaux d'achat</em> <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/service-apres-vente-transilien" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;SAV&#039;, &#039;Type&#039; : &#039;event&#039;});">SAV <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
        </div>
    
        <div style="display: none;" id="submenu3" class="sous-menu col-xs-12 clearfix">
    
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-purple-1.png"><span class="text-uppercase">
        Services mobiles      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/decouvrez-les-applications" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Applications&#039;, &#039;Type&#039; : &#039;event&#039;});">Applications <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/le-site-mobile" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Site mobile&#039;, &#039;Type&#039; : &#039;event&#039;});">Site mobile <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/le-numero-3658" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3658&#039;, &#039;Type&#039; : &#039;event&#039;});">3658 <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/sms-4-10-20" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;41020&#039;, &#039;Type&#039; : &#039;event&#039;});">41020 <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-purple-2.png"><span class="text-uppercase">
        Services pratiques      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="http://bulletinsretard.transilien.com/" target="_blank" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Bulletin de retard&#039;, &#039;Type&#039; : &#039;event&#039;});">Bulletin de retard <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/le-service-objets-trouves" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Objets trouvés&#039;, &#039;Type&#039; : &#039;event&#039;});">Objets trouvés <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/en-cas-de-danger-appelez-le-3117" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;3117&#039;, &#039;Type&#039; : &#039;event&#039;});">3117 <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/guide-du-savoir-voyager" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Guide du &amp;lt;em&amp;gt;savoir voyager&amp;lt;/em&amp;gt;&#039;, &#039;Type&#039; : &#039;event&#039;});">Guide du <em>savoir voyager</em> <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/des-produits-maraichers-en-gare" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Paniers fraîcheurs&#039;, &#039;Type&#039; : &#039;event&#039;});">Paniers fraîcheurs <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="http://lieuideal.transilien.com/ou-habiter/" target="_blank" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Où habiter&#039;, &#039;Type&#039; : &#039;event&#039;});">Où habiter <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="http://lieuideal.transilien.com/ou-se-retrouver/" target="_blank" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Où se retrouver&#039;, &#039;Type&#039; : &#039;event&#039;});">Où se retrouver <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-purple-3.png"><span class="text-uppercase">
        Réseaux sociaux      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/page-editoriale/les-comptes-twitter" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Twitter de ligne&#039;, &#039;Type&#039; : &#039;event&#039;});">Twitter de ligne <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li><li class="dropdown"> <a href="/fr/page-editoriale/les-blogs-de-ligne" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Blogs de ligne&#039;, &#039;Type&#039; : &#039;event&#039;});">Blogs de ligne <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
          <div class="column">
            <p>
            <img src="/sites/all/themes/charte/img/picto/picto--menu-purple-4.png"><span class="text-uppercase">
        Aide &amp; Contact      </span>
      </p>

    <ul id="menu-list" class="nav navbar-nav"><li class="dropdown"> <a href="/fr/contact/formulairecontact" class="first-level dropdown-toggle " role="menu" data-toggle="dropdown" aria-expanded="true" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;menu&#039;, &#039;Evt_Opt_label&#039; : &#039;Nous contacter&#039;, &#039;Type&#039; : &#039;event&#039;});">Nous contacter <span class="arrow hidden-xs"></span> <i class="fa fa-angle-down pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i><i class="fa fa-angle-up pull-right hidden-md hidden-lg hidden-sm" aria-hidden="true"></i></a></li></ul>
          </div>
        
        </div>
                </div>
        </div>
    </div>


    </header>

    <div class="bandeaux_b alert-danger-bg">
        <div class="gestion_crise_b container">
                        <div class="view view-bandeaux view-id-bandeaux view-display-id-block_fr view-dom-id-9eef00181b56ba56745a8a53b2d48175">
        
  
  
      <div class="view-content">
        <div>
    <div id="bandeau_alerte-1610" class="alert alert-danger alert-dismissible bandeau_crise" role="alert">
  <button id="alerte-1610" type="button"  title="Fermer la fenêtre" class="close bandeau_alert" data-dismiss="alert"><span
      aria-hidden="true"></span><span class="sr-only">Close</span></button>
  <div class="content row"><div class="col-xs-11"><h2 class="field-item title">RER B : travaux du 1er au 5 novembre</h2><div><p>Aucun train entre les gares de Laplace et Bourg la Reine. Les horaires affichés sur Transilien.com ne tiennent pas compte des travaux.</p><div class="field-items b_link clearfix"><!-- scald=3180:editorial --><a href="https://www.vianavigo.com/banner/coupure-rer-b-bourg-la-reine-laplace-et-orlyval" class="std-link external" target="_blank">Pour consulter les horaires, cliquer ici.</a><!-- END scald=3180 --></div></div></div></div></div>

<script type="text/javascript">
  if (sessionStorage.getItem('alerte-1610') == 'closed') {
    jQuery('[id="bandeau_alerte-1610"]').remove();
  }
</script>  </div>
    </div>
  
  
  
  
  
  
</div>        </div>
    </div>



<div id="main" class="front " role="main">

    <div class="container">
        <div id="bandeau-hp">
         
        </div>
        <div id="msg" role="main">
                                            </div>

        <div class="row bandeaux_b bandeaux_b_tra">
            
				
				
				
			
        </div>


        <div id="mess-bandeau-wrapper" class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-7">
                <div id="bandeau-welcom-block">
                    <h4><span class="welcome-text-b"></span> <span class="bandeau_user_name"></span> </h4>
                    <p class="display-msg"></p>

                </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 hidden-xs""></div>
        </div>



                    </div>

          <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">

      
      <!-- scald=23:intro -->

				
					
					
					
				












    
    
    









<!-- TAGCOMMANDER INIT //-->



    <script language="javascript">
        //<![CDATA[
        var tc_vars = {
            
            'template' : '_v4_PT Homepage',
            'env' : 'PRD6',
            'user_id' : '',
            'user_fname' : '',
            'user_cat' : '',
            'id_connexion' : '',
            'id_langue' : 'fr',
            'pagename' : 'prochains_departs/resultats',
            'search_keywords' : '',
            'search_page_number' : '',
            'search_results_number' : '',
            'slider' : 'false'
        };

        var conteneurID = 3; // id du conteneur id fournit par tag commander, a changer suivant l'environnement

        var tc_events_conteneurID = function(el, identifier, options) {
            if (window['tc_events_' + conteneurID]) {
                window['tc_events_' + conteneurID](el, identifier, options);
            }
        };

        var urlAutocomplete = '/transac/aidesaisie/autocompletion';
        var MapCategorieTranslate = { "StopArea" : "Points d'arrêts", "City" : "Ville", "Site" : "Site remarquable ", "Address":"Adresse " };

    </script>
    <!-- TAGCOMMANDER INIT //-->

<script type="text/javascript" src="//cdn.tagcommander.com/1781/tc_Transilien_1.js"></script>
<NOSCRIPT>
    <IFRAME src="//redirect1781.tagcommander.com/utils/noscript.php?id=Transilien_1&mode=iframe&pagename=&order_id=&order_amount_tf_without_sf=" width='1' height='1'></IFRAME>
</NOSCRIPT>

				









<div class="second-header visible-xs tn-text-center tn-text-uppercase">
	<a href="/" class="btn-link">
		<span class="tnicons tnicons-chevron tnicons-rotate-90"></span>
	</a>
	<p>
		Résultats
	</p>
</div>


				<div id="map_b" class="map_b container">
					<div class="show2 color-blue" id="recherche_horaire_resultat">

						









<div class="container-result-nextdeparture-readonly">
	<div class="row">
		<div id="vers-prochains-departs" class="col-sm-12 hidden-xs">
			<p>
				Besoin de partir plus tard ?
				<a onclick="return tc_events_conteneurID(this, 'clic', {'Evt_Opt_label' : 'prochains_departs/renvoi_recherche_itineraire', 'Type' : 'page'});"
				   href="/fr">TROUVER LE BON ITINÉRAIRE</a>
			</p>
		</div>
	</div>
	<!-- #Rappel recherche -->

	<form id="form-add-nextdeparture-favorite" action="/favoris/trajetsfavoris/enregistrerfavoritenextdeparture" method="POST">
		<input id="departureStation" name="departureStation" type="hidden" value="8738221"/>
		<input id="arrivalStation" name="arrivalStation" type="hidden" value=""/>
	</form>

	<div id="recherche_horaire_search_recap" class="tab-content white-box hide">
		
















<script type="text/javascript">
	function tc_select_autocomp(depart) {
		return tc_events_conteneurID(this, 'clic', {
			'Evt_Categorie': 'Deperdition_Module_horaires',
			'Evt_Action': 'gare_depart',
			'Evt_Opt_label': depart,
			'Type': 'event'
		});
	}
	function changeArriveeFunc(select) {
		var valeur = select.options[select.selectedIndex].value;
		jQuery("#trouver_gare #destination").val(jQuery("#uicDestination option:selected").text());
		return tc_events_conteneurID(this, 'clic', {
			'Evt_Categorie': 'Deperdition_Module_horaires',
			'Evt_Action': 'gare_arrivee',
			'Evt_Opt_label': valeur,
			'Type': 'event'
		});
	}
	function validateForm(select) {
		var depart = jQuery('#trouver_gare #nomGare').val();
		var arrivee = jQuery("#trouver_gare #destination").val() != null ? jQuery("#trouver_gare #destination").val() : "";
		return tc_events_conteneurID(this, 'clic', {
			'Evt_Categorie': 'Recherche_Module_horaires',
			'Evt_Action': depart + '|' + arrivee,
			'Type': 'event'
		});
	}
</script>

<div class="row ">
	<div class="hidden-xs col-sm-12">
		<h2 class="schedule-engine"> <span class="tnicons tnicons-station tn-text-primary" aria-hidden="true"></span> Sélectionnez votre gare<span class="subtitle"> pour voir tous les prochains départs en temps réél</span></h2>
	</div>
	<div class="visible-xs col-sm-12">
		<h2 class="schedule-engine"><span class="tnicons tnicons-station tn-text-primary" aria-hidden="true"></span> Voir les trains au départ</h2>
	</div>
</div>

<form id="trouver_gare" class="trouver_gare parsley-custom-validate form-inline" data-type-form="itineraire" role="form" data-parsley-validate="true" action="/fr/horaires/prochains-departs" method="POST">

	<div class="row">
		<div class="col-sm-6">
			<label for="departure">Gare de départ : </label>
			<div id="champs-gare-container"
				 class="input-base-container "
					>

				<input id="departure" name="departure" data-parsley-class-handler="#champs-gare-container" autocomplete_fonction="Temps_reel" data-parsley-required-message="La saisie du champ &laquo; D&eacute;part &raquo; est obligatoire." data-autocomplete-chargerlistgare="true" data-autocomplete-width-referent="#champs-gare-container" placeholder="Gare*" type="text" class="autocomplete input-text" data-prochain-depart="true" required="true" data-autocomplete-container="#champs-gare-container" data-parsley-errors-container="#container-error-front-horaire" value="LA DEFENSE GRANDE ARCHE"/>

				<div id="container-error-front-horaire"
					 class="error-container front-error-container"></div>

				

				

			</div>
		</div>

		<div class="col-sm-6 tn-mt-xs-only-2">
			<label for="uicDestination" class="sr-only-sm">Gare d'arrivée :</label>
			<div id="destination_div" class="next-departure-served-station align-bottom">
				<select id="uicDestination" name="uicDestination" title="Toutes les gares d&#39;arriv&eacute;e" data-height="135px" data-error-ajax="Service momentan&eacute;ment indisponible" data-empty-text="Veuillez d&#39;abord saisir une gare de d&eacute;part" onchange="changeArriveeFunc(this);" disabled="disabled">
					<option value="" selected="selected">Toutes les gares d'arrivée</option>
					
						
							<option value="8738605">ACHERES GRAND CORMIER</option>
						
							<option value="8738165">ACHERES VILLE</option>
						
							<option value="8738113">ASNIERES SUR SEINE</option>
						
							<option value="8775859">AUBER</option>
						
							<option value="8738200">BECON LES BRUYERES</option>
						
							<option value="8775820">BOISSY SAINT-LEGER</option>
						
							<option value="8738244">BOUGIVAL</option>
						
							<option value="8775832">BRY SUR MARNE</option>
						
							<option value="8775498">BUSSY SAINT-GEORGES</option>
						
							<option value="8738265">CERGY LE HAUT</option>
						
							<option value="8738190">CERGY PREFECTURE</option>
						
							<option value="8738249">CERGY SAINT-CHRISTOPHE</option>
						
							<option value="8775817">CHAMPIGNY</option>
						
							<option value="8775800">CHARLES DE GAULLE ETOILE</option>
						
							<option value="8775860">CHATELET LES HALLES</option>
						
							<option value="8775806">CHATOU CROISSY</option>
						
							<option value="8738233">CHAVILLE RIVE DROITE</option>
						
							<option value="8738112">CLICHY LEVALLOIS</option>
						
							<option value="8739327">COIGNIERES</option>
						
							<option value="8738145">CONFLANS FIN D'OISE</option>
						
							<option value="8738220">COURBEVOIE</option>
						
							<option value="8775812">FONTENAY SOUS BOIS</option>
						
							<option value="8738225">GARCHES MARNES LA COQUETTE</option>
						
							<option value="8738400">GARE DE PARIS SAINT-LAZARE</option>
						
							<option value="8738640">HOUILLES CARRIERES SUR SEINE</option>
						
							<option value="8775814">JOINVILLE LE PONT</option>
						
							<option value="8738247">L'ETANG LA VILLE</option>
						
							<option value="8738243">LA CELLE SAINT-CLOUD</option>
						
							<option value="8775818">LA VARENNE CHENNEVIERES</option>
						
							<option value="8739325">LA VERRIERE</option>
						
							<option value="8775816">LE PARC DE SAINT-MAUR</option>
						
							<option value="8739329">LE PERRAY</option>
						
							<option value="8738236">LE VAL D'OR</option>
						
							<option value="8775807">LE VESINET CENTRE</option>
						
							<option value="8775808">LE VESINET LE PECQ</option>
						
							<option value="8739328">LES ESSARTS LE ROI</option>
						
							<option value="8775836">LOGNES</option>
						
							<option value="8738245">LOUVECIENNES</option>
						
							<option value="8738642">MAISONS LAFFITTE</option>
						
							<option value="8738246">MARLY LE ROI</option>
						
							<option value="8775499">MARNE LA VALLEE CHESSY</option>
						
							<option value="8738287">MONTREUIL</option>
						
							<option value="8775802">NANTERRE PREFECTURE</option>
						
							<option value="8738634">NANTERRE PREFECTURE</option>
						
							<option value="8738631">NANTERRE UNIVERSITE</option>
						
							<option value="8775804">NANTERRE VILLE</option>
						
							<option value="8775810">NATION</option>
						
							<option value="8775831">NEUILLY PLAISANCE</option>
						
							<option value="8733448">NEUVILLE UNIVERSITE</option>
						
							<option value="8775813">NOGENT SUR MARNE</option>
						
							<option value="8775835">NOISIEL</option>
						
							<option value="8775834">NOISY CHAMPS</option>
						
							<option value="8775833">NOISY LE GRAND MONT D'EST</option>
						
							<option value="8768603">PARIS GARE DE LYON</option>
						
							<option value="8738657">POISSY</option>
						
							<option value="8738111">PONT CARDINET</option>
						
							<option value="8738238">PUTEAUX</option>
						
							<option value="8739331">RAMBOUILLET</option>
						
							<option value="8775805">RUEIL MALMAISON</option>
						
							<option value="8738235">SAINT-CLOUD</option>
						
							<option value="8739322">SAINT-CYR</option>
						
							<option value="8775809">SAINT-GERMAIN EN LAYE</option>
						
							<option value="8775815">SAINT-MAUR CRETEIL</option>
						
							<option value="8738248">SAINT-NOM LA BRETECHE FORET DE MARLY</option>
						
							<option value="8739384">SAINT-QUENTIN EN YVELINES</option>
						
							<option value="8738641">SARTROUVILLE</option>
						
							<option value="8738234">SEVRES VILLE D'AVRAY</option>
						
							<option value="8775819">SUCY BONNEUIL</option>
						
							<option value="8738237">SURESNES MONT VALERIEN</option>
						
							<option value="8775837">TORCY</option>
						
							<option value="8739383">TRAPPES</option>
						
							<option value="8773006">VAL D'EUROPE</option>
						
							<option value="8711371">VAL DE FONTENAY</option>
						
							<option value="8738226">VAUCRESSON</option>
						
							<option value="8739300">VERSAILLES CHANTIERS</option>
						
							<option value="8738286">VERSAILLES RIVE DROITE</option>
						
							<option value="8775811">VINCENNES</option>
						
							<option value="8738288">VIROFLAY RIVE DROITE</option>
						
					
				</select>
				<input id="destination" name="destination" type="hidden" value=""/>
			</div>
		</div>

	</div>

	<span id="itineraire_select_destination">
    	














<script type="text/javascript">
jQuery( document ).ready(function() {
	var destination = jQuery('#trouver_gare #uicDestination');
	var $liste = jQuery("#trouver_gare #destination_div ul");
	if(typeof destination !== 'undefined' && destination !== null) {
		destination.removeAttr("disabled");
		destination.selectpicker('refresh');
	}
	selectDestination();
});
</script>

  	</span>

	<div class="row">
		<div class="col-md-offset-2 col-xs-12" id="gare-non-reconnue"></div>
	</div>

	<div class="row">
		<div class="container-btn col-xs-12 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4 tn-text-center">
			<input type="submit" onclick="validateForm()"
				   id="submit-recherche-horaire"
				   class="btn-primary engine-btn"
				   value="Rechercher">
		</div>
	</div>
	<input id="uicDeparture" name="uicDeparture" type="hidden" value="8738221"/>
</form>



	</div>


	<div class="row">
		<div class="col-sm-12">
			<div id="rappel-recherche" class="row rappel-recherche">
				<div class="col-xs-12 col-sm-8 col-md-9 research-info-container">
					<div class="row ">
						<div class="research-callback-callout departure-callback col-sm-5">
							<span class="tnicons tnicons-station" aria-hidden="true"></span><label class="">Gare de
							départ</label>
							<p>
								<strong>
									LA DEFENSE GRANDE ARCHE
								</strong>
							</p>
						</div>

						<div class="col-sm-1 hidden-xs">
							<span class="right-arrow itineraire-infos"></span>
						</div>

						<div class="research-callback-callout col-sm-offset-1 col-sm-5">
							<span class="tnicons tnicons-station" aria-hidden="true"></span><label class="">Gare
							d'arrivée</label>
							<p>
								<strong>
									
										
										
											Toutes les gares
										
									
								</strong>
							</p>
						</div>

						<div class="col-xs-12 research-date-hour">
							Départ le
							
							<strong>
								31/10/2017
							</strong>

							à
							
							<strong>
								18:07
							</strong>
						</div>
					</div>
				</div>

				<div class="col-sm-4 col-md-3 container-btn action-container">

					

					










	<button class="visible-xs tn-btn tn-btn-icon btn-ajout-favoris" href="#popover-pushcrea" data-trigger="focus" data-toggle="collapse">
		<span class="tnicons tnicons-star-o tn-align-middle" aria-hidden="true" ></span>
	</button>
	<button class="hidden-xs btn-ajout-favoris link-action-home tn-btn tn-btn-secondary tn-mb-1" href="#popover-pushcrea" data-trigger="focus" data-toggle="collapse">
		<span class="tnicons tnicons-star tn-align-middle tn-text-18" aria-hidden="true" ></span>
		<span>Ajouter aux favoris</span>
	</button>
	<div id="popover-pushcrea" class="popover popover-custom bottom collapse fade ">
        <button type="button" id="close-pushcrea" class="close"><span aria-hidden="true">×</span></button>
		<div class="arrow"></div>
		<div class="popover-content">
			<h3>Envie de gagner du temps ?</h3>
			<p>Grâce aux favoris, retrouvez vos prochains départs préférés en 1 clic. Pour en profiter, connectez-vous !</p>
			<div class="container-btn center-thing">
				<a href="/moncompte/identification" class="btn-primary">Me connecter</a>
				<a href="/moncompte/inscription" class="btn-default">Créer mon compte</a>
			</div>
		</div>
	</div>



					<button class="btn-primary hidden-xs" id="modifier-recherche-horaire">Modifier</button>

					<button id="next-departure-reload-button" class="btn-primary visible-xs-block"
							onClick="window.location.reload(true)">
						Actualiser la recherche
					</button>

				</div>

			</div>
		</div>
	</div>

</div>


<div id="ajout-favorite-ok" class="box-confirm hide">
	Retrouvez ce nouveau Départ Favori sur la page d'accueil
	ou dans votre compte client.
</div>

<div id="ajout-favorite-error" class="container error-bandeau-container hide">
</div>
<!-- END .recherche -->
<div class="prochain-depart-result tn-py-1_5 tn-p-sm-1_5">
	<div class="row">
		<div class="col-sm-10">
			<h2 class="hidden-xs">Résultats des prochains départs</h2>
			<h2 class="visible-xs">Résultats en temps réel</h2>
		</div>
		<div class="col-sm-2 hidden-xs" data-toggle="modal" data-target="#print_page">
			<p class="print-text">imprimer</p>
		</div>
	</div>
	
		
		
		
			<!-- Gestion de la perturbation -->
			








<!-- SERVICE OGESPER INDISPONIBLE -->





	
	
		
		
	






	
		
	
	




	<div class="row single" id="disruptions-container" role="tablist">
		<!-- ITEM DISRUPTION -->

		

		<div id="disruptions-other" class="other-disruptions ">
			
				
				
				
				<div class="disruption trafic col-xs-12">
					<div class="table-row-first">
						
							
							
								<span class="disruption-icon tnicons tnicons-alert-icon">
								</span>
							
						

						
						<p class="titre-perturbation no-bus">Ligne A : La Défense/Auber interrompu</p>
						<a class="perturbation-details" aria-expanded="false" data-toggle="collapse"
						   data-target="#perturbationstraf0">
							<span class="hidden-xs">
								<span class="aria-not-expanded">Détails</span>
								<span class="aria-expanded">Fermer</span>
							</span>
							<span class="hidden-sm hidden-md hidden-lg">
								<span class="aria-not-expanded"><i class="tnicons tnicons-chevron"></i></span>
								<span class="aria-expanded"><i
										class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
							</span>
						</a>

					</div>
					<div class="table-row-second">
						<div id="perturbationstraf0" class="collapse perturbation-reason">
							










    
    
        <div id="perturb-date-liste" data-tf-date-liste-open=false>
            









	<p class="interval-date">
		
			
			
				
				
				Du 30 octobre 13:00 au 01 novembre 03:00
			
		
	</p>









        </div>
    

<p class="detail-perturbation">
    <p>Direction(s) concernée(s) :<br>Ensemble de la ligne<br><br>Trafic interrompu entre La Défense Grande Arche et Auber jusqu'à nouvel avis.<br></p><p>Depuis lundi 30 octobre, une fuite d'eau boueuse importante, consécutive à des travaux du chantier Eole, perturbe le trafic sur le RER A.<br><br>Nous vous invitons à rester attentifs aux annonces sonores et à consulter les outils d'information à distance avant vos trajets.<br><br>Les RER en provenance de Poissy ou Cergy le Haut circulent jusqu'à La Défense Grande Arche. <br><br>Pour aller jusqu'à Charles de Gaulle Étoile :<br>* les clients à bord d'un RER en provenance de Poissy ou Cergy le Haut sont invités à descendre à La Défense, puis à emprunter la <a target="_blank" href="http://www.transilien.com/contents/fr/_Docs-PDF/Travaux/Ligne1.pdf">Ligne 1</a> du métro en correspondance.<br>* les clients à bord d'un RER en provenance de Marne la Vallée Chessy ou Boissy Saint-Léger ont la possibilité de descendre à Auber, de rejoindre les stations Havre Caumartin ou Opéra, d'emprunter la <a target="_blank" href="http://www.transilien.com/contents/fr/_Docs-PDF/Travaux/Ligne3.pdf">Ligne 3</a> jusqu'à Villiers puis la <a target="_blank" href="http://www.transilien.com/contents/fr/_Docs-PDF/Travaux/Ligne2.pdf">Ligne 2</a> jusqu'à Charles de Gaulle Étoile.<br><br>Pour se déplacer entre Charles de Gaulle Étoile et Paris Gare de Lyon ou Nation, il est conseillé de prendre la <a target="_blank" href="http://www.transilien.com/contents/fr/_Docs-PDF/Travaux/Ligne1.pdf">Ligne 1</a>.<br><br>Les clients souhaitant se déplacer entre Paris et :<br>*Conflans Fin d'Oise, sont invités à emprunter un train de la ligne J -<br>axe Paris Saint-Lazare - Conflans Sainte-Honorine - Mantes la Jolie<br>* Neuville<br>Université, sont invités à emprunter un train de la ligne J - axe Paris<br>Saint-Lazare - Pontoise - Gisors desservant la gare d'Eragny Neuville,<br>distante d'1,2 km de Neuville Université.<br>* Cergy Préfecture, Cergy Saint-Christophe et Cergy le Haut, sont invités à emprunter un train de<br>l'axe Paris - Pontoise - Gisors ou un train de la ligne H (réseau de<br>Paris Nord) ou de la ligne C du RER,&nbsp; en direction de Pontoise, puis les<br>bus urbains desservant l'agglomération de Cergy.<br>*Cergy le Haut entre 16h00 et 20h00 sont invités à emprunter un train de la ligne L.<br><br>Le trafic reste fortement perturbé sur le reste de la ligne.<br><br>Motif : fuite d'eau boueuse importante, consécutive à des travaux du chantier Eole.<br><br>SNCF Transilien<br></p>
</p>

						</div>
					</div>
				</div>
			

			

		</div>
	</div>





			

			


			<div class="row recherche-horaires-resultats">
				








<div class="row result-board ">
	<div class="col-sm-12">


		<div class="row column-title hidden-xs tn-text-12">
			<div class="col-sm-3 col-md-2 center-thing">
				Train
			</div>
			<div class="col-sm-1 center-thing">
				Départ
			</div>
			<div class="col-sm-5 col-md-6 center-thing">
				Destination
			</div>

			
				
					<div class="col-sm-1 center-thing ">
						Voie
					</div>
					<div class="col-sm-2 center-thing">
						Arrêts
					</div>
				
				
			

		</div>
		<div id="next-departure-result-list" class="next-departure-result-list">
			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">QAHA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:07
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>MARNE LA VALLEE CHESSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-0" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-0"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-0">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY RER A</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
									<li class="">NOISY CHAMPS</li>
								
									<li class="">TORCY</li>
								
									<li class="">BUSSY SAINT-GEORGES</li>
								
									<li class="">VAL D'EUROPE</li>
								
									<li class="">MARNE LA VALLEE CHESSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">ZITA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:08
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>SAINT-GERMAIN EN LAYE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-1" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-1"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-1">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">NANTERRE UNIVERSITE RER A</li>
								
									<li class="">NANTERRE VILLE</li>
								
									<li class="">RUEIL MALMAISON</li>
								
									<li class="">LE VESINET LE PECQ</li>
								
									<li class="">SAINT-GERMAIN EN LAYE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">DROP</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:09
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>NOISY LE GRAND MONT D'EST</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-2" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-2"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-2">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">PARIS GARE DE LYON</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">BRY SUR MARNE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">TPUR</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:11
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>POISSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">2</label>
									<label class="visible-xs-inline-block">Voie 2</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-3" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-3"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-3">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">HOUILLES CARRIERES SUR SEINE</li>
								
									<li class="">SARTROUVILLE</li>
								
									<li class="">MAISONS LAFFITTE</li>
								
									<li class="">ACHERES GRAND CORMIER</li>
								
									<li class="">POISSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-l">
							<span class="hors-viewport">traintrain-l</span>
						</span>
							<span class="code">PASA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:11
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>GARE DE PARIS SAINT-LAZARE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">2</label>
									<label class="visible-xs-inline-block">Voie 2</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-4" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-4"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-4">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">ASNIERES SUR SEINE</li>
								
									<li class="">CLICHY LEVALLOIS</li>
								
									<li class="">PONT CARDINET</li>
								
									<li class="">GARE DE PARIS SAINT-LAZARE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">QAHA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:13
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>MARNE LA VALLEE CHESSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-5" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-5"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-5">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">PARIS GARE DE LYON</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
									<li class="">NOISY CHAMPS</li>
								
									<li class="">TORCY</li>
								
									<li class="">BUSSY SAINT-GEORGES</li>
								
									<li class="">VAL D'EUROPE</li>
								
									<li class="">MARNE LA VALLEE CHESSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">QAHA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:12
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>MARNE LA VALLEE CHESSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-6" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-6"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-6">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY RER A</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
									<li class="">NOISY CHAMPS</li>
								
									<li class="">TORCY</li>
								
									<li class="">BUSSY SAINT-GEORGES</li>
								
									<li class="">VAL D'EUROPE</li>
								
									<li class="">MARNE LA VALLEE CHESSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-l">
							<span class="hors-viewport">traintrain-l</span>
						</span>
							<span class="code">SEBU</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:13
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>SAINT-NOM LA BRETECHE FORET DE MARLY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-7" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-7"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-7">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">PUTEAUX</li>
								
									<li class="">LE VAL D'OR</li>
								
									<li class="">SAINT-CLOUD</li>
								
									<li class="">GARCHES MARNES LA COQUETTE</li>
								
									<li class="">VAUCRESSON</li>
								
									<li class="">LA CELLE SAINT-CLOUD</li>
								
									<li class="">BOUGIVAL</li>
								
									<li class="">LOUVECIENNES</li>
								
									<li class="">MARLY LE ROI</li>
								
									<li class="">L'ETANG LA VILLE</li>
								
									<li class="">SAINT-NOM LA BRETECHE FORET DE MARLY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-u">
							<span class="hors-viewport">traintrain-u</span>
						</span>
							<span class="code">VERI</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:14
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>LA VERRIERE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">4</label>
									<label class="visible-xs-inline-block">Voie 4</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-8" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-8"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-8">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">PUTEAUX</li>
								
									<li class="">SURESNES MONT VALERIEN</li>
								
									<li class="">SAINT-CLOUD</li>
								
									<li class="">SEVRES VILLE D'AVRAY</li>
								
									<li class="">CHAVILLE RIVE DROITE</li>
								
									<li class="">VERSAILLES CHANTIERS</li>
								
									<li class="">SAINT-CYR</li>
								
									<li class="">SAINT-QUENTIN EN YVELINES</li>
								
									<li class="">TRAPPES</li>
								
									<li class="">LA VERRIERE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">NAGA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:15
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>BOISSY SAINT-LEGER</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-9" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-9"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-9">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">FONTENAY SOUS BOIS</li>
								
									<li class="">NOGENT SUR MARNE</li>
								
									<li class="">JOINVILLE LE PONT</li>
								
									<li class="">SAINT-MAUR CRETEIL</li>
								
									<li class="">LE PARC DE SAINT-MAUR</li>
								
									<li class="">CHAMPIGNY</li>
								
									<li class="">LA VARENNE CHENNEVIERES</li>
								
									<li class="">SUCY BONNEUIL</li>
								
									<li class="">BOISSY SAINT-LEGER</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">UGUI</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:16
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>CERGY LE HAUT</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">2</label>
									<label class="visible-xs-inline-block">Voie 2</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-10" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-10"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-10">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">SARTROUVILLE</li>
								
									<li class="">ACHERES VILLE</li>
								
									<li class="">CONFLANS FIN D'OISE</li>
								
									<li class="">NEUVILLE UNIVERSITE</li>
								
									<li class="">CERGY PREFECTURE</li>
								
									<li class="">CERGY SAINT-CHRISTOPHE</li>
								
									<li class="">CERGY LE HAUT</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-l">
							<span class="hors-viewport">traintrain-l</span>
						</span>
							<span class="code">PEBU</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:16
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>GARE DE PARIS SAINT-LAZARE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">2</label>
									<label class="visible-xs-inline-block">Voie 2</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-11" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-11"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-11">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">COURBEVOIE</li>
								
									<li class="">BECON LES BRUYERES</li>
								
									<li class="">GARE DE PARIS SAINT-LAZARE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-l">
							<span class="hors-viewport">traintrain-l</span>
						</span>
							<span class="code">VASA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:18
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>VERSAILLES RIVE DROITE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-12" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-12"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-12">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">SURESNES MONT VALERIEN</li>
								
									<li class="">SAINT-CLOUD</li>
								
									<li class="">SEVRES VILLE D'AVRAY</li>
								
									<li class="">CHAVILLE RIVE DROITE</li>
								
									<li class="">VIROFLAY RIVE DROITE</li>
								
									<li class="">MONTREUIL</li>
								
									<li class="">VERSAILLES RIVE DROITE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">ZITA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:18
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>SAINT-GERMAIN EN LAYE</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-13" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-13"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-13">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">NANTERRE UNIVERSITE RER A</li>
								
									<li class="">NANTERRE VILLE</li>
								
									<li class="">RUEIL MALMAISON</li>
								
									<li class="">LE VESINET LE PECQ</li>
								
									<li class="">SAINT-GERMAIN EN LAYE</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">DROP</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:19
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>NOISY LE GRAND MONT D'EST</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-14" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-14"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-14">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">PARIS GARE DE LYON</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">BRY SUR MARNE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">UGUI</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:20
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>CERGY LE HAUT</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-15" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-15"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-15">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">SARTROUVILLE</li>
								
									<li class="">ACHERES VILLE</li>
								
									<li class="">CONFLANS FIN D'OISE</li>
								
									<li class="">NEUVILLE UNIVERSITE</li>
								
									<li class="">CERGY PREFECTURE</li>
								
									<li class="">CERGY SAINT-CHRISTOPHE</li>
								
									<li class="">CERGY LE HAUT</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">TPUR</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:21
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>POISSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">2</label>
									<label class="visible-xs-inline-block">Voie 2</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-16" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-16"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-16">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">NANTERRE PREFECTURE</li>
								
									<li class="">HOUILLES CARRIERES SUR SEINE</li>
								
									<li class="">SARTROUVILLE</li>
								
									<li class="">MAISONS LAFFITTE</li>
								
									<li class="">ACHERES GRAND CORMIER</li>
								
									<li class="">POISSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 train">
								<span class="hors-viewport">train</span>
							</span>
							<span class="picto-transport size27 train-l">
							<span class="hors-viewport">traintrain-l</span>
						</span>
							<span class="code">SEBU</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:22
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>SAINT-NOM LA BRETECHE FORET DE MARLY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">3</label>
									<label class="visible-xs-inline-block">Voie 3</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-17" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-17"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-17">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">PUTEAUX</li>
								
									<li class="">LE VAL D'OR</li>
								
									<li class="">SAINT-CLOUD</li>
								
									<li class="">GARCHES MARNES LA COQUETTE</li>
								
									<li class="">VAUCRESSON</li>
								
									<li class="">LA CELLE SAINT-CLOUD</li>
								
									<li class="">BOUGIVAL</li>
								
									<li class="">LOUVECIENNES</li>
								
									<li class="">MARLY LE ROI</li>
								
									<li class="">L'ETANG LA VILLE</li>
								
									<li class="">SAINT-NOM LA BRETECHE FORET DE MARLY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">QAHA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:23
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>MARNE LA VALLEE CHESSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

									<label class="hidden-xs">1</label>
									<label class="visible-xs-inline-block">Voie 1</label>
								

								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-18" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-18"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-18">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">PARIS GARE DE LYON</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
									<li class="">NOISY CHAMPS</li>
								
									<li class="">TORCY</li>
								
									<li class="">BUSSY SAINT-GEORGES</li>
								
									<li class="">VAL D'EUROPE</li>
								
									<li class="">MARNE LA VALLEE CHESSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
				<div class="next-departure-result">
					<div class="row result-main-line">
						<div class="wraper-line-icon-code col-xs-6 col-sm-3 col-md-2 tn-xs-text-16">
							<span class="picto-transport size27 rer">
								<span class="hors-viewport">rer</span>
							</span>
							<span class="picto-transport size27 rer-a">
							<span class="hors-viewport">rerrer-a</span>
						</span>
							<span class="code">QAHA</span>
						</div>

						<span class="hour col-xs-4 col-sm-1 col-xs-offset-2 col-sm-offset-0 center-thing tn-xs-text-16">
								18:22
						</span>

						<div class="col-xs-8 col-sm-5 col-md-6 destination-col ">
							<span class="tn-xs-text-16"><h3
									class="visible-xs tn-text-12">Destination</h3>MARNE LA VALLEE CHESSY</span>
						</div>

						<div class="col-sm-1 col-xs-4 center-thing pathway tn-text-13 tn-xs-text-16">
							

								

								
									<label class="hidden-sm hidden-md hidden-lg">Voie --</label>
								
							

						</div>
						<div class="col-sm-2 col-xs-12 center-thing served-station-link">
							<a href="#next-departure-result-stops-19" data-toggle="collapse"
							   aria-expanded="false"
							   aria-controls="next-departure-result-stops-19"
							   data-parent="#next-departure-result-list" class="horaire-tableau-fleche">
										<span class="hidden-xs center-thing">
											<span class="aria-not-expanded">Voir les arrêts</span>
											<span class="aria-expanded">FERMER</span>
										</span>
								<span class="hidden-sm hidden-md hidden-lg ">
											<span class="aria-not-expanded"><i
													class="tnicons tnicons-chevron"></i></span>
											<span class="aria-expanded"><i
													class="tnicons tnicons-chevron tnicons-rotate-180"></i></span>
										</span>
							</a>
						</div>
					</div>

					<div class="row stops collapse" id="next-departure-result-stops-19">
						<div class="col-sm-12">
							<ul class="station-stops ">
								<p>Gares Desservies</p>
								
									<li class="">CHARLES DE GAULLE ETOILE</li>
								
									<li class="">AUBER</li>
								
									<li class="">CHATELET LES HALLES</li>
								
									<li class="">NATION</li>
								
									<li class="">VINCENNES</li>
								
									<li class="">VAL DE FONTENAY RER A</li>
								
									<li class="">NEUILLY PLAISANCE</li>
								
									<li class="">NOISY LE GRAND MONT D'EST</li>
								
									<li class="">NOISY CHAMPS</li>
								
									<li class="">TORCY</li>
								
									<li class="">BUSSY SAINT-GEORGES</li>
								
									<li class="">VAL D'EUROPE</li>
								
									<li class="">MARNE LA VALLEE CHESSY</li>
								
							</ul>
						</div>
					</div>
				</div>

			
		</div>
	</div>
</div>

			</div>

			<!-- Actualisation de la recherche -->
			<div class="recherche-horaire-resultats-title hidden-xs container-btn center-thing">
				<form id="nextDepartureForm" action="/fr/horaires/prochains-departs" method="POST">
					<input id="departure" name="departure" type="hidden" value="LA DEFENSE GRANDE ARCHE"/>
					<input id="uicDeparture" name="uicDeparture" type="hidden" value="8738221"/>
					<input id="destination" name="destination" type="hidden" value=""/>
					<input id="uicDestination" name="uicDestination" type="hidden" value=""/>

					<input onclick="return tc_events_conteneurID(this, 'clic', {'Evt_Categorie' : 'resultat', 'Evt_Action' : 'actualiser', 'Evt_Opt_label' : 'Prochains_departs', 'Type' : 'event'});"
						   type="submit" class="btn-primary" value="Actualiser la recherche"/>
				</form>
			</div>
			<!-- BLOC FICHES HORAIRES -->
			<div class="timetable-sheets-link-container row">
				<h3 class="center-thing">Vous cherchez un autre horaire ?</h3>
				<p class="hidden-xs">Retrouvez l'ensemble des horaires de votre ligne sur la fiche horaire correspondante. <br/>
					Vous pouvez toujours consulter les fiches horaires de votre ligne pour connaître les horaires programmés.</p>
				<a class="timetable-sheets-link"
				   href="/fr/page-editoriale/les-fiches-horaires">télécharger la fiche horaire</a>
			</div>
		
	
</div>
<!-- END .b_result_recherche -->


					</div>
				</div>

			<!-- END scald=23 --><div id="home-editorial" class="container"><div class="row cols-same-height"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 b_articles">    <div class="tbox tbox-mini tbox-full tbox-pink color-black"><div class="illus"><!-- scald=3004:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/avis_onglet2_2.jpg?itok=IbMqJaOV" width="380" height="155" alt="" /><!-- END scald=3004 --></div><div class="col-xs-12"><h2 class="field-item title"><em>Transilien.com </em>continue d'évoluer <em>grâce à vos retours</em></h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">Depuis le lancement du nouveau site, vous êtes déjà plus de mille à avoir utilisé l'onglet "votre...</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://www.transilien.com/fr/page-editoriale/transiliencom-continue-devoluer-grace-a-vos-retours" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  </div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12  b_sliders"><div id="carousel-example-generic" class="carousel slide tbox tbox-mini tbox-slider" data-ride="carousel" data-interval="6000"><!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item active ">
    <div>    <div class="illus-full"><!-- scald=3169:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/carrousel_forfait_etudiant.png?itok=CNreaq6v" width="380" height="155" alt="" /><!-- END scald=3169 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">FAITES DES ÉCONOMIES AVEC LES FORFAITS ETUDIANTS PARIS IDF</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">Une offre complémentaire à votre forfait IMAGINE R ou Navigo pour bouger à volonté.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://www.transilien.com/fr/page-editoriale/deplacez-vous-sans-en-voir-de-toutes-les-couleurs?utm_source=Transilien&amp;utm_medium=Carrousel&amp;utm_campaign=ForfaitEtudiant#decouvrez-le-forfait-1471" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div>
    <div class="item ">
    <div>    <div class="illus-full"><!-- scald=3160:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/carrousel_travaux.png?itok=zGGZLwp1" width="380" height="155" alt="" /><!-- END scald=3160 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">TRAVAUX D'AUTOMNE 2017 SUR LE RER C</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">Limitations temporaires de vitesses sur le RER C, du lundi 16/10 au dimanche 17/12/2017.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://malignec.transilien.com/2017/10/09/ltv-automne-2017/" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div>
    <div class="item ">
    <div>    <div class="illus-full"><!-- scald=3013:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/plot_0.png?itok=cpV3xPUn" width="380" height="155" alt="" /><!-- END scald=3013 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">RER C : travaux en gare du pont de l'alma</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">La gare réouvrira le mercredi 2 janvier 2019.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://malignec.transilien.com/2017/07/25/fermeture-de-gare-pont-de-lalma/" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div>
    <div class="item ">
    <div>    <div class="illus-full"><!-- scald=3166:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/carrousel_uarena.jpg?itok=6PqIGB22" width="380" height="155" alt="" /><!-- END scald=3166 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">Tous les chemins mènent à la U ARENA</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">La Défense, toutes les infos pour rejoindre ARENA à pied et en repartir en transports en commun.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://rera-leblog.fr/itineraires-conseilles-pour-quitter-lu-arena-apres-votre-concert/" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div>
    <div class="item ">
    <div>    <div class="illus-full"><!-- scald=3170:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/carrousel_ouicar.png?itok=2PZ7Uirr" width="380" height="155" alt="" /><!-- END scald=3170 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">TRANSILIEN VOUS OFFRE DES AVANTAGES EXCLUSIFS SUR OUICAR !</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">Votre boitier OuiCar Connect offert ou 20€ de réduction sur votre location OuiCar.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://www.transilien.com/fr/page-editoriale/ouicar-la-location-de-voitures-entre-particuliers?utm_source=Transilien&amp;utm_medium=Carrousel&amp;utm_campaign=OuiCar" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div>
    <div class="item ">
    <div>    <div class="illus-full"><!-- scald=3174:full --><img typeof="foaf:Image" class="img-responsive" src="https://www.transilien.com/sites/default/files/styles/diaporama/public/thumbnails/image/carrousel_ligner.png?itok=JuVz0FcT" width="380" height="155" alt="" /><!-- END scald=3174 --></div><div class="col-xs-12"><div class="group-item-content"><h2 class="field-item title">NOUVEAU TRAIN &amp; NOUVEAU BLOG !</h2><div class="field field-name-field-descriptif field-type-text-with-summary field-label-hidden">Pour accompagner l’arrivée du nouveau train, nous ouvrons un blog et prochainement un fil Twitter.&#13;
</div><div class="field field-name-field-url field-type-link-field field-label-hidden"><div class="field-items"><div class="field-item odd"><a href="https://maligner.transilien.com/" class="link-diapo">En savoir plus</a></div></div></div></div></div>
  
    </div>
    </div></div><!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="icon icon-prev glyphicon glyphicon-menu-left"></span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="icon icon-next glyphicon glyphicon-menu-right"></span>
  </a><div class="container"><div id="carouselButtons">
      <button id="playButton" type="button" class="play-button">
          Play
       </button>
      <button id="pauseButton" type="button" class="pause-button">
          Pause
      </button>
  </div><!-- Indicators -->
      <ol class="carousel-indicators"><li tabindex="0" class="active" data-target="#carousel-example-generic" data-slide-to="0"> 1</li><li tabindex="0" class="" data-target="#carousel-example-generic" data-slide-to="1"> 2</li><li tabindex="0" class="" data-target="#carousel-example-generic" data-slide-to="2"> 3</li><li tabindex="0" class="" data-target="#carousel-example-generic" data-slide-to="3"> 4</li><li tabindex="0" class="" data-target="#carousel-example-generic" data-slide-to="4"> 5</li><li tabindex="0" class="" data-target="#carousel-example-generic" data-slide-to="5"> 6</li></ol></div></div></div></div><div class="row cols-same-height marginbottom-xs"><ul class="field-items tbox-list"><li class="field-item col-xs-3"><!-- scald=416:picto --><!-- END scald=416 --></li></ul></div></div>
  
</section>
  </div>

        
</div>



<div id="mainfooter">
    <div class="prefooter-tag-inscription">
        <div class="container">
                            <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-sx-12 absolute-line">
                                        <div class="div-tag-inscription ">
                      <form action="/moncompte/inscription/taginscriptionsubmit" method="POST" class="tag-inscription-form" id="formTagInscription">
                        <label class="text-uppercase field-items tag-inscription-label">S'inscrire aux <em>actualités Transilien</em></label><input type="text" id="identifiantMonCompte" name="identifiantMonCompte" class="form-control tag-inscription-identifiant" placeholder="email" />
                        <button type="submit" id="submitTagInscription" class="btn btn-default">Ok</button>
                      </form>
                    </div>
                  </div>

                </div>
                    </div>
    </div>
    <div class="social">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-sx-12 absolute-line">
                    <!--
                      -->                                            <div class="social">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-sx-12 absolute-line">
        <ul class="push-b clearfix">
                      <li class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <a
                             href="/fr/page-editoriale/les-plans-du-reseau"
                               class="group-fglink" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'footer', 'Evt_Opt_label' : 'Plans du réseau', 'Type' : 'event'});">
                  <span class="illus pull-left"><img typeof="foaf:Image" class="prefooter-img" src="https://www.transilien.com/sites/default/files/styles/mu/public/menu_icons/picto-plan_3.png?itok=yCYxYzDx" alt="" />
                  </span>
                <p class="text-uppercase field-items">Plans du <em>réseau</em></p>
                <p class="link field-items">Les plans de toutes les lignes<span class="arrow-footer">
                  </span>
                </p>
            </a>
          </li>
                      <li class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <a
                             href="/fr/page-editoriale/application-sncf"
                               class="group-fglink" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'footer', 'Evt_Opt_label' : 'Appli SNCF', 'Type' : 'event'});">
                  <span class="illus pull-left"><img typeof="foaf:Image" class="prefooter-img" src="https://www.transilien.com/sites/default/files/styles/mu/public/menu_icons/picto-mobile_3.png?itok=OIg_mocL" alt="" />
                  </span>
                <p class="text-uppercase field-items">Appli <em>SNCF</em></p>
                <p class="link field-items">L'accès en mobilité<span class="arrow-footer">
                  </span>
                </p>
            </a>
          </li>
                      <li class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <a
                             href="/fr/page-editoriale/les-blogs-de-ligne"
                               class="group-fglink" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'footer', 'Evt_Opt_label' : 'Blogs', 'Type' : 'event'});">
                  <span class="illus pull-left"><img typeof="foaf:Image" class="prefooter-img" src="https://www.transilien.com/sites/default/files/styles/mu/public/menu_icons/picto-blog_3.png?itok=zm3BHsjP" alt="" />
                  </span>
                <p class="text-uppercase field-items"><em>Blogs</em></p>
                <p class="link field-items">L'actualité de votre ligne<span class="arrow-footer">
                  </span>
                </p>
            </a>
          </li>
                      <li class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <a
                             href="/fr/page-editoriale/les-comptes-twitter"
                               class="group-fglink" onclick="javascript:return tc_events_3(this, 'clic', {'Evt_Categorie' : 'Navigation', 'Evt_Action' : 'footer', 'Evt_Opt_label' : 'Twitter', 'Type' : 'event'});">
                  <span class="illus pull-left"><img typeof="foaf:Image" class="prefooter-img" src="https://www.transilien.com/sites/default/files/styles/mu/public/menu_icons/picto-tw_4.png?itok=wPuZfcSn" alt="" />
                  </span>
                <p class="text-uppercase field-items"><em>Twitter</em></p>
                <p class="link field-items">L'info en temps réel<span class="arrow-footer">
                  </span>
                </p>
            </a>
          </li>
                    </ul>
      </div>
    </div>
  </div>
</div>

                                    </div>
            </div>
        </div>
    </div>
    <div class="links">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-sx-12 absolute-line">
                                        <ul class="link-1"><li class="menu-521 first"><a href="/fr/page-de-liste-editoriale/nos-engagements" title="" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Nos engagements&#039;, &#039;Type&#039; : &#039;event&#039;});">Nos engagements</a></li>
<li class="menu-522"><a href="/fr/page-editoriale/devenez-partenaire-de-transiliencom" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Partenariats&#039;, &#039;Type&#039; : &#039;event&#039;});">Partenariats</a></li>
<li class="menu-526"><a href="/fr/presse-annee/communiques-et-dossiers-de-presse-2017" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;presse&#039;, &#039;Type&#039; : &#039;event&#039;});">presse</a></li>
<li class="menu-524"><a href="/fr/%23" id="lnkEpticaModal" data-target="#epticaModal" data-backdrop="static" data-toggle="modal" iframe-id="popinEpticaModal" iframe-url="//transilien.epticahosting.com/selftransilien/" iframe-style="width:1024px;height:768px;" class="btn-iframe" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;services_reseaux_sociaux&#039;, &#039;Evt_Action&#039; : &#039;Sortie&#039;, &#039;Evt_Opt_label&#039; : &#039;Aide_Contact&#039;, &#039;Type&#039; : &#039;event&#039;});">FAQ</a></li>
<li class="menu-2035"><a href="/fr/contact/formulairecontact" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Contact&#039;, &#039;Type&#039; : &#039;event&#039;});">Contact</a></li>
<li class="menu-523 last"><a href="http://96minutes.transilien.com/" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;96 Minutes&#039;, &#039;Type&#039; : &#039;event&#039;});">96 Minutes</a></li>
</ul>                    <footer role="contentinfo">
                                                    <ul class="link-2"><li class="menu-520 first"><a href="/fr/page-editoriale/mentions-legales-credits-cil" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Mentions légales&#039;, &#039;Type&#039; : &#039;event&#039;});">Mentions légales</a></li>
<li class="menu-519"><a href="/fr/page-editoriale/entreprises-collectivites-et-partenaires" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Solutions d&amp;#039;entreprises&#039;, &#039;Type&#039; : &#039;event&#039;});">Solutions d&#039;entreprises</a></li>
<li class="menu-2776 last"><a href="https://data.sncf.com/" onclick="javascript:return tc_events_3(this, &#039;clic&#039;, {&#039;Evt_Categorie&#039; : &#039;Navigation&#039;, &#039;Evt_Action&#039; : &#039;footer&#039;, &#039;Evt_Opt_label&#039; : &#039;Open Data&#039;, &#039;Type&#039; : &#039;event&#039;});">Open Data</a></li>
</ul>                                            </footer>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    jQuery.each(jQuery('.view-footer-social').find('a'), function(index, link) {
        var footerLinks = jQuery(link).attr('href').replace('http://prod1.transilien.vsct.fr', '');
        jQuery(link).attr('href', footerLinks);
    });
</script>

<div class="modal fade" id="epticaModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-header">
            <button type="button" class="btn btn-default" data-dismiss="modal">
                Fermer
            </button>
        </div>
        <div class="modal-body" id="popinEpticaModal" __if_init__="1"></div>
    </div>
</div>
  <script src="https://www.transilien.com/sites/all/themes/contrib/bootstrap/js/bootstrap.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/charte/js/lib/bootstrap/bootstrap.min.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/charte/js/lib/perfect-scrollbar/perfect-scrollbar.min.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/charte/js/lib/bootstrap-select/bootstrap-select.min.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/charte/js/lib/Swapsies/Swapsies.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/charte/js/lib/jquery-ui/jquery-ui.min.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/custom/transilien/js/custom.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/custom/transilien/js/taggages.js?oydbgz"></script>
<script src="https://www.transilien.com/sites/all/themes/custom/transilien/js/accessibility.js?oydbgz"></script>
    <!--
    -->  <!-- Adding js tag-->
  
				








<div class="modal fade print-page" id="print_page" tabindex="0" role="dialog" aria-labelledby="modal-title-route2" aria-hidden="true">
 	<div class="modal-dialog">
		<div class="modal-content">
		    <div class="modal-body">
				<div class="print-container color-purple print">
				  <div class="brand-title">
					  <img src="/img/common/header_title.png" alt="transilien">
				  </div>
				  
				  <button type="button" class="btn-close" data-dismiss="modal" title="Fermer"><span class="sr-only">Fermer</span></button>
				
				  <div class="title text-uppercase">Gares</div>
				
				  <div class="recap_search">
				    <div class="depart">
				      <div class="text-uppercase title">Départ :</div>
						<span class="text-uppercase"> LA DEFENSE GRANDE ARCHE</span>
				    </div>
					  
				  </div>
					
				  <table class="recherche-horaires-resultats">
				    <thead>
				      <tr>
				        <th class="trains">Train</th>
				        <th class="time">Départ
				        	
				        </th>
				        <th class="destination">Destination</th>
						  
				       	 <th class="way">Voie</th>
				       	
				      </tr>
				    </thead>
				    <tbody>
					
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">QAHA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:07
						          </span>
						        </td>

								  <td>MARNE LA VALLEE CHESSY</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											13
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY RER A
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
										<li>
												NOISY CHAMPS
										</li>
									
										<li>
												TORCY
										</li>
									
										<li>
												BUSSY SAINT-GEORGES
										</li>
									
										<li>
												VAL D'EUROPE
										</li>
									
										<li>
												MARNE LA VALLEE CHESSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">ZITA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:08
						          </span>
						        </td>

								  <td>SAINT-GERMAIN EN LAYE</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											6
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												NANTERRE UNIVERSITE RER A
										</li>
									
										<li>
												NANTERRE VILLE
										</li>
									
										<li>
												RUEIL MALMAISON
										</li>
									
										<li>
												LE VESINET LE PECQ
										</li>
									
										<li>
												SAINT-GERMAIN EN LAYE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">DROP</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:09
						          </span>
						        </td>

								  <td>NOISY LE GRAND MONT D'EST</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											10
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												PARIS GARE DE LYON
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												BRY SUR MARNE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">TPUR</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:11
						          </span>
						        </td>

								  <td>POISSY</td>
								  
									  <td>
										  
											  <span class="pathway"> 2 </span>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											6
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												HOUILLES CARRIERES SUR SEINE
										</li>
									
										<li>
												SARTROUVILLE
										</li>
									
										<li>
												MAISONS LAFFITTE
										</li>
									
										<li>
												ACHERES GRAND CORMIER
										</li>
									
										<li>
												POISSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-l">
										<span class="hors-viewport">train train-l</span>
									  </span>
									<span class="code">PASA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:11
						          </span>
						        </td>

								  <td>GARE DE PARIS SAINT-LAZARE</td>
								  
									  <td>
										  
											  <span class="pathway"> 2 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											4
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												ASNIERES SUR SEINE
										</li>
									
										<li>
												CLICHY LEVALLOIS
										</li>
									
										<li>
												PONT CARDINET
										</li>
									
										<li>
												GARE DE PARIS SAINT-LAZARE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">QAHA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:13
						          </span>
						        </td>

								  <td>MARNE LA VALLEE CHESSY</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											14
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												PARIS GARE DE LYON
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
										<li>
												NOISY CHAMPS
										</li>
									
										<li>
												TORCY
										</li>
									
										<li>
												BUSSY SAINT-GEORGES
										</li>
									
										<li>
												VAL D'EUROPE
										</li>
									
										<li>
												MARNE LA VALLEE CHESSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">QAHA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:12
						          </span>
						        </td>

								  <td>MARNE LA VALLEE CHESSY</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											13
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY RER A
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
										<li>
												NOISY CHAMPS
										</li>
									
										<li>
												TORCY
										</li>
									
										<li>
												BUSSY SAINT-GEORGES
										</li>
									
										<li>
												VAL D'EUROPE
										</li>
									
										<li>
												MARNE LA VALLEE CHESSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-l">
										<span class="hors-viewport">train train-l</span>
									  </span>
									<span class="code">SEBU</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:13
						          </span>
						        </td>

								  <td>SAINT-NOM LA BRETECHE FORET DE MARLY</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											11
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												PUTEAUX
										</li>
									
										<li>
												LE VAL D'OR
										</li>
									
										<li>
												SAINT-CLOUD
										</li>
									
										<li>
												GARCHES MARNES LA COQUETTE
										</li>
									
										<li>
												VAUCRESSON
										</li>
									
										<li>
												LA CELLE SAINT-CLOUD
										</li>
									
										<li>
												BOUGIVAL
										</li>
									
										<li>
												LOUVECIENNES
										</li>
									
										<li>
												MARLY LE ROI
										</li>
									
										<li>
												L'ETANG LA VILLE
										</li>
									
										<li>
												SAINT-NOM LA BRETECHE FORET DE MARLY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-u">
										<span class="hors-viewport">train train-u</span>
									  </span>
									<span class="code">VERI</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:14
						          </span>
						        </td>

								  <td>LA VERRIERE</td>
								  
									  <td>
										  
											  <span class="pathway"> 4 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											10
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												PUTEAUX
										</li>
									
										<li>
												SURESNES MONT VALERIEN
										</li>
									
										<li>
												SAINT-CLOUD
										</li>
									
										<li>
												SEVRES VILLE D'AVRAY
										</li>
									
										<li>
												CHAVILLE RIVE DROITE
										</li>
									
										<li>
												VERSAILLES CHANTIERS
										</li>
									
										<li>
												SAINT-CYR
										</li>
									
										<li>
												SAINT-QUENTIN EN YVELINES
										</li>
									
										<li>
												TRAPPES
										</li>
									
										<li>
												LA VERRIERE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">NAGA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:15
						          </span>
						        </td>

								  <td>BOISSY SAINT-LEGER</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											14
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												FONTENAY SOUS BOIS
										</li>
									
										<li>
												NOGENT SUR MARNE
										</li>
									
										<li>
												JOINVILLE LE PONT
										</li>
									
										<li>
												SAINT-MAUR CRETEIL
										</li>
									
										<li>
												LE PARC DE SAINT-MAUR
										</li>
									
										<li>
												CHAMPIGNY
										</li>
									
										<li>
												LA VARENNE CHENNEVIERES
										</li>
									
										<li>
												SUCY BONNEUIL
										</li>
									
										<li>
												BOISSY SAINT-LEGER
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">UGUI</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:16
						          </span>
						        </td>

								  <td>CERGY LE HAUT</td>
								  
									  <td>
										  
											  <span class="pathway"> 2 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											8
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												SARTROUVILLE
										</li>
									
										<li>
												ACHERES VILLE
										</li>
									
										<li>
												CONFLANS FIN D'OISE
										</li>
									
										<li>
												NEUVILLE UNIVERSITE
										</li>
									
										<li>
												CERGY PREFECTURE
										</li>
									
										<li>
												CERGY SAINT-CHRISTOPHE
										</li>
									
										<li>
												CERGY LE HAUT
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-l">
										<span class="hors-viewport">train train-l</span>
									  </span>
									<span class="code">PEBU</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:16
						          </span>
						        </td>

								  <td>GARE DE PARIS SAINT-LAZARE</td>
								  
									  <td>
										  
											  <span class="pathway"> 2 </span>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											3
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												COURBEVOIE
										</li>
									
										<li>
												BECON LES BRUYERES
										</li>
									
										<li>
												GARE DE PARIS SAINT-LAZARE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-l">
										<span class="hors-viewport">train train-l</span>
									  </span>
									<span class="code">VASA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:18
						          </span>
						        </td>

								  <td>VERSAILLES RIVE DROITE</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											7
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												SURESNES MONT VALERIEN
										</li>
									
										<li>
												SAINT-CLOUD
										</li>
									
										<li>
												SEVRES VILLE D'AVRAY
										</li>
									
										<li>
												CHAVILLE RIVE DROITE
										</li>
									
										<li>
												VIROFLAY RIVE DROITE
										</li>
									
										<li>
												MONTREUIL
										</li>
									
										<li>
												VERSAILLES RIVE DROITE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">ZITA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:18
						          </span>
						        </td>

								  <td>SAINT-GERMAIN EN LAYE</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											6
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												NANTERRE UNIVERSITE RER A
										</li>
									
										<li>
												NANTERRE VILLE
										</li>
									
										<li>
												RUEIL MALMAISON
										</li>
									
										<li>
												LE VESINET LE PECQ
										</li>
									
										<li>
												SAINT-GERMAIN EN LAYE
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">DROP</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:19
						          </span>
						        </td>

								  <td>NOISY LE GRAND MONT D'EST</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											10
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												PARIS GARE DE LYON
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												BRY SUR MARNE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">UGUI</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:20
						          </span>
						        </td>

								  <td>CERGY LE HAUT</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											8
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												SARTROUVILLE
										</li>
									
										<li>
												ACHERES VILLE
										</li>
									
										<li>
												CONFLANS FIN D'OISE
										</li>
									
										<li>
												NEUVILLE UNIVERSITE
										</li>
									
										<li>
												CERGY PREFECTURE
										</li>
									
										<li>
												CERGY SAINT-CHRISTOPHE
										</li>
									
										<li>
												CERGY LE HAUT
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">TPUR</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:21
						          </span>
						        </td>

								  <td>POISSY</td>
								  
									  <td>
										  
											  <span class="pathway"> 2 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											6
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												NANTERRE PREFECTURE
										</li>
									
										<li>
												HOUILLES CARRIERES SUR SEINE
										</li>
									
										<li>
												SARTROUVILLE
										</li>
									
										<li>
												MAISONS LAFFITTE
										</li>
									
										<li>
												ACHERES GRAND CORMIER
										</li>
									
										<li>
												POISSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 train">
										<span class="hors-viewport">train</span>
									  </span>
									<span class="picto-transport size27 train-l">
										<span class="hors-viewport">train train-l</span>
									  </span>
									<span class="code">SEBU</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:22
						          </span>
						        </td>

								  <td>SAINT-NOM LA BRETECHE FORET DE MARLY</td>
								  
									  <td>
										  
											  <span class="pathway"> 3 </span>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											11
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												PUTEAUX
										</li>
									
										<li>
												LE VAL D'OR
										</li>
									
										<li>
												SAINT-CLOUD
										</li>
									
										<li>
												GARCHES MARNES LA COQUETTE
										</li>
									
										<li>
												VAUCRESSON
										</li>
									
										<li>
												LA CELLE SAINT-CLOUD
										</li>
									
										<li>
												BOUGIVAL
										</li>
									
										<li>
												LOUVECIENNES
										</li>
									
										<li>
												MARLY LE ROI
										</li>
									
										<li>
												L'ETANG LA VILLE
										</li>
									
										<li>
												SAINT-NOM LA BRETECHE FORET DE MARLY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
								
							
							
						
						      <tr class="odd">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">QAHA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:23
						          </span>
						        </td>

								  <td>MARNE LA VALLEE CHESSY</td>
								  
									  <td>
										  
											  <span class="pathway"> 1 </span>
										  
									  </td>
								  
						      </tr>
						<tr class=" odd stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											14
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												PARIS GARE DE LYON
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
										<li>
												NOISY CHAMPS
										</li>
									
										<li>
												TORCY
										</li>
									
										<li>
												BUSSY SAINT-GEORGES
										</li>
									
										<li>
												VAL D'EUROPE
										</li>
									
										<li>
												MARNE LA VALLEE CHESSY
										</li>
									
								</ul>
							</td>
						</tr>
							
						 
							
							
								
							
						
						      <tr class="">
						        <td class="train">
									  <span class="picto-transport size27 rer">
										<span class="hors-viewport">rer</span>
									  </span>
									<span class="picto-transport size27 rer-a">
										<span class="hors-viewport">rer rer-a</span>
									  </span>
									<span class="code">QAHA</span>
						        </td>
						        <td>
						          <span class="hour">
										  18:22
						          </span>
						        </td>

								  <td>MARNE LA VALLEE CHESSY</td>
								  
									  <td>
										  
									  </td>
								  
						      </tr>
						<tr class="  stops">

							<td colspan="4">
								<ul>
									<div class="stopnumber">
											13
										
											
											
												Arrêts
											
										
									</div>
									
										<li>
												CHARLES DE GAULLE ETOILE
										</li>
									
										<li>
												AUBER
										</li>
									
										<li>
												CHATELET LES HALLES
										</li>
									
										<li>
												NATION
										</li>
									
										<li>
												VINCENNES
										</li>
									
										<li>
												VAL DE FONTENAY RER A
										</li>
									
										<li>
												NEUILLY PLAISANCE
										</li>
									
										<li>
												NOISY LE GRAND MONT D'EST
										</li>
									
										<li>
												NOISY CHAMPS
										</li>
									
										<li>
												TORCY
										</li>
									
										<li>
												BUSSY SAINT-GEORGES
										</li>
									
										<li>
												VAL D'EUROPE
										</li>
									
										<li>
												MARNE LA VALLEE CHESSY
										</li>
									
								</ul>
							</td>
						</tr>
							
				    </tbody>
				  </table>
			
			</div>
	
	      <div class="modal-footer">
	        <a href="" class="btn btn-grey" data-dismiss="modal">Fermer</a>
	        <a href="#" class="btn btn-default print-iframe">Imprimer</a>
	      </div>
		</div>
		</div>
	</div>
</div>

				



<script type="text/javascript"  src="/tricharte/js/lib/access-tabs/tablist.min.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/triCore.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/mozilla/localforage.min.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/map/mapbox.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/map/simplify.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/tooltip.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/map/leaflet.label.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/services.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/searchForm.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/trMapUtils.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/lignes.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/points.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/departure.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/itineraire.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/schedule.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/mask/jquery.mask.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/bootstrap-datepicker/bootstrap-datepicker.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/bootstrap-datepicker/locales/bootstrap-datepicker.fr.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/parsley/parsley.min.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/parsley/fr.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/formatter/jquery.formatter.min.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/tagCommanderManager.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map/pointer_events_polyfill.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/mapOnly.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/map.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/isMobile.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/common.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/world_home.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/lib/intl-tel/intlTelInput.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/world_mon-compte.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/comp_calendar.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/jquery.autocomplete.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/functions.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/desambiguisation.js?5552" ></script>
<script type="text/javascript"  src="/tricharte/js/errorMessage.js?5552" ></script>

				<script type="text/javascript"  src="/tricharte/js/homepage.js?5552" ></script>
				











<script type="text/javascript" src="//cdn.tagcommander.com/1781/tc_Transilien_3.js"></script>
<NOSCRIPT>
    <IFRAME src="//redirect1781.tagcommander.com/utils/noscript.php?id=Transilien_3&mode=iframe&pagename=&order_id=&order_amount_tf_without_sf=" width="1" height="1"></IFRAME>
</NOSCRIPT>
			
</body>
</html>
	
`

const flatten = (data) => data.childNodes.filter(x=>!x.text||!x.text.match(/^\s*$/)).map(x=>x.text?x.text.trim():flatten(x)).reduce((acc, value)=>acc.concat(value),[])
const data = new DomParser().parseFromString(html).getElementsByClassName('next-departure-result').map(result => flatten(result).filter(x=>!['Destination', 'Voir les arrêts', 'Gares Desservies', 'FERMER'].includes(x)))
    .map(result=>result[5] === 'Voie --' ? [...result.slice(0, 5), '', ...result.slice(5)] : result)
    .map(result=>[result[0].toUpperCase(), result[1].substring(result[1].indexOf('-')+1).toUpperCase(), ...result.slice(2)])
    .map(result=> {
        return {
            savedNumber:result[2],
            stop_date_time: {
                base_departure_date_time: result[3],
            },
            dataToDisplay: {
                mode: result[0],
                name: result[1],
                direction: result[5],
                number: result[2],
                missionCode: result[2],
                time: result[3],
                platform: result[5],
                stops: result.slice(7)
            }}})

console.log(JSON.stringify(data))