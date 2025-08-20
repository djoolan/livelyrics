class LiveLyrics {
	constructor() {
		this.lyrics = [];
		this.currentIndex = 0;
		this.isPlaying = false;
		this.animationStyle = 'romantic';
		this.title = '';

		this.initializeElements();
		this.setupEventListeners();
		this.loadSampleLyrics();
		// Charger les données sauvegardées après l'initialisation
		this.loadFromLocalStorage();
		this.updateDisplay();
	}

	initializeElements() {
		// Éléments principaux
		this.lyricsContainer = document.getElementById('lyricsContainer');
		this.singerIndicator = document.getElementById('singerIndicator');
		this.singerNameElement = document.querySelector('.singer-name');
		this.controlsElement = document.getElementById('controls');
		this.backgroundElement = document.getElementById('background');

		// Boutons de contrôle
		this.prevBtn = document.getElementById('prevBtn');
		this.playPauseBtn = document.getElementById('playPauseBtn');
		this.nextBtn = document.getElementById('nextBtn');
		this.fullscreenBtn = document.getElementById('fullscreenBtn');
		this.configBtn = document.getElementById('configBtn');

		// Informations
		this.currentLineSpan = document.getElementById('currentLine');
		this.totalLinesSpan = document.getElementById('totalLines');

		// Modal de configuration
		this.configModal = document.getElementById('configModal');
		this.closeBtn = document.querySelector('.close');
		this.lyricsInput = document.getElementById('lyricsInput');
		this.titleInput = document.getElementById('titleInput');
		this.animationSelect = document.getElementById('animationSelect');
		this.saveConfigBtn = document.getElementById('saveConfig');
		this.backgroundPhoto = document.getElementById('backgroundPhoto');
	}

	setupEventListeners() {
		// Contrôles boutons
		this.prevBtn.addEventListener('click', () => this.previousLine());
		this.nextBtn.addEventListener('click', () => this.nextLine());
		this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
		this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
		this.configBtn.addEventListener('click', () => this.openConfig());

		// Modal de configuration
		this.closeBtn.addEventListener('click', () => this.closeConfig());
		this.saveConfigBtn.addEventListener('click', () => this.saveConfiguration());

		// Fermer modal en cliquant à l'extérieur
		this.configModal.addEventListener('click', (e) => {
			if (e.target === this.configModal) {
				this.closeConfig();
			}
		});

		// Raccourcis clavier
		document.addEventListener('keydown', (e) => {
			console.log(e.code);

			// Si no-shoot est affiché, le masquer pour toute touche
			if (this.noShootElement && this.noShootElement.style.display === 'block') {
				this.hideNoShoot();
				// Ne pas exécuter l'action normale de la touche si c'est E
				if (e.code === 'KeyE') {
					e.preventDefault();
					return;
				}
			}

			switch (e.code) {
				case 'ArrowLeft':
					e.preventDefault();
					this.previousLine();
					break;
				case 'ArrowRight':
					e.preventDefault();
					this.nextLine();
					break;
				case 'Space':
					e.preventDefault();
					this.nextLine();
					break;
				case 'KeyF':
					e.preventDefault();
					this.toggleFullscreen();
					break;
				case 'KeyC':
					if (e.ctrlKey || e.metaKey) {
						e.preventDefault();
						this.openConfig();
					}
					break;
				case 'Backspace':
					e.preventDefault();
					this.goToBeginning();
					break;
				case 'Escape':
					if (document.fullscreenElement) {
						document.exitFullscreen();
					}
					if (this.configModal.style.display === 'block') {
						this.closeConfig();
					}
					break;
				case 'KeyE':
					e.preventDefault();
					this.showNoShoot();
					break;
			}
		});

		// Gestion du plein écran
		document.addEventListener('fullscreenchange', () => {
			this.updateFullscreenUI();
		});
	}

	loadSampleLyrics() {
		// Essayer de charger les paroles depuis le fichier JSON
		this.loadLyricsFromJSON();
	}

	async loadLyricsFromJSON() {
		try {
			const response = await fetch('lyrics_manual.json');
			if (response.ok) {
				const data = await response.json();
				this.lyrics = data.lyrics || [];
				this.title = data.title || "Chanson de Mariage";
				this.updateInfo();
				this.updateDisplay();
				console.log('Paroles chargées depuis JSON:', this.lyrics.length, 'lignes');
			} else {
				// Fallback vers les vraies paroles intégrées
				this.loadEmbeddedLyrics();
			}
		} catch (error) {
			console.log('Erreur lors du chargement JSON, utilisation des paroles intégrées');
			this.loadEmbeddedLyrics();
		}
	}

	loadEmbeddedLyrics() {
		// Paroles intégrées directement dans le code
		this.lyrics = [
			{ text: "Couplet 1", singer: "duo", color: "violet" },
			{ text: "Chez toi c'est jambon serrano", singer: "valerie", color: "red" },
			{ text: "Et sangria sous le soleil", singer: "valerie", color: "red" },
			{ text: "Chez moi c'est magret et canelé", singer: "julien", color: "blue" },
			{ text: "Chocolatine, bonnes bouteilles", singer: "julien", color: "blue" },
			{ text: "Chez toi c'est robe de flamenco", singer: "valerie", color: "red" },
			{ text: "Et beaux habits de lumière", singer: "valerie", color: "red" },
			{ text: "Chez moi c'est pull sur les épaules", singer: "julien", color: "blue" },
			{ text: "Chaussures bateau, marinière", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Pré-refrain 1", singer: "duo", color: "violet" },
			{ text: "On s'est rencontré sur Paname", singer: "valerie", color: "red" },
			{ text: "On habitait dans le même coin", singer: "valerie", color: "red" },
			{ text: "Ca aurait pu être éphémère", singer: "julien", color: "blue" },
			{ text: "Mais ça ne l'était point", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Refrain 1", singer: "duo", color: "violet" },
			{ text: "Ça fait 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "Que tu es dans mes bras", singer: "duo", color: "violet" },
			{ text: "Depuis 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "J'ai trouvé ma place", singer: "duo", color: "violet" },
			{ text: "Avec Véronica", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Couplet 2", singer: "duo", color: "violet" },
			{ text: "Tu voudrais que la ville de Bègles", singer: "valerie", color: "red" },
			{ text: "Soit un quartier du 11e", singer: "valerie", color: "red" },
			{ text: "Tu adores aller au théâtre", singer: "julien", color: "blue" },
			{ text: "Dans un siège ou sur la scène", singer: "julien", color: "blue" },
			{ text: "Tu sais lier des amitiés", singer: "valerie", color: "red" },
			{ text: "Dans tout'les villes où tu passes", singer: "valerie", color: "red" },
			{ text: "Les cultiver autour d'un verre", singer: "julien", color: "blue" },
			{ text: "Un resto ou des tapas", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Pré-refrain 2", singer: "duo", color: "violet" },
			{ text: "J'ai été jusqu'à Manhattan", singer: "valerie", color: "red" },
			{ text: "Pour passer une bague à ton doigt", singer: "valerie", color: "red" },
			{ text: "Pour que tu deviennes sa femme", singer: "julien", color: "blue" },
			{ text: "Il a perdu du poids", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Refrain 2", singer: "duo", color: "violet" },
			{ text: "Ça fait 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "Que tu es dans mes bras", singer: "duo", color: "violet" },
			{ text: "Depuis 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "J'ai trouvé ma place avec Véronica", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Bridge 1", singer: "duo", color: "violet" },
			{ text: "Un peu de Pénélope, un peu de Natalie", singer: "valerie", color: "red" },
			{ text: "Un peu d'Almodovar, et puis quelques séries", singer: "valerie", color: "red" },
			{ text: "Par contre pour la musique, faut appeler Interpol", singer: "julien", color: "blue" },
			{ text: "Shakira et Céline voila pour tes idoles", singer: "julien", color: "blue" },
			{ text: "Mais le pire dans tout ça : La Compagnie Créole !", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Break (2 mesures)", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Bridge 2", singer: "duo", color: "violet" },
			{ text: "T'es pas trop Louboutin, plutôt Isotoner", singer: "valerie", color: "red" },
			{ text: "En pleine canicule tu gardes ton pull-over", singer: "valerie", color: "red" },
			{ text: "Une journée sans soleil, et tu t'crois en hiver", singer: "julien", color: "blue" },
			{ text: "Une soirée sans ton plaid, c'est ça pour toi l'enfer", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Couplet 3", singer: "duo", color: "violet" },
			{ text: "Tu adores partir en voyage", singer: "valerie", color: "red" },
			{ text: "C'est jamais assez souvent", singer: "valerie", color: "red" },
			{ text: "Le Japon on l'a visité", singer: "julien", color: "blue" },
			{ text: "Sans traverser d'océan", singer: "julien", color: "blue" },
			{ text: "Pour votre voyage de noces", singer: "valerie", color: "red" },
			{ text: "T'as pas encore fait ton choix", singer: "valerie", color: "red" },
			{ text: "Je prendrais un vetonica", singer: "julien", color: "blue" },
			{ text: "Si j't'emmène au Connemara", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Pré-Refrain 3", singer: "duo", color: "violet" },
			{ text: "J'aime ton rire, j'aime ton visage", singer: "valerie", color: "red" },
			{ text: "Être avec toi c'est magique", singer: "valerie", color: "red" },
			{ text: "J'aime quand tu prononces une phrase", singer: "julien", color: "blue" },
			{ text: "Voir tes mains qui s'agitent", singer: "julien", color: "blue" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Refrain 2", singer: "duo", color: "violet" },
			{ text: "Ça fait 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "Que tu es dans mes bras", singer: "duo", color: "violet" },
			{ text: "Depuis 15 ans déjà", singer: "duo", color: "violet" },
			{ text: "J'ai trouvé ma place avec Véronica", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Refrain 3 (raccourci, ad lib)", singer: "duo", color: "violet" },
			{ text: "Tous tes amis sont là", singer: "duo", color: "violet" },
			{ text: "Pour chanter avec moi", singer: "duo", color: "violet" },
			{ text: "¡Que chica chula ères, Véronica!", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "🎉 Félicitations pour votre mariage ! 🎉", singer: "duo", color: "violet" }
		];
		this.title = "Chanson pour Véronica - Julien & Valérie";
		this.updateInfo();
		console.log('Paroles intégrées chargées:', this.lyrics.length, 'lignes');
	}

	loadFallbackLyrics() {
		// Paroles d'exemple pour démonstration
		this.lyrics = [
			{ text: "Bienvenue dans LiveLyrics", singer: "duo", color: "violet" },
			{ text: "Votre outil parfait pour afficher", singer: "duo", color: "violet" },
			{ text: "les paroles de votre chanson de mariage", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Utilisez les flèches pour naviguer", singer: "duo", color: "violet" },
			{ text: "Appuyez sur Espace pour pause/play", singer: "duo", color: "violet" },
			{ text: "Appuyez sur F pour le mode plein écran", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Configurez vos propres paroles", singer: "duo", color: "violet" },
			{ text: "en cliquant sur Configuration", singer: "duo", color: "violet" },
			{ text: "", singer: "duo", color: "violet" },
			{ text: "Félicitations pour votre mariage ! 💕", singer: "duo", color: "violet" }
		];
		this.title = "Chanson de Mariage";
		this.updateInfo();
	}

	nextLine() {
		if (this.currentIndex < this.lyrics.length - 1) {
			this.currentIndex++;
			this.updateDisplay();
			this.saveToLocalStorage();
		}
	}

	previousLine() {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.updateDisplay();
			this.saveToLocalStorage();
		}
	}

	togglePlayPause() {
		this.isPlaying = !this.isPlaying;
		this.playPauseBtn.textContent = this.isPlaying ?
			'Pause (Espace)' : 'Reprendre (Espace)';

		if (this.isPlaying) {
			// Mode automatique (optionnel pour le futur)
			console.log('Mode lecture activé');
		} else {
			console.log('Mode lecture en pause');
		}
	}

	updateDisplay() {
		const currentLyric = this.lyrics[this.currentIndex] || { text: '', singer: 'duo', color: 'violet' };

		// Mise à jour de l'indicateur de chanteur
		// this.updateSingerIndicator(currentLyric.singer);

		// Mise à jour de toutes les lignes de paroles
		this.updateAllLyrics();

		// Mise à jour de la photo d'arrière-plan
		this.updateBackgroundPhoto(currentLyric);

		this.updateInfo();
	}

	updateAllLyrics() {
		// Vider le container
		this.lyricsContainer.innerHTML = '';

		// Créer toutes les lignes de paroles
		this.lyrics.forEach((lyric, index) => {
			const lyricLine = document.createElement('div');
			lyricLine.className = `lyric-line ${lyric.singer}`;
			// Remplacer les "|" par des retours à la ligne HTML et les "&" par "&nbsp;"
			lyricLine.innerHTML = lyric.text.replace(/\|/g, '<br>').replace(/&/g, '&nbsp;');

			// Appliquer les classes selon la position
			if (index < this.currentIndex) {
				// Phrases passées avec dégradé d'opacité
				const distanceFromActive = this.currentIndex - index;
				const distanceFromEnd = this.lyrics.length - index;

				// Les 3 dernières phrases passées reçoivent le style "final"
				if (distanceFromEnd <= 3) {
					lyricLine.classList.add('final');
					console.log(`Ligne ${index}: classe final appliquée`);
				} else if (distanceFromActive <= 5) {
					lyricLine.classList.add(`past-${distanceFromActive}`);
					console.log(`Ligne ${index}: classe past-${distanceFromActive} appliquée`);
				} else {
					lyricLine.classList.add('past'); // Classe générique pour les phrases plus anciennes
					console.log(`Ligne ${index}: classe past appliquée`);
				}
			} else if (index === this.currentIndex) {
				// Phrase active
				lyricLine.classList.add('active');
				console.log(`Ligne ${index}: classe active appliquée`);
			} else {
				// Phrases futures
				lyricLine.classList.add('future');
				console.log(`Ligne ${index}: classe future appliquée`);
			}

			this.lyricsContainer.appendChild(lyricLine);
		});

		// Faire défiler vers la ligne active
		this.scrollToActiveLine();
	}

	scrollToActiveLine() {
		const activeLine = this.lyricsContainer.querySelector('.lyric-line.active');
		if (activeLine) {
			// Méthode alternative pour Chrome
			try {
				activeLine.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'center'
				});
			} catch (e) {
				// Fallback pour Chrome si scrollIntoView ne fonctionne pas
				const containerRect = this.lyricsContainer.getBoundingClientRect();
				const lineRect = activeLine.getBoundingClientRect();
				const scrollTop = this.lyricsContainer.scrollTop + (lineRect.top - containerRect.top) - (containerRect.height - lineRect.height);

				this.lyricsContainer.scrollTo({
					top: scrollTop,
					behavior: 'smooth'
				});
			}
		}
	}

	updateBackgroundPhoto(currentLyric) {
		// D'abord, masquer la photo actuelle
		this.backgroundPhoto.classList.remove('active');

		// Attendre un peu que la transition de masquage se termine
		setTimeout(() => {
			if (currentLyric.photo) {
				// Changer l'image de fond
				this.backgroundPhoto.style.backgroundImage = `url('photos/${currentLyric.photo}')`;
				// Puis afficher la nouvelle photo
				this.backgroundPhoto.classList.add('active');
				console.log('Photo affichée:', currentLyric.photo);
			} else {
				// Pas de photo, on garde masqué
				console.log('Photo masquée');
			}
		}, 100); // Petit délai pour la transition
	}

	updateSingerIndicator(singer) {
		this.singerIndicator.classList.remove('active');
		this.singerNameElement.classList.remove('julien', 'valerie', 'duo');

		setTimeout(() => {
			this.singerNameElement.classList.add(singer);
			this.singerNameElement.textContent = this.getSingerDisplayName(singer);
			this.singerIndicator.classList.add('active');
		}, 200);
	}

	getSingerDisplayName(singer) {
		switch (singer) {
			case 'julien':
				return '🎤 Julien';
			case 'valerie':
				return '🎤 Valérie';
			case 'duo':
			default:
				return '🎤 Julien & Valérie';
		}
	}



	updateInfo() {
		this.currentLineSpan.textContent = `Ligne: ${this.currentIndex + 1}`;
		this.totalLinesSpan.textContent = `Total: ${this.lyrics.length}`;
	}

	toggleFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().then(() => {
				this.updateFullscreenUI();
			});
		} else {
			document.exitFullscreen();
		}
	}

	updateFullscreenUI() {
		const isFullscreen = !!document.fullscreenElement;
		document.body.classList.toggle('fullscreen', isFullscreen);
		this.fullscreenBtn.textContent = isFullscreen ?
			'Quitter Plein Écran (F)' : 'Mode Projection (F)';
	}

	openConfig() {
		// Extraire seulement le texte des paroles pour l'affichage
		const lyricsText = this.lyrics.map(lyric => lyric.text).join('\n');
		this.lyricsInput.value = lyricsText;
		this.titleInput.value = this.title;
		this.animationSelect.value = this.animationStyle;
		this.configModal.style.display = 'block';
	}

	closeConfig() {
		this.configModal.style.display = 'none';
	}

	saveConfiguration() {
		const lyricsText = this.lyricsInput.value.trim();
		// Convertir le texte en format JSON avec structure
		const lines = lyricsText ? lyricsText.split('\n') : [];
		this.lyrics = lines.map(line => ({
			text: line,
			singer: 'duo',
			color: 'violet'
		}));

		this.title = this.titleInput.value.trim() || 'Chanson de Mariage';
		this.animationStyle = this.animationSelect.value;

		// Réinitialiser l'index si nécessaire
		if (this.currentIndex >= this.lyrics.length) {
			this.currentIndex = Math.max(0, this.lyrics.length - 1);
		}

		this.updateAnimationStyle();
		this.updateDisplay();
		this.closeConfig();

		// Sauvegarder dans le localStorage
		this.saveToLocalStorage();
	}

	updateAnimationStyle() {
		document.body.className = document.body.className
			.replace(/\b(romantic|elegant|simple)-mode\b/g, '');
		document.body.classList.add(`${this.animationStyle}-mode`);
	}



	saveToLocalStorage() {
		const data = {
			lyrics: this.lyrics,
			title: this.title,
			animationStyle: this.animationStyle,
			currentIndex: this.currentIndex
		};
		localStorage.setItem('liveLyricsData', JSON.stringify(data));
	}

	goToBeginning() {
		this.currentIndex = 0;
		this.updateDisplay();
		this.saveToLocalStorage();
	}

	loadFromLocalStorage() {
		const data = localStorage.getItem('liveLyricsData');
		if (data) {
			try {
				const parsed = JSON.parse(data);
				// Ne remplacer les paroles que si elles sont vides
				if (this.lyrics.length === 0) {
					this.lyrics = parsed.lyrics || [];
				}
				this.title = parsed.title || this.title || 'Chanson de Mariage';
				this.animationStyle = parsed.animationStyle || this.animationStyle || 'romantic';
				// Retenir la phrase active ou commencer à la première ligne
				this.currentIndex = parsed.currentIndex || 0;

				this.updateAnimationStyle();
				this.updateDisplay();
			} catch (e) {
				console.error('Erreur lors du chargement des données:', e);
			}
		}
	}

	showNoShoot() {
		console.log('showNoShoot');
		// Créer l'élément no-shoot s'il n'existe pas
		if (!this.noShootElement) {
			this.noShootElement = document.createElement('div');
			this.noShootElement.id = 'noShootOverlay';
			this.noShootElement.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background-image: url('photos/no-shoot.jpg');
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				z-index: 9999;
				display: none;
			`;
			document.body.appendChild(this.noShootElement);
		}

		// Afficher l'overlay
		this.noShootElement.style.display = 'block';
		console.log('No-shoot affiché');
	}

	hideNoShoot() {
		if (this.noShootElement) {
			this.noShootElement.style.display = 'none';
			console.log('No-shoot masqué');
		}
	}
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
	const app = new LiveLyrics();

	// Exposer l'app globalement pour le debug
	window.liveLyrics = app;

	console.log('LiveLyrics initialisé !');
	console.log('Raccourcis clavier :');
	console.log('← → : Navigation');
	console.log('Espace : Slide suivante');
	console.log('F : Plein écran');
	console.log('Ctrl+C : Configuration');
	console.log('Z : Afficher no-shoot');
	console.log('Échap : Quitter plein écran/fermer modal/masquer no-shoot');
	console.log('Backspace : Retour au début');
}); 