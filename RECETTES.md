# Cahier de Recette – Projet Collector

## 1. Introduction / Contexte
- **Projet** : Collector — application de gestion de collections de cartes.
- **Objectif** : Valider les fonctionnalités existantes (catalogues pour Pokémon, Yu-Gi-Oh, authentification, gestion de collection).
- **Note** : Le support des cartes Magic n’est **pas encore implémenté**.

---

## 2. Organisation & Périmètre
- **Fonctionnalités testées** :
  - Authentification (inscription, connexion)
  - Catalogue Pokémon
  - Catalogue Yu-Gi-Oh
  - Gestion de collection (ajout, suppression, multi-types)
- **Exclusion** : Support Magic
- **Environnement de test** :
  - Frontend : http://localhost:3000
  - Backend : collector-back (API locale)

---

## 3. Fiches de Test

| ID Test | Fonctionnalité | Scénario | Résultat attendu | Résultat réel | OK/KO | Commentaires |
|---------|----------------|----------|------------------|---------------|-------|--------------|
| TST-001 | Authentification | Inscription avec email valide + mot de passe | Compte créé, redirection catalogue | | | |
| TST-002 | Authentification | Connexion avec identifiants corrects | Accès catalogue affiché | | | |
| TST-003 | Authentification | Connexion avec identifiants incorrects | Message d’erreur affiché | | | |
| TST-004 | Catalogue Pokémon | Affichage liste Pokémon | Carte / nom / image visible | | | |
| TST-005 | Catalogue Yu-Gi-Oh | Affichage liste Yu-Gi-Oh | Carte / nom / info visible | | | |
| TST-006 | Collection – ajout | Ajout carte Pokémon à sa collection | Carte ajoutée, apparaît dans “Ma collection” | | | |
| TST-007 | Collection – suppression | Suppression d’une carte de la collection | Carte supprimée, plus visible | | | |
| TST-008 | Collection multi-types | Ajout Pokémon + Yu-Gi-Oh | Les deux apparaissent correctement | | | |

---

## 4. Plan d’Exécution
1. Créer un utilisateur test.
2. Vérifier authentification (cas valide & invalide).
3. Parcourir catalogues Pokémon et Yu-Gi-Oh.
4. Ajouter / supprimer cartes dans la collection.
5. Tester gestion multi-types.

**Critères d’acceptation** :  
- Tous les tests critiques doivent être **OK**.  
- Le non-support de Magic doit être géré explicitement (UX cohérente).

---

## 5. Résultats & Anomalies
À compléter après exécution.

| ID Test | Résultat | Anomalie rencontrée | Impact | Suivi / Correctif |
|---------|----------|---------------------|--------|-------------------|
|         |          |                     |        |                   |

---
