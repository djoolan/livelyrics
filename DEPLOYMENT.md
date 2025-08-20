# 🚀 Guide de Déploiement - LiveLyrics

## 📋 Prérequis

- Un compte GitHub (gratuit)
- Git installé sur votre ordinateur
- Votre projet LiveLyrics prêt

## 🎯 Option 1 : GitHub Pages (Recommandé)

### Étape 1 : Créer un repository GitHub

1. **Aller sur GitHub.com** et se connecter
2. **Cliquer sur "New repository"** (bouton vert)
3. **Nommer le repository** : `livelyrics` (ou autre nom)
4. **Laisser en Public** (pour GitHub Pages gratuit)
5. **Ne pas cocher** "Add a README file" (on en a déjà un)
6. **Cliquer "Create repository"**

### Étape 2 : Lier votre projet local

```bash
# Dans votre dossier LiveLyrics
git remote add origin https://github.com/VOTRE-USERNAME/livelyrics.git
git branch -M main
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. **Aller dans votre repository** sur GitHub
2. **Cliquer sur "Settings"** (onglet)
3. **Scroller vers "Pages"** (menu de gauche)
4. **Source** : Sélectionner "Deploy from a branch"
5. **Branch** : Sélectionner "main"
6. **Folder** : Sélectionner "/ (root)"
7. **Cliquer "Save"**

### Étape 4 : Votre site est en ligne !

Votre site sera disponible à : `https://VOTRE-USERNAME.github.io/livelyrics`

⚠️ **Note** : Il peut y avoir un délai de 5-10 minutes pour la première publication.

## 🌐 Option 2 : Netlify (Alternative)

### Étape 1 : Créer un compte Netlify

1. **Aller sur [netlify.com](https://netlify.com)**
2. **Cliquer "Sign up"** avec votre compte GitHub

### Étape 2 : Déployer depuis GitHub

1. **Cliquer "New site from Git"**
2. **Choisir "GitHub"**
3. **Autoriser Netlify** à accéder à vos repositories
4. **Sélectionner votre repository** `livelyrics`
5. **Configuration** :
   - Build command : (laisser vide)
   - Publish directory : `.` (point)
6. **Cliquer "Deploy site"**

### Étape 3 : Personnaliser l'URL

1. **Cliquer sur "Site settings"**
2. **"Change site name"**
3. **Choisir un nom** : `votre-mariage-lyrics`
4. **Votre site sera** : `https://votre-mariage-lyrics.netlify.app`

## ⚡ Option 3 : Vercel (Alternative)

### Étape 1 : Créer un compte Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Cliquer "Sign up"** avec votre compte GitHub

### Étape 2 : Importer le projet

1. **Cliquer "New Project"**
2. **Importer votre repository** GitHub
3. **Configuration** :
   - Framework Preset : "Other"
   - Build Command : (laisser vide)
   - Output Directory : `.`
4. **Cliquer "Deploy"**

### Étape 3 : Votre site est prêt !

URL : `https://votre-projet.vercel.app`

## 🔧 Mises à jour

Pour mettre à jour votre site en ligne :

```bash
# Modifier vos fichiers
# Puis pousser les changements
git add .
git commit -m "Mise à jour des paroles"
git push
```

**GitHub Pages** : Mise à jour automatique en 5-10 minutes
**Netlify/Vercel** : Mise à jour automatique immédiate

## 🎯 Test de votre site

1. **Ouvrir l'URL** de votre site
2. **Tester les contrôles** :
   - Flèches pour naviguer
   - F pour plein écran
   - E pour no-shoot
3. **Vérifier les photos** s'affichent correctement
4. **Tester sur mobile** pour la responsivité

## 🆘 Dépannage

### Les photos ne s'affichent pas
- Vérifier que les fichiers sont dans le dossier `photos/`
- Vérifier les noms de fichiers dans `lyrics_manual.json`
- Vérifier les extensions (.jpg, .png)

### Le site ne se charge pas
- Vérifier que tous les fichiers sont commités
- Vérifier que le repository est public (GitHub Pages)
- Attendre 10 minutes pour la première publication

### Les polices ne s'affichent pas
- Vérifier que le dossier `fonts/` est présent
- Vérifier les noms de fichiers dans `style.css`

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs dans la console du navigateur (F12)
2. Vérifier que tous les fichiers sont présents
3. Tester en local d'abord avec `python3 -m http.server`

---

**Votre site LiveLyrics est maintenant prêt pour votre mariage ! 🎉** 