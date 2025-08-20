# 🎵 LiveLyrics - Application de Paroles Interactives

Application web pour afficher des paroles de chanson en temps réel avec animations visuelles et photos d'arrière-plan.

## ✨ Fonctionnalités

- **🎤 Affichage de paroles** : Paroles synchronisées avec indicateurs de chanteurs
- **📸 Photos d'arrière-plan** : Images qui changent selon les paroles
- **🎨 Animations** : Transitions fluides et effets visuels
- **⌨️ Contrôles clavier** : Navigation intuitive avec raccourcis
- **🖼️ Mode plein écran** : Parfait pour les projections
- **📱 Responsive** : Fonctionne sur tous les écrans
- **🚫 Mode no-shoot** : Affichage d'une image "no-shoot" en plein écran

## 🎮 Raccourcis Clavier

- **⬅️➡️ Flèches** : Navigation entre les paroles
- **␣ Espace** : Phrase suivante
- **F** : Plein écran
- **Ctrl+C** : Configuration
- **E** : Afficher/masquer no-shoot
- **Escape** : Quitter plein écran / fermer modal / masquer no-shoot
- **Backspace** : Retour au début

## 🚀 Déploiement

### Option 1 : GitHub Pages (Gratuit)

1. **Créer un repository GitHub** :
   ```bash
   # Créer un nouveau repository sur GitHub
   # Puis lier votre projet local
   git remote add origin https://github.com/djoolan/livelyrics.git
   git branch -M main
   git push -u origin main
   ```

2. **Activer GitHub Pages** :
   - Aller dans Settings > Pages
   - Source : "Deploy from a branch"
   - Branch : "main"
   - Folder : "/ (root)"

3. **Votre site sera disponible** : `https://votre-username.github.io/livelyrics`

### Option 2 : Netlify (Gratuit)

1. **Connecter votre repository** :
   - Aller sur [netlify.com](https://netlify.com)
   - "New site from Git"
   - Connecter votre repository GitHub

2. **Configuration** :
   - Build command : (laisser vide)
   - Publish directory : `.` (racine)

3. **Votre site sera disponible** : `https://votre-site.netlify.app`

### Option 3 : Vercel (Gratuit)

1. **Connecter votre repository** :
   - Aller sur [vercel.com](https://vercel.com)
   - "New Project"
   - Importez votre repository GitHub

2. **Configuration** :
   - Framework Preset : "Other"
   - Build Command : (laisser vide)
   - Output Directory : `.`

3. **Votre site sera disponible** : `https://votre-site.vercel.app`

## 📁 Structure du Projet

```
LiveLyrics/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Logique JavaScript
├── lyrics_manual.json  # Paroles structurées
├── fonts/              # Polices DM Sans
├── photos/             # Images d'arrière-plan
└── README.md           # Documentation
```

## 🎯 Utilisation

1. **Ouvrir l'application** dans un navigateur
2. **Naviguer** avec les flèches ou la barre d'espace
3. **Plein écran** avec la touche F pour les projections
4. **Mode no-shoot** avec la touche E si nécessaire

## 🔧 Personnalisation

### Modifier les paroles
Éditez le fichier `lyrics_manual.json` :
```json
{
  "text": "Votre texte ici",
  "singer": "julien|valerie|duo",
  "color": "blue|red|violet",
  "photo": "nom-image.jpg"
}
```

### Ajouter des photos
Placez vos images dans le dossier `photos/` et référencez-les dans le JSON.

### Modifier les styles
Éditez `style.css` pour personnaliser l'apparence.

## 🌐 Compatibilité

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (responsive)

## 📝 Licence

Projet personnel pour usage privé.

---

**Développé avec ❤️ pour votre mariage !** 